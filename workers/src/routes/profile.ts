import { Hono } from 'hono'
import type { Bindings } from '../index'

export const profileRoutes = new Hono<{ Bindings: Bindings }>()

// GET /api/profile/favorites — Get favorites list
profileRoutes.get('/favorites', async (c) => {
  return c.json({ message: 'Favorites list - not yet implemented' }, 501)
})

// POST /api/profile/favorites/:recipeId — Add to favorites
profileRoutes.post('/favorites/:recipeId', async (c) => {
  const recipeId = c.req.param('recipeId')
  return c.json(
    { message: `Add favorite ${recipeId} - not yet implemented` },
    501
  )
})

// DELETE /api/profile/favorites/:recipeId — Remove from favorites
profileRoutes.delete('/favorites/:recipeId', async (c) => {
  const recipeId = c.req.param('recipeId')
  return c.json(
    { message: `Remove favorite ${recipeId} - not yet implemented` },
    501
  )
})

// GET /api/profile/history — Get cooking history
profileRoutes.get('/history', async (c) => {
  return c.json({ message: 'History list - not yet implemented' }, 501)
})

// POST /api/profile/history — Save cooking record
profileRoutes.post('/history', async (c) => {
  return c.json({ message: 'Save history - not yet implemented' }, 501)
})
