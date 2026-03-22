import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { scanRoutes } from './routes/scan'
import { recipeRoutes } from './routes/recipes'
import { profileRoutes } from './routes/profile'
import { imageRoutes } from './routes/images'

export type Bindings = {
  DB: D1Database
  IMAGES?: R2Bucket
  AI?: Ai
  ANTHROPIC_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
)

// Health check
app.get('/api/health', (c) =>
  c.json({ status: 'ok', timestamp: new Date().toISOString() })
)

// Routes
app.route('/api/scan', scanRoutes)
app.route('/api/recipes', recipeRoutes)
app.route('/api/profile', profileRoutes)
app.route('/api/images', imageRoutes)

// 404
app.notFound((c) => c.json({ error: 'Not Found' }, 404))

export default app
