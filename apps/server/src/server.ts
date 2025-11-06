import cors from 'cors'
import express from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { createContext } from './context.js'
import { env } from './env.js'
import { appRouter } from './router.js'

export type App = express.Express

export const createServer = async (): Promise<App> => {
  const app = express()

  app.set('trust proxy', env.isProduction)

  app.use(cors())
  app.use(express.json())

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )

  return app
}
