import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../../trpc.js'

const startOnboardingInputSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  universityCode: z.string().min(1),
})

type StartOnboardingInput = z.infer<typeof startOnboardingInputSchema>

const verifyOnboardingCodeInputSchema = z.object({
  onboardingId: z.string().cuid().optional(),
  code: z.string().length(6),
})

type VerifyOnboardingCodeInput = z.infer<typeof verifyOnboardingCodeInputSchema>

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginInput = z.infer<typeof loginInputSchema>

export const authRouter = createTRPCRouter({
  status: publicProcedure.query(() => ({
    isAuthenticated: false,
    user: null,
    note: 'TODO: Implement session lookup once auth system is wired up.',
  })),

  startOnboarding: publicProcedure
    .input(startOnboardingInputSchema)
    .mutation(({ input }: { input: StartOnboardingInput }) => ({
      onboardingId: 'todo-onboarding-id',
      nextStep: 'verifyEmail',
      submitted: input,
      note: 'TODO: Persist onboarding flow and send verification email.',
    })),

  verifyOnboardingCode: publicProcedure
    .input(verifyOnboardingCodeInputSchema)
    .mutation(({ input }: { input: VerifyOnboardingCodeInput }) => ({
      success: false,
      note: 'TODO: Validate verification codes via email/SMS provider.',
    })),

  login: publicProcedure
    .input(loginInputSchema)
    .mutation(({ input }: { input: LoginInput }) => ({
      token: null,
      note: 'TODO: Implement login and JWT issuance.',
    })),
})
