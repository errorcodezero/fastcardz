import { createTRPCRouter, protectedProcedure } from '$lib/trpc';
import { z } from 'zod';
import { decks } from '$lib/db/schema';
import { TRPCError } from '@trpc/server';

export const cardRouter = createTRPCRouter({
	getCards: protectedProcedure
		.input(
			z.object({
				id: z.number()
			})
		)
		.query(async ({ ctx, input }) => {
			const cards = await ctx.db.query.cards.findMany({
				where: (cards, { eq }) => eq(cards.id, input.id)
			});

			return cards;
		}),
	createDeck: protectedProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			if (!ctx.session.user.id) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const deck = await ctx.db
				.insert(decks)
				.values({ name: input.name, createdById: ctx.session.user.id })
				.returning();

			return deck;
		})
});
