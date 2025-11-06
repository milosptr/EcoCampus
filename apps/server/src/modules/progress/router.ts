import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../trpc.js'

export const progressRouter = createTRPCRouter({
  overview: publicProcedure
    .input(
      z
        .object({
          userId: z.string().cuid().optional(),
        })
        .optional()
    )
    .query(() => ({
      streakDays: 0,
      totalPoints: 0,
      recentActions: [],
      note: 'TODO: Calculate progress metrics from action logs.',
    })),

  insights: publicProcedure.query(() => ({
    carbonSavedKg: 0,
    topCategory: null,
    note: 'TODO: Summarize personalized insights for the dashboard.',
  })),
})
