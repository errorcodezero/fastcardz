import { createTRPCRouter } from '.';
import { cardRouter } from './routes/cards';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const router = createTRPCRouter({
	card: cardRouter
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
