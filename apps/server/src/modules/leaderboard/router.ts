import { createTRPCRouter, publicProcedure } from '../../trpc.js'

export const leaderboardRouter = createTRPCRouter({
  topCampuses: publicProcedure.query(() => ({
    range: 'monthly',
    entries: [
      {
        rank: 1,
        campus: 'Sample University',
        score: 4200,
        note: 'TODO: Aggregate from campus submissions.',
      },
      {
        rank: 2,
        campus: 'Placeholder College',
        score: 3100,
        note: 'TODO: Aggregate from campus submissions.',
      },
    ],
  })),

  campusLeaders: publicProcedure.query(() => ({
    campusId: 'todo-campus-id',
    entries: [
      {
        rank: 1,
        studentName: 'Jordan Example',
        points: 1200,
        note: 'TODO: Replace with leaderboard query.',
      },
    ],
  })),
})
