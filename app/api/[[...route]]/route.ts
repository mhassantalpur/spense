import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api') // init new hono app with base path to be api

// init hello get route to return context - context being the json message in this example
app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app) 
export const POST = handle(app)