import { Hono } from 'hono'
import type { Bindings } from '../index'

export const scanRoutes = new Hono<{ Bindings: Bindings }>()

interface RecognizedIngredient {
  name: string
  category: string
  confidence: number
}

interface ScanResponse {
  id: string
  imageUrl: string
  ingredients: RecognizedIngredient[]
  createdAt: string
}

// POST /api/scan — Upload image and analyze ingredients via Claude Vision
scanRoutes.post('/', async (c) => {
  const apiKey = c.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return c.json({ error: 'API key not configured' }, 500)
  }

  const contentType = c.req.header('content-type') || ''

  let imageBase64: string
  let mediaType: string

  if (contentType.includes('multipart/form-data')) {
    const formData = await c.req.formData()
    const file = formData.get('image') as unknown as File | null
    if (!file || !file.arrayBuffer) {
      return c.json({ error: 'Image file is required' }, 400)
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: 'Unsupported image type. Use JPEG, PNG, WebP, or GIF' }, 400)
    }

    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: 'Image must be under 5MB' }, 400)
    }

    const buffer = await file.arrayBuffer()
    imageBase64 = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
    mediaType = file.type

    // Upload to R2 (if available)
    if (c.env.IMAGES) {
      const imageId = crypto.randomUUID()
      const ext = file.type.split('/')[1]
      const key = `scans/${imageId}.${ext}`
      await c.env.IMAGES.put(key, buffer, {
        httpMetadata: { contentType: file.type },
      })
    }
  } else if (contentType.includes('application/json')) {
    const body = await c.req.json<{ image: string; mediaType?: string }>()
    if (!body.image) {
      return c.json({ error: 'Base64 image data is required' }, 400)
    }
    imageBase64 = body.image
    mediaType = body.mediaType || 'image/jpeg'
  } else {
    return c.json({ error: 'Send multipart/form-data or application/json' }, 400)
  }

  // Call Claude Vision API
  const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `이 냉장고 사진에서 보이는 식재료를 모두 인식해주세요.

JSON 배열로 응답해주세요. 각 항목은 다음 형식입니다:
{
  "name": "재료 이름 (한국어)",
  "category": "카테고리 (채소/과일/축산/수산/유제품/양념/가공식품/음료/기타)",
  "confidence": 0.0~1.0 (인식 확신도)
}

반드시 유효한 JSON 배열만 출력하세요. 다른 텍스트는 포함하지 마세요.`,
            },
          ],
        },
      ],
    }),
  })

  if (!claudeResponse.ok) {
    const errorText = await claudeResponse.text()
    console.error('Claude API error:', errorText)
    return c.json({ error: 'AI analysis failed' }, 502)
  }

  const claudeResult = await claudeResponse.json<{
    content: Array<{ type: string; text?: string }>
  }>()

  const textContent = claudeResult.content.find((c) => c.type === 'text')
  if (!textContent?.text) {
    return c.json({ error: 'No analysis result from AI' }, 502)
  }

  let ingredients: RecognizedIngredient[]
  try {
    // Extract JSON array from response (handle markdown code blocks)
    const jsonMatch = textContent.text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error('No JSON array found')
    ingredients = JSON.parse(jsonMatch[0])
  } catch {
    console.error('Failed to parse AI response:', textContent.text)
    return c.json({ error: 'Failed to parse AI analysis' }, 502)
  }

  // Save to D1
  const scanId = crypto.randomUUID()
  const now = new Date().toISOString()

  await c.env.DB.prepare(
    'INSERT INTO scans (id, user_id, image_url, created_at) VALUES (?, ?, ?, ?)'
  )
    .bind(scanId, 'anonymous', `scans/${scanId}`, now)
    .run()

  for (const ing of ingredients) {
    await c.env.DB.prepare(
      'INSERT INTO recognized_ingredients (id, scan_id, name, category, confidence, confirmed) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind(crypto.randomUUID(), scanId, ing.name, ing.category, ing.confidence, false)
      .run()
  }

  const response: ScanResponse = {
    id: scanId,
    imageUrl: `scans/${scanId}`,
    ingredients,
    createdAt: now,
  }

  return c.json(response, 201)
})

// GET /api/scan/:id — Get scan result
scanRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')

  const scan = await c.env.DB.prepare('SELECT * FROM scans WHERE id = ?')
    .bind(id)
    .first()

  if (!scan) {
    return c.json({ error: 'Scan not found' }, 404)
  }

  const { results: ingredients } = await c.env.DB.prepare(
    'SELECT * FROM recognized_ingredients WHERE scan_id = ? ORDER BY confidence DESC'
  )
    .bind(id)
    .all()

  return c.json({
    id: scan.id,
    imageUrl: scan.image_url,
    ingredients: ingredients.map((i) => ({
      id: i.id,
      name: i.name,
      category: i.category,
      confidence: i.confidence,
      confirmed: Boolean(i.confirmed),
    })),
    createdAt: scan.created_at,
  })
})

// PATCH /api/scan/:id/ingredients — Update recognized ingredients
scanRoutes.patch('/:id/ingredients', async (c) => {
  const id = c.req.param('id')

  const scan = await c.env.DB.prepare('SELECT id FROM scans WHERE id = ?')
    .bind(id)
    .first()

  if (!scan) {
    return c.json({ error: 'Scan not found' }, 404)
  }

  const body = await c.req.json<{
    add?: Array<{ name: string; category: string }>
    remove?: string[]
    confirm?: string[]
  }>()

  if (body.remove?.length) {
    for (const ingredientId of body.remove) {
      await c.env.DB.prepare(
        'DELETE FROM recognized_ingredients WHERE id = ? AND scan_id = ?'
      )
        .bind(ingredientId, id)
        .run()
    }
  }

  if (body.confirm?.length) {
    for (const ingredientId of body.confirm) {
      await c.env.DB.prepare(
        'UPDATE recognized_ingredients SET confirmed = TRUE WHERE id = ? AND scan_id = ?'
      )
        .bind(ingredientId, id)
        .run()
    }
  }

  if (body.add?.length) {
    for (const ing of body.add) {
      await c.env.DB.prepare(
        'INSERT INTO recognized_ingredients (id, scan_id, name, category, confidence, confirmed) VALUES (?, ?, ?, ?, ?, ?)'
      )
        .bind(crypto.randomUUID(), id, ing.name, ing.category, 1.0, true)
        .run()
    }
  }

  return c.json({ message: 'Ingredients updated' })
})
