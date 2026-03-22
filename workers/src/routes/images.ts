import { Hono } from 'hono'
import type { Bindings } from '../index'

export const imageRoutes = new Hono<{ Bindings: Bindings }>()

const CONTENT_TYPE_MAP: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
}

// GET /api/images/:prefix/:filename — Serve images from R2
imageRoutes.get('/:prefix/:filename', async (c) => {
  if (!c.env.IMAGES) {
    return c.json({ error: 'Image storage not configured' }, 503)
  }

  const prefix = c.req.param('prefix')
  const filename = c.req.param('filename')
  const key = `${prefix}/${filename}`

  const object = await c.env.IMAGES.get(key)
  if (!object) {
    return c.json({ error: 'Image not found' }, 404)
  }

  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  const contentType = CONTENT_TYPE_MAP[ext] ?? 'application/octet-stream'

  return new Response(object.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
})
