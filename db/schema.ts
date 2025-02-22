import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const menuitems = sqliteTable('menuitems', {
  name: text('name'),
  price: real('price'),
  description: text('description'),
  image: text('image'),
  category: text('category'),
});

// Export MenuItem to use as an interface in your app
export type MenuItem = typeof menuitems.$inferSelect;