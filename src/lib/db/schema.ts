import { relations, sql } from 'drizzle-orm';
import { index, int, primaryKey, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core';
import { type AdapterAccount } from '@auth/core/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `fastcards_${name}`);

// type LearningStatus = "new" | "review" | "done";

export const cards = createTable(
	'card',
	{
		id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		createdById: text('created_by', { length: 255 })
			.notNull()
			.references(() => users.id),
		createdAt: int('created_at', { mode: 'timestamp' })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: int('updatedAt', { mode: 'timestamp' }).$onUpdate(() => new Date()),
		front: text('front'),
		back: text('back'),
		deckId: int('deck_id')
			.notNull()
			.references(() => decks.id)
	},
	(card) => ({
		createdByIdIdx: index('card_created_by_idx').on(card.createdById),
		deckIdIdx: index('deck_idx').on(card.deckId)
	})
);

export const decks = createTable(
	'decks',
	{
		id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		createdById: text('created_by', { length: 255 })
			.notNull()
			.references(() => users.id),
		createdAt: int('created_at', { mode: 'timestamp' })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: int('updatedAt', { mode: 'timestamp' }).$onUpdate(() => new Date())
	},
	(post) => ({
		createdByIdIdx: index('post_created_by_idx').on(post.createdById),
		nameIdx: index('name_idx').on(post.name)
	})
);

// Just implementing exactly what is off this page on the anki wki
// https://docs.ankiweb.net/stats.html?highlight=database#manual-analysis
export const reviewLog = createTable('reviewLog', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),

	// card id
	cid: int('cid')
		.notNull()
		.references(() => decks.id),

	// usn isn't needed
	// no need to manage sync status when everything is online

	// lot easier to just set this to 1 or 0
	// 1 for right and 0 for wrong
	ease: int('ease'),

	// negative ivl is in seconds
	// positive ivl is in days
	// anki devs what??????
	ivl: int('ivl'),
	lastIvl: int('last_ivl'),

	// basically how much to multiply the ivl by(factor/1000)
	factor: int('factor'),

	// time you spent on the card
	time: int('time'),

	// 0 for learning
	// 1 for review
	// 2 for relearning
	// 3 for done/extra review stuff
	type: int('type')
});

//export const decksRelations = relations(decks, ({ many }) => ({
//	cards: many(cards),
//}));

export const users = createTable('user', {
	id: text('id', { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name', { length: 255 }),
	email: text('email', { length: 255 }).notNull(),
	emailVerified: int('email_verified', {
		mode: 'timestamp'
	}).default(sql`(unixepoch())`),
	image: text('image', { length: 255 })
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts)
}));

export const accounts = createTable(
	'account',
	{
		userId: text('user_id', { length: 255 })
			.notNull()
			.references(() => users.id),
		type: text('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
		provider: text('provider', { length: 255 }).notNull(),
		providerAccountId: text('provider_account_id', { length: 255 }).notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: int('expires_at'),
		token_type: text('token_type', { length: 255 }),
		scope: text('scope', { length: 255 }),
		id_token: text('id_token'),
		session_state: text('session_state', { length: 255 })
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		}),
		userIdIdx: index('account_user_id_idx').on(account.userId)
	})
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] })
}));

export const sessions = createTable(
	'session',
	{
		sessionToken: text('session_token', { length: 255 }).notNull().primaryKey(),
		userId: text('userId', { length: 255 })
			.notNull()
			.references(() => users.id),
		expires: int('expires', { mode: 'timestamp' }).notNull()
	},
	(session) => ({
		userIdIdx: index('session_userId_idx').on(session.userId)
	})
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const verificationTokens = createTable(
	'verification_token',
	{
		identifier: text('identifier', { length: 255 }).notNull(),
		token: text('token', { length: 255 }).notNull(),
		expires: int('expires', { mode: 'timestamp' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
);
