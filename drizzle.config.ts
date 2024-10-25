import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite', // "mysql" | "sqlite" | "postgresql"
	schema: './src/lib/server/db/schema/index.ts',
	dbCredentials: {
		url: 'file://sqlite.db'
	},
	out: './migrations/sqlite'
});
