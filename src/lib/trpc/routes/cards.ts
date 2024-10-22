import { publicProcedure, createTRPCRouter } from "$lib/trpc";

export const cardRouter = createTRPCRouter({
	getCards: publicProcedure.query(() => {
		return "ok"
	}),
	test: publicProcedure.query(() => {
		return "OK"
	}),
})
