// lib/trpc/context.ts
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import { initTRPC } from '@trpc/server';
import { db } from '$lib/db';

export async function createContext(event: RequestEvent) {
	const session = await event.locals.auth();
	return {
		db,
		session
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
