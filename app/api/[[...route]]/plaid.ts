import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";

const app = new Hono()
 .post("/create-link-token",
  clerkMiddleware(),
  async (c) => {
    return c.json({ plaid: true })
  }
 )

 export default app;