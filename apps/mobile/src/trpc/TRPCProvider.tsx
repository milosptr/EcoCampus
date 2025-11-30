import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient } from './client'

interface TRPCProviderProps {
  children: React.ReactNode
}

/**
 * Provider component that wraps the app with tRPC and React Query context
 * Must be placed near the root of the component tree
 */
export const TRPCProvider = ({ children }: TRPCProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            staleTime: 30 * 1000, // 30 seconds
          },
        },
      })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
