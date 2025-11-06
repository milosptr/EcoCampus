import { env } from './env.js'
import { createServer } from './server.js'

const bootstrap = async () => {
  const app = await createServer()

  const port = env.PORT

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
    console.log(`tRPC endpoint: http://localhost:${port}/trpc`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
