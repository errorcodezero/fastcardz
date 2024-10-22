import { type Config } from 'drizzle-kit';

export default {
	schema: './src/lib/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: 'file:./db.sqlite'
	},
	tablesFilter: ['fastcards_*']
} satisfies Config;
