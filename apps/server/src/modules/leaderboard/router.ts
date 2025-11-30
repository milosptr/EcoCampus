import { createTRPCRouter, publicProcedure } from '../../trpc.js'

export const leaderboardRouter = createTRPCRouter({
  /**
   * Monthly student leaderboard used by the mobile app
   *
   * NOTE: This currently returns static sample data that matches the
   * leaderboard wireframes. Once action logging and points are
   * implemented, replace this with a real Prisma aggregation query.
   */
  studentMonthly: publicProcedure.query(() => {
    const periodLabel = 'November 2025'

    const rankings = [
      { rank: 1, name: 'Baby Doe', university: 'THWS', points: 2847 },
      { rank: 2, name: 'Janie Doe', university: 'THWS', points: 2634 },
      { rank: 3, name: 'Johnny Doe', university: 'TUM', points: 2521 },
      { rank: 4, name: 'John Doe', university: 'THWS', points: 2398 },
      { rank: 5, name: 'Jane Doe', university: 'THWS', points: 2156 },
      { rank: 6, name: 'Noah Davis', university: 'LMU', points: 2043 },
      { rank: 7, name: 'Sophia Miller', university: 'THWS', points: 1987 },
      { rank: 8, name: 'Liam Johnson', university: 'TUM', points: 1876 },
      { rank: 9, name: 'Ava Martinez', university: 'LMU', points: 1754 },
      { rank: 10, name: 'Ethan Garcia', university: 'THWS', points: 1698 },
    ]

    const topPerformers = rankings.slice(0, 3).map((entry) => ({
      rank: entry.rank,
      name: entry.name,
      initials: entry.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join(''),
      university: entry.university,
      points: entry.points,
    }))

    const yourRank = {
      ...rankings[4],
      ecoLevel: 'Eco Level 3',
    }

    return {
      periodLabel,
      topPerformers,
      yourRank,
      rankings,
    }
  }),
})
