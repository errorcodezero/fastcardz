import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { decks } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session || !session.user || !session.user.id) return redirect(303, '/auth');
	const deckList = await db.query.decks.findMany({
		where: eq(decks.createdById, session.user.id)
	});

	return { decks: deckList };
};
