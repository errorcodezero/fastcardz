import { createTRPCRouter, protectedProcedure } from '$lib/trpc';
import { z } from 'zod';
import { decks, cards } from '$lib/db/schema';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

export const cardRouter = createTRPCRouter({
	getCards: protectedProcedure
		.input(
			z.object({
				id: z.number()
			})
		)
		.query(async ({ ctx, input }) => {
			const cardSet = await ctx.db.query.cards.findMany({
				where: eq(cards.id, input.id)
			});

			return cardSet;
		}),
	createDeck: protectedProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.session.user.id) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const deck = await ctx.db
				.insert(decks)
				.values({ name: input.name, createdById: ctx.session.user.id })
				.returning();

			return deck;
		}),
	deleteDeck: protectedProcedure
		.input(
			z.object({
				id: z.number()
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.session.user.id) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const deck = await ctx.db.delete(decks).where(eq(decks.id, input.id)).limit(1);

			return deck;
		}),
	createCard: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				front: z.string(),
				back: z.string()
			})
		)
		.mutation(async () => {})
});
