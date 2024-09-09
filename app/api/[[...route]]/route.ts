import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export const runtime = 'edge'

const app = new Hono().basePath('/api') // init new hono app with base path to be api

// init hello get route to return context - context being the json message in this example
app
    .get('/hello', (c) => {
        return c.json({
            message: 'Hello Next.js!',
        })
    })
    .get('hello/:test', (c) => {
        const test = c.req.param("test");
        return c.json({
            message: 'howdy',
            test: test,
        })
    })

export const GET = handle(app) 
export const POST = handle(app)