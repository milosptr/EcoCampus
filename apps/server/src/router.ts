import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  // Health check procedure
  health: t.procedure.query(() => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }),

  // Example: Get all users
  getUsers: t.procedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),

  // Example: Create a user
  createUser: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });
      return user;
    }),

  // Example: Get user by ID
  getUserById: t.procedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input },
      });
      return user;
    }),
});

export type AppRouter = typeof appRouter;
