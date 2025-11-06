import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './router'
import { createContext } from './context'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// tRPC endpoint
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 tRPC endpoint: http://localhost:${PORT}/trpc`)
})
