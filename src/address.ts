import { DrizzleD1Database } from 'drizzle-orm/d1'
import { addresses } from './schema'
import { eq, inArray } from 'drizzle-orm'

export async function listAddresses(db: DrizzleD1Database, codes: string) {
  const v = codes.split(',').filter((it) => it.length === 7)
  if (v.length === 0) {
    return []
  }

  return await db.select().from(addresses).where(inArray(addresses.code, v)).all()
}

export async function getAddress(db: DrizzleD1Database, code: string) {
  if (code.length !== 7) {
    return null
  }

  return await db.select().from(addresses).where(eq(addresses.code, code)).get()
}
