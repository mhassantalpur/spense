import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import accounts from "./accounts"

export const runtime = 'edge'

const app = new Hono().basePath('/api') // init new hono app with base path to be api

app.get("/hello", (c) => {
    return c.json({hello: "world"});
})

const routes = app
    .route("/accounts", accounts);

export const GET = handle(app) 
export const POST = handle(app)