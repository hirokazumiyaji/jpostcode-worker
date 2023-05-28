import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const addresses = sqliteTable('addresses', {
  code: text('code').primaryKey().notNull(),
  prefecture: text('prefecture').notNull(),
  prefectureKana: text('prefecture_kana').notNull(),
  prefectureCode: integer('prefecture_code').notNull(),
  city: text('city').notNull(),
  cityKana: text('city_kana').notNull(),
  town: text('town').notNull().default(''),
  townKana: text('town_kana').notNull().default(''),
  street: text('street').notNull().default(''),
  officeName: text('office_name').notNull().default(''),
  officeNameKana: text('office_name_kana').notNull().default(''),
})
