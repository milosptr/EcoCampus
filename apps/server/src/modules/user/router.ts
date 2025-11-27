import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { adminAuthClient, verifyJWTFromRequest } from '../../supabase.js'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '../../trpc.js'

// Input schemas
const saveOnboardingProfileInputSchema = z.object({
  fullName: z.string().min(1),
  age: z.string().optional(),
  gender: z
    .enum(['male', 'female', 'non-binary', 'prefer-not-to-say'])
    .nullable(),
  dietaryPreference: z
    .enum(['omnivore', 'vegetarian', 'vegan', 'pescatarian'])
    .nullable(),
  university: z.string().min(1),
  distanceFromCampus: z.number().optional(),
  transportMode: z.enum(['walk', 'bike', 'bus', 'car', 'carpool']).nullable(),
  housingType: z
    .enum(['dorm', 'apartment', 'house', 'shared-housing'])
    .nullable(),
  weeklyCampusVisits: z.number().optional(),
  joinLeaderboard: z.boolean(),
  dailyReminders: z.boolean(),
  weeklySummary: z.boolean(),
})

// Helper to extract display name from Supabase user metadata
const extractUserDisplayName = (
  userMetadata: Record<string, unknown>
): string | null => {
  const { full_name, name, display_name } = userMetadata
  if (typeof full_name === 'string' && full_name) return full_name
  if (typeof name === 'string' && name) return name
  if (typeof display_name === 'string' && display_name) return display_name
  return null
}

export const userRouter = createTRPCRouter({
  /**
   * Get current authenticated user (creates user on first login)
   * This is called after successful Supabase authentication
   */
  me: publicProcedure.query(async ({ ctx }) => {
    const auth = await verifyJWTFromRequest(ctx.req)

    if (!auth?.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid or missing authentication token',
      })
    }

    // Try to find existing user
    let userProfile = await ctx.prisma.userProfile.findUnique({
      where: { authId: auth.userId },
    })

    if (!userProfile) {
      // First-time login - get user data from Supabase admin API
      const { data, error } = await adminAuthClient.getUserById(auth.userId)

      if (error || !data.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Failed to retrieve user from authentication provider',
        })
      }

      const supabaseUser = data.user
      const displayName = extractUserDisplayName(supabaseUser.user_metadata)

      // Create user profile
      userProfile = await ctx.prisma.userProfile.create({
        data: {
          authId: auth.userId,
          email: supabaseUser.email!,
          name: displayName,
          avatarUrl:
            (supabaseUser.user_metadata?.avatar_url as string) || null,
        },
      })
    }

    return userProfile
  }),

  /**
   * Save onboarding profile data
   * Called after user completes onboarding flow
   */
  saveOnboardingProfile: protectedProcedure
    .input(saveOnboardingProfileInputSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedProfile = await ctx.prisma.userProfile.update({
        where: { id: ctx.user.id },
        data: {
          name: input.fullName,
          age: input.age,
          gender: input.gender,
          dietaryPreference: input.dietaryPreference,
          university: input.university,
          distanceFromCampus: input.distanceFromCampus,
          transportMode: input.transportMode,
          housingType: input.housingType,
          weeklyCampusVisits: input.weeklyCampusVisits,
          joinLeaderboard: input.joinLeaderboard,
          dailyReminders: input.dailyReminders,
          weeklySummary: input.weeklySummary,
          onboardingCompleted: true,
        },
      })

      return updatedProfile
    }),
})
