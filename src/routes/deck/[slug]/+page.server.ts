import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { cards } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session || !session.user || !session.user.id) return redirect(303, '/auth');
	const slug = Number(event.params.slug)
	const cardsList = await db.query.cards.findMany({
		where: eq(cards.deckId, slug)
	});

	if (!cardsList)
		return error(404);

	return { cards: cardsList };
};
