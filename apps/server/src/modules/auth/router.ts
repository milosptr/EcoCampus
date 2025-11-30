import { createTRPCRouter, publicProcedure } from '../../trpc.js'
import { verifyJWTFromRequest } from '../../supabase.js'

export const authRouter = createTRPCRouter({
  /**
   * Check authentication status
   * Returns user info if authenticated, null otherwise
   */
  status: publicProcedure.query(async ({ ctx }) => {
    const auth = await verifyJWTFromRequest(ctx.req)

    if (!auth || !auth.userId) {
      return {
        isAuthenticated: false,
        user: null,
      }
    }

    const userProfile = await ctx.prisma.userProfile.findUnique({
      where: {
        authId: auth.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
      },
    })

    if (!userProfile) {
      return {
        isAuthenticated: false,
        user: null,
      }
    }

    return {
      isAuthenticated: true,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        avatarUrl: userProfile.avatarUrl,
      },
    }
  }),
})
