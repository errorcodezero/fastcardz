import { createTRPCRouter, protectedProcedure } from '$lib/trpc';
import { z } from 'zod';

export const cardRouter = createTRPCRouter({
	getCards: protectedProcedure
		.input(
			z.object({
				id: z.number().int().gte(0)
			})
		)
		.query(async ({ ctx, input }) => {
			const cards = await ctx.db.query.cards.findMany({
				where: (cards, { eq }) => eq(cards.id, input.id)
			});

			return cards;
		})
});
