import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

export const runtime = 'edge'

const app = new Hono().basePath('/api') // init new hono app with base path to be api

// init hello get route to return context - context being the json message in this example
app
    .get(
        '/hello',
        clerkMiddleware(),
        (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "Unauthorized"})
            }
        return c.json({
            message: 'Hello Next.js!',
            userId: auth.userId
        })
    })

export const GET = handle(app) 
export const POST = handle(app)