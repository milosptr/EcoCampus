import { actionsRouter } from './modules/actions/index.js'
import { authRouter } from './modules/auth/index.js'
import { leaderboardRouter } from './modules/leaderboard/index.js'
import { profileRouter } from './modules/profile/index.js'
import { progressRouter } from './modules/progress/index.js'
import { userRouter } from './modules/user/index.js'
import { createCallerFactory, createTRPCRouter, publicProcedure } from './trpc.js'

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })),

  auth: authRouter,
  user: userRouter,
  actions: actionsRouter,
  leaderboard: leaderboardRouter,
  progress: progressRouter,
  profile: profileRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
