import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { transactions, insertTransactionSchema, categories, accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { subDays, parse } from "date-fns";

const app = new Hono()
    .get("/", clerkMiddleware(), 
        zValidator("query", z.object({
            from: z.string().optional(), 
            to: z.string().optional(), 
            accountId: z.string().optional()
        })),
        async (c) => {
            const auth = getAuth(c);
            const {from, to, accountId} = c.req.valid("query");

            if (!auth?.userId) {
                throw new HTTPException(401, {res: c.json({error: "unauthorized"}, 401)})
            }

            // if nothing is filtered - default by the last 360 days for data
            const defaultTo = new Date();
            const defaultFrom = subDays(defaultTo, 360);

            const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
            const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

            const data = await db
                .select({
                    id: transactions.id,
                    date: transactions.date,
                    category: categories.name,
                    categoryId: transactions.categoryId,
                    payee: transactions.payee,
                    amount: transactions.amount,
                    notes: transactions.notes,
                    account: accounts.name,
                    accountId: transactions.accountId
                })
                .from(transactions)
                // innerJoin for relation on both sides - dont load transactions that dont have the matching account id
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                // leftJoin - in case a category does not exist, still load the transaction without category with categories set to null
                .leftJoin(categories, eq(transactions.categoryId, categories.id))
                .where(
                    and(
                        accountId ? eq(transactions.accountId, accountId) : undefined,
                        eq(accounts.userId, auth.userId),
                        gte(transactions.date, startDate),
                        lte(transactions.date, endDate)
                    )
                )
                .orderBy(desc(transactions.date))

            return c.json({data})
        }
    )
    .get('/:id', clerkMiddleware(), zValidator('param', z.object({id: z.string().optional()})),
        async (c) => {
            const auth = getAuth(c);
            const {id} = c.req.valid('param');

            if (!id) {
                throw new HTTPException(400, {res: c.json({error: "missing id"}, 400)})
            }

            if (!auth?.userId) {
                throw new HTTPException(401, {res: c.json({error: "unauthorized"}, 401)})
            }

            const [data] = await db
                .select({
                    id: transactions.id,
                    date: transactions.date,
                    categoryId: transactions.categoryId,
                    payee: transactions.payee,
                    amount: transactions.amount,
                    notes: transactions.notes,
                    accountId: transactions.accountId
                })
                .from(transactions)
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                .where(
                    and(
                        eq(transactions.id, id),
                        eq(accounts.userId, auth.userId)
                    )
                );

            if (!data) {
                throw new HTTPException(404, {res: c.json({error: "Not found"}, 404)})
            }

            return c.json({data});
        }
    )
    .post("/", clerkMiddleware(), zValidator('json', insertTransactionSchema.omit({id: true})), 
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                throw new HTTPException(401, {res: c.json({error: "unauthorized"}, 401)})
            }

            const [data] = await db.insert(transactions).values({
                id: createId(),
                ...values,
            }).returning();

            return c.json({ data });
        }
    )
    .post("/bulk-create", clerkMiddleware(), zValidator('json', z.array(insertTransactionSchema.omit({id: true}))),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                throw new HTTPException(401, {res: c.json({error: "unauthorized"}, 401)})
            }

            const data = await db
                .insert(transactions)
                .values(
                    values.map((value) => ({
                        id: createId(),
                        ...value
                    }))
                )
                .returning();
            
            return c.json({ data })
        }
    )
    .post("/bulk-delete", clerkMiddleware(), zValidator('json', z.object({ids: z.array(z.string())})),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid('json');

            if (!auth?.userId) {
                throw new HTTPException(401, {res: c.json({error: "unauthorized"}, 401)})
            }

            // query list of ids that joins all accounts with authenticated userId
            const transactionsToDelete = db.$with("transactions_to_delete")
                .as(
                    db.select({id: transactions.id})
                    .from(transactions)
                    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                    .where(and(
                        inArray(transactions.id, values.ids),
                        eq(accounts.userId, auth.userId)
                    ))
                )

            const data = await db
                .with(transactionsToDelete)
                .delete(transactions)
                .where(
                    inArray(transactions.id, sql`(select id from ${transactionsToDelete})`)
                )
                .returning({ id: transactions.id });

            return c.json({data}) 
        },
    )
    .patch('/:id', clerkMiddleware(), zValidator('param', z.object({id: z.string().optional()})), zValidator('json', insertTransactionSchema.omit({id: true})),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid('param');
            const values = c.req.valid('json');

            if (!auth?.userId) {
                throw new HTTPException(401, {res: c.json({error: "unauthorized"}, 401)})
            }
            
            if (!id) {
                throw new HTTPException(400, {res: c.json({error: "missing id"}, 400)})
            }

            const transactionsToUpdate = db.$with("transactions_to_update")
            .as(
                db.select({id: transactions.id})
                .from(transactions)
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                .where(and(
                    eq(transactions.id, id),
                    eq(accounts.userId, auth.userId)
                ))
            )

            const [data] = await db
                .with(transactionsToUpdate)
                .update(transactions)
                .set(values)
                .where(
                    inArray(transactions.id, sql`(select id from ${transactionsToUpdate})`)
                )
                .returning();

            if (!data) {
                return c.json({error: "Not found"}, 404)
            }

            return c.json({data})
        }
    )
    .delete('/:id', clerkMiddleware(), zValidator('param', z.object({id: z.string().optional()})),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid('param');

            if (!auth?.userId) {
                throw new HTTPException(401, {res: c.json({error: "unauthorized"}, 401)})
            }
            
            if (!id) {
                throw new HTTPException(400, {res: c.json({error: "missing id"}, 400)})
            }

            const transactionsToDelete = db.$with("transactions_to_delete")
            .as(
                db.select({id: transactions.id})
                .from(transactions)
                .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                .where(and(
                    eq(transactions.id, id),
                    eq(accounts.userId, auth.userId)
                ))
            )


            const [data] = await db
                .with(transactionsToDelete)
                .delete(transactions)
                .where(
                    inArray(transactions.id, sql`(select id from ${transactionsToDelete})`)
                )
                .returning({ id: transactions.id });

            if (!data) {
                return c.json({error: "Not found"}, 404)
            }

            return c.json({data})
        }
)


export default app;