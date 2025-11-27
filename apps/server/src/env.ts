import { config } from 'dotenv'
import { z } from 'zod'

config({ path: process.env.ENV_FILE ?? '.env' })

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    PORT: z.coerce.number().int().positive().max(65535).default(3000),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    DIRECT_URL: z.string().min(1, 'DIRECT_URL is required'),
    SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL'),
    SUPABASE_SERVICE_ROLE_KEY: z
      .string()
      .min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
    SUPABASE_JWT_SECRET: z
      .string()
      .min(32, 'SUPABASE_JWT_SECRET must be at least 32 characters'),
  })
  .transform((values) => ({
    ...values,
    isProduction: values.NODE_ENV === 'production',
    isDevelopment: values.NODE_ENV === 'development',
    isTest: values.NODE_ENV === 'test',
  }))

export const env = envSchema.parse(process.env)

export type Env = typeof env
