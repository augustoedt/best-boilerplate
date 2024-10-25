import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

(async () => {
	const sqlite = new Database('sqlite.db');
	const db = drizzle(sqlite, { schema });

	console.log('Starting migrations');

	await migrate(db, { migrationsFolder: 'migrations/sqlite' });

	console.log('Migrations complete.');
})();
