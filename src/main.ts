import { Hono } from 'hono'
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1'
import { getAddress, listAddresses } from './address'

type Env = {
  DB: D1Database
  db: DrizzleD1Database
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', (c, next) => {
  c.env.db = drizzle(c.env.DB)
  return next()
})

app.get('/', async (c) => {
  const data = await listAddresses(c.env.db, c.req.query('codes') || '')

  return c.json({ addresses: data })
})

app.get('/:code', async (c) => {
  const data = await getAddress(c.env.db, c.req.param('code'))
  if (data === null) {
    return c.notFound()
  }

  return c.json(data)
})

export default app
