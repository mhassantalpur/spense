import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import authors from './authors'
import books from './books'

export const runtime = 'edge'

const app = new Hono().basePath('/api') // init new hono app with base path to be api

// get authors and books route data
app.route('/authors', authors);
app.route('/books', books);

export const GET = handle(app) 
export const POST = handle(app)