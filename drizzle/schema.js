import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const mybooks = mysqlTable('mybookstore', {
  id: serial().autoincrement().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 255 }).notNull(),
  year: int().notNull(),
  book: varchar({ length: 255 }).notNull().unique(),
  status: varchar({ length: 7 }).notNull().default('Unread'),    
});
