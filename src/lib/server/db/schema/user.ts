import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey(),
	passhash: text('passhash').notNull(),
	email: text('email').notNull().unique()
});

export const userDetails = sqliteTable('user_details', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey(),
	userId: text('user_id').notNull().references(()=>users.id),
	firstname: text('firstname'),
	lastname: text('lastname'),
	avatar: text('avatar'),
	age: integer('age'),
});
