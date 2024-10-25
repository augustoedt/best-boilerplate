import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey(),
	passhash: text('passhash').notNull(),
	detailsId: text('details').references(()=>userDetails.id),
	email: text('email').notNull().unique()
});

export const userDetails = sqliteTable('user_details', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey(),
	firstname: text('firstname'),
	lastname: text('lastname'),
	avatar: text('avatar'),
	age: integer('age'),
});

export const userRelations = relations(users, ({ one }) => ({
	details: one(userDetails, {
		fields: [users.detailsId],
		references: [userDetails.id]
	})
}));
