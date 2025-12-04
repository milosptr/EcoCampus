import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from '../../../server/src/router'
import { supabase } from '../lib/supabase'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'

/**
 * tRPC React hooks client
 * Use this for queries and mutations in React components
 */
export const trpc = createTRPCReact<AppRouter>()

/**
 * tRPC client instance
 * Configured with:
 * - httpBatchLink for batching requests
 * - Authorization header with Supabase JWT token
 * - superjson transformer for Date and other complex types
 */
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${API_URL}/trpc`,
      transformer: superjson,
      // Force GET requests by setting a high maxURLLength
      maxURLLength: 10000,
      async headers() {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        return {
          Authorization: session?.access_token
            ? `Bearer ${session.access_token}`
            : '',
        }
      },
    }),
  ],
})
