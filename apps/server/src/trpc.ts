import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import type { Context } from './context.js'
import { verifyJWTFromRequest } from './supabase.js'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * Check if the user is authenticated
 * Verifies JWT token and looks up UserProfile in database
 */
const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const auth = await verifyJWTFromRequest(ctx.req)

  if (!auth || !auth?.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User is not authenticated',
    })
  }

  const user = await ctx.prisma.userProfile.findUnique({
    where: {
      authId: auth.userId,
    },
    select: {
      id: true,
    },
  })

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User is not authenticated',
    })
  }

  return next({ ctx: { ...ctx, user } })
})

export const createTRPCRouter = t.router

export const createCallerFactory = t.createCallerFactory

export const middleware = t.middleware

/**
 * Unprotected procedure - accessible without authentication
 */
export const publicProcedure = t.procedure

/**
 * Protected procedure - requires authentication
 */
export const protectedProcedure = t.procedure.use(authMiddleware)
