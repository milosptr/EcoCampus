import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../trpc.js'

const logActionInputSchema = z.object({
  categoryId: z.string(),
  actionId: z.string(),
  notes: z.string().max(280).optional(),
  occurredAt: z.coerce.date().optional(),
})

type LogActionInput = z.infer<typeof logActionInputSchema>

export const actionsRouter = createTRPCRouter({
  listCategories: publicProcedure.query(() => ({
    categories: [
      { id: 'transport', title: 'Transportation', note: 'TODO: Load from database' },
      { id: 'digital', title: 'Digital Cleanup', note: 'TODO: Load from database' },
      { id: 'energy', title: 'Energy', note: 'TODO: Load from database' },
    ],
  })),

  logAction: publicProcedure
    .input(logActionInputSchema)
    .mutation(({ input }: { input: LogActionInput }) => ({
      actionLogId: 'todo-action-log-id',
      received: input,
      note: 'TODO: Persist action log and trigger progress recalculation.',
    })),
})
