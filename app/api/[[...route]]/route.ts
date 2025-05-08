import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import accounts from "./accounts"
import categories from "./categories"
import transactions from "./transactions"
import summary from "./summary"
import { HTTPException } from 'hono/http-exception'
import plaid from "./plaid";


export const runtime = 'nodejs'

const app = new Hono().basePath('/api') // init new hono app with base path to be api

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse();
    }
    return c.json({error: "Internal error"} , 500)
})

const routes = app
    .route("/plaid", plaid)
    .route("/accounts", accounts)
    .route("/categories", categories)
    .route("/transactions", transactions)
    .route("/summary", summary);

export const GET = handle(app) 
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;