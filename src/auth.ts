import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/db';
import Google from '@auth/sveltekit/providers/google';
import Discord from '@auth/core/providers/discord';
import { accounts, sessions, users, verificationTokens } from '$lib/db/schema';
import type { Adapter } from '@auth/core/adapters';

export const { handle, signIn, signOut } = SvelteKitAuth({
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id
			}
		})
	},
	secret: process.env.AUTH_SECRET!,
	trustHost: true,
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens
	}) as Adapter,
	providers: [Google, Discord]
});
