import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../trpc.js'

const leaderboardOverviewInputSchema = z.object({
  campusId: z.string().min(1).default('thws'),
  period: z
    .object({
      year: z
        .number()
        .int()
        .min(2020)
        .max(2100)
        .default(new Date().getFullYear()),
      month: z
        .number()
        .int()
        .min(1)
        .max(12)
        .default(new Date().getMonth() + 1),
    })
    .default({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }),
  userId: z.string().min(1).optional(),
})

type LeaderboardOverviewInput = z.infer<typeof leaderboardOverviewInputSchema>

type LeaderboardEntry = {
  userId: string
  name: string
  campusCode: string
  points: number
}

type RankedEntry = LeaderboardEntry & { rank: number }

const demoLeaderboardData: Record<string, LeaderboardEntry[]> = {
  'thws-2025-11': [
    { userId: 'baby', name: 'Baby Doe', campusCode: 'THWS', points: 2847 },
    { userId: 'janie', name: 'Janie Doe', campusCode: 'THWS', points: 2634 },
    { userId: 'johnny', name: 'Johnny Doe', campusCode: 'THWS', points: 2521 },
    { userId: 'jane', name: 'Jane Doe', campusCode: 'THWS', points: 2156 },
    { userId: 'alex', name: 'Alex Green', campusCode: 'THWS', points: 1900 },
    { userId: 'sam', name: 'Sam Rivers', campusCode: 'THWS', points: 1730 },
  ],
}

const rankEntries = (entries: LeaderboardEntry[]): RankedEntry[] => {
  const sorted = [...entries].sort((a, b) => b.points - a.points)

  return sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }))
}

const getKeyForInput = (input: LeaderboardOverviewInput): string => {
  const { campusId, period } = input
  return `${campusId.toLowerCase()}-${period.year}-${period.month.toString().padStart(2, '0')}`
}

export const leaderboardRouter = createTRPCRouter({
  overview: publicProcedure
    .input(leaderboardOverviewInputSchema.optional())
    .query(({ input }) => {
      const safeInput: LeaderboardOverviewInput = {
        campusId: input?.campusId ?? 'thws',
        period: input?.period ?? {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        },
        userId: input?.userId,
      }

      const storageKey = getKeyForInput(safeInput)
      const entries =
        demoLeaderboardData[storageKey] ??
        demoLeaderboardData['thws-2025-11'] ??
        []
      const rankedEntries = rankEntries(entries)

      const topPerformers = rankedEntries.slice(0, 3)

      const currentUser = safeInput.userId
        ? rankedEntries.find((entry) => entry.userId === safeInput.userId)
        : (rankedEntries[3] ?? rankedEntries[0])

      const periodLabel = new Intl.DateTimeFormat('en', {
        month: 'long',
        year: 'numeric',
      }).format(new Date(safeInput.period.year, safeInput.period.month - 1, 1))

      return {
        period: {
          label: periodLabel,
          year: safeInput.period.year,
          month: safeInput.period.month,
        },
        campusId: safeInput.campusId,
        topPerformers,
        currentUser,
        allRankings: rankedEntries,
        note: 'TODO: Replace with real aggregation from logged eco actions.',
      }
    }),
})
