import { t } from '$lib/trpc/context';
import { TRPCError } from '@trpc/server';

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			// infers the `session` as non-nullable
			session: { ...ctx.session, user: ctx.session.user }
		}
	});
});
export const publicProcedure = t.procedure;
export const createTRPCRouter = t.router;
