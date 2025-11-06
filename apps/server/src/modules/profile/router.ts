import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../trpc.js'

const updateProfileInputSchema = z.object({
  displayName: z.string().min(1).optional(),
  avatarUrl: z.string().url().nullable().optional(),
  notificationsEnabled: z.boolean().optional(),
})

type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(
      z
        .object({
          userId: z.string().cuid().optional(),
        })
        .optional()
    )
    .query(() => ({
      profile: null,
      preferences: {},
      note: 'TODO: Fetch profile details once onboarding creates users.',
    })),

  updateProfile: publicProcedure
    .input(updateProfileInputSchema)
    .mutation(({ input }: { input: UpdateProfileInput }) => ({
      updated: input,
      note: 'TODO: Persist profile settings using Prisma.',
    })),
})
