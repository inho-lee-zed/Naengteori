import { Hono } from 'hono'
import type { Bindings } from '../index'

export const recipeRoutes = new Hono<{ Bindings: Bindings }>()

interface RecipeIngredient {
  name: string
  amount: string
}

interface RecipeStep {
  order: number
  instruction: string
  duration?: number
  tip?: string
}

interface ClaudeRecipe {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  cookingTime: number
  calories: number
  servings: number
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  usedIngredients: string[]
  missingIngredients: string[]
}

interface RecipeRecommendation {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  cookingTime: number
  calories: number
  matchRate: number
  missingIngredients: string[]
}

// POST /api/recipes/recommend — Recommend recipes based on ingredients
recipeRoutes.post('/recommend', async (c) => {
  const apiKey = c.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return c.json({ error: 'API key not configured' }, 500)
  }

  let ingredients: string[]
  try {
    const body = await c.req.json<{ ingredients: string[] }>()
    if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
      return c.json({ error: 'ingredients 배열이 필요합니다' }, 400)
    }
    ingredients = body.ingredients
  } catch {
    return c.json({ error: '요청 형식이 올바르지 않습니다' }, 400)
  }

  const prompt = `당신은 한국 요리 전문가입니다. 다음 재료들을 활용해 만들 수 있는 한국 요리를 추천해주세요.

사용 가능한 재료: ${ingredients.join(', ')}

3가지 레시피를 추천하되, 반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요. steps는 핵심 단계만 3~5개로 간결하게 작성하세요.

[
  {
    "title": "요리 이름",
    "description": "요리에 대한 짧은 설명 (2~3문장)",
    "difficulty": "easy | medium | hard",
    "cookingTime": 조리 시간(분, 숫자),
    "calories": 1인분 칼로리(숫자),
    "servings": 몇 인분(숫자),
    "ingredients": [
      { "name": "재료명", "amount": "분량" }
    ],
    "steps": [
      {
        "order": 1,
        "instruction": "조리 단계 설명",
        "duration": 소요 시간(초, 숫자, 선택),
        "tip": "팁 (선택)"
      }
    ],
    "usedIngredients": ["사용하는 재료 이름 배열 (제공된 재료 중에서)"],
    "missingIngredients": ["부족한 재료 이름 배열 (추가로 필요한 재료)"]
  }
]`

  const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!claudeResponse.ok) {
    const errorText = await claudeResponse.text()
    console.error('Claude API error:', errorText)
    return c.json({ error: 'AI 레시피 생성 실패', detail: errorText }, 502)
  }

  const claudeResult = await claudeResponse.json<{
    content: Array<{ type: string; text?: string }>
  }>()

  const textContent = claudeResult.content.find((c) => c.type === 'text')
  if (!textContent?.text) {
    return c.json({ error: 'AI 응답이 없습니다' }, 502)
  }

  let recipes: ClaudeRecipe[]
  try {
    // Strip markdown code blocks if present
    let cleaned = textContent.text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim()
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error('JSON 배열을 찾을 수 없습니다')
    recipes = JSON.parse(jsonMatch[0])
  } catch (e) {
    console.error('Failed to parse AI response:', textContent.text)
    return c.json({ error: 'AI 응답 파싱 실패', detail: String(e) }, 502)
  }

  const now = new Date().toISOString()
  const result: RecipeRecommendation[] = []

  for (const recipe of recipes) {
    const recipeId = crypto.randomUUID()
    const matchRate =
      ingredients.length > 0
        ? Math.round((recipe.usedIngredients.length / ingredients.length) * 100)
        : 0

    // Save to D1 (best-effort)
    try {
      await c.env.DB.prepare(
        'INSERT INTO recipes (id, title, description, difficulty, cooking_time, calories, is_ai_generated, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      )
        .bind(
          recipeId,
          recipe.title,
          recipe.description,
          recipe.difficulty,
          recipe.cookingTime,
          recipe.calories,
          true,
          now
        )
        .run()

      for (const step of recipe.steps) {
        await c.env.DB.prepare(
          'INSERT INTO cooking_steps (id, recipe_id, step_order, instruction, duration, tip) VALUES (?, ?, ?, ?, ?, ?)'
        )
          .bind(
            crypto.randomUUID(),
            recipeId,
            step.order,
            step.instruction,
            step.duration ?? null,
            step.tip ?? null
          )
          .run()
      }
    } catch (e) {
      console.error('D1 save failed for recipe:', recipe.title, e)
    }

    result.push({
      id: recipeId,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      calories: recipe.calories,
      matchRate,
      missingIngredients: recipe.missingIngredients,
    })
  }

  return c.json(result, 200)
})

// GET /api/recipes/recent — Get recently generated recipes
recipeRoutes.get('/recent', async (c) => {
  const limit = Number(c.req.query('limit') ?? 10)
  const { results } = await c.env.DB.prepare(
    'SELECT id, title, description, difficulty, cooking_time, calories, created_at FROM recipes ORDER BY created_at DESC LIMIT ?'
  )
    .bind(limit)
    .all()

  return c.json(
    results.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      difficulty: r.difficulty,
      cookingTime: r.cooking_time,
      calories: r.calories,
      createdAt: r.created_at,
    }))
  )
})

// GET /api/recipes/:id — Get recipe detail
recipeRoutes.get('/:id', async (c) => {
  const id = c.req.param('id')

  const recipe = await c.env.DB.prepare('SELECT * FROM recipes WHERE id = ?')
    .bind(id)
    .first()

  if (!recipe) {
    return c.json({ error: '레시피를 찾을 수 없습니다' }, 404)
  }

  const { results: steps } = await c.env.DB.prepare(
    'SELECT * FROM cooking_steps WHERE recipe_id = ? ORDER BY step_order ASC'
  )
    .bind(id)
    .all()

  return c.json({
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    difficulty: recipe.difficulty,
    cookingTime: recipe.cooking_time,
    calories: recipe.calories,
    ingredients: [],
    steps: steps.map((s) => ({
      order: s.step_order,
      instruction: s.instruction,
      duration: s.duration ?? undefined,
      tip: s.tip ?? undefined,
    })),
  })
})

// GET /api/recipes/:id/image — Generate or serve recipe image
recipeRoutes.get('/:id/image', async (c) => {
  const id = c.req.param('id')

  const recipe = await c.env.DB.prepare('SELECT id, title, description, image_url FROM recipes WHERE id = ?')
    .bind(id)
    .first()

  if (!recipe) {
    return c.json({ error: '레시피를 찾을 수 없습니다' }, 404)
  }

  // Return cached image if exists
  if (recipe.image_url && String(recipe.image_url).startsWith('data:')) {
    return c.json({ imageUrl: recipe.image_url })
  }

  // Generate image using Workers AI
  if (!c.env.AI) {
    return c.json({ error: 'AI 이미지 생성이 설정되지 않았습니다' }, 503)
  }

  const apiKey = c.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return c.json({ error: 'API key not configured' }, 500)
  }

  // Fetch full recipe data including all cooking steps
  const { results: steps } = await c.env.DB.prepare(
    'SELECT step_order, instruction, tip FROM cooking_steps WHERE recipe_id = ? ORDER BY step_order ASC'
  ).bind(id).all()

  const title = String(recipe.title)
  const description = String(recipe.description || '')
  const stepsText = steps
    .map((s) => `Step ${s.step_order}: ${s.instruction}${s.tip ? ` (Tip: ${s.tip})` : ''}`)
    .join('\n')

  // Step 1: Use Claude to generate an expert food photography prompt
  const claudeUserMessage = `Recipe title: ${title}
Description: ${description}
Cooking steps:
${stepsText || '(no steps available)'}`

  const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system:
        'You are an expert food photographer and prompt engineer. Given a Korean recipe with its ingredients and cooking steps, generate a single detailed image generation prompt in English. The prompt should describe EXACTLY what the finished dish looks like - the specific ingredients visible, the color, texture, plating style, and presentation. Be very specific about what should and should NOT appear in the image. Output ONLY the prompt text, nothing else.',
      messages: [
        {
          role: 'user',
          content: claudeUserMessage,
        },
      ],
    }),
  })

  let imagePrompt: string
  if (!claudeResponse.ok) {
    console.error('Claude API error for image prompt:', await claudeResponse.text())
    // Fallback to basic prompt
    imagePrompt = `Professional food photography of Korean dish: ${title}. ${description}. Appetizing, realistic, natural lighting.`
  } else {
    const claudeResult = await claudeResponse.json<{
      content: Array<{ type: string; text?: string }>
    }>()
    const textContent = claudeResult.content.find((item) => item.type === 'text')
    imagePrompt = textContent?.text?.trim() || `Professional food photography of Korean dish: ${title}. ${description}. Appetizing, realistic, natural lighting.`
  }

  // Step 2: Generate image using the Claude-optimized prompt with higher quality steps
  const result = await c.env.AI.run('@cf/black-forest-labs/flux-1-schnell', {
    prompt: imagePrompt,
    num_steps: 8,
  }) as { image: string }

  const imageUrl = `data:image/png;base64,${result.image}`

  // Cache in D1
  await c.env.DB.prepare('UPDATE recipes SET image_url = ? WHERE id = ?')
    .bind(imageUrl, id)
    .run()

  return c.json({ imageUrl })
})

// POST /api/recipes/generate — AI generate custom recipe
recipeRoutes.post('/generate', async (c) => {
  return c.json({ message: 'Generate endpoint - not yet implemented' }, 501)
})
