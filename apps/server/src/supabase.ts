import express from 'express'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import { env } from './env.js'

export interface SupabaseAuth {
  userId: string | null
  email: string | null
}

/**
 * Supabase client initialized with service role key for backend operations.
 * This client has elevated privileges and should only be used on the server.
 */
export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export const adminAuthClient = supabase.auth.admin

/**
 * Verify JWT token from request and return user info
 */
export const verifyJWTFromRequest = async (
  req: express.Request
): Promise<SupabaseAuth | null> => {
  try {
    const authHeader = req?.headers?.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return null
    }

    // Verify JWT signature using Supabase JWT secret
    // This validates that the token was signed by Supabase and hasn't been tampered with
    const decoded = jwt.verify(token, env.SUPABASE_JWT_SECRET) as jwt.JwtPayload

    if (!decoded) {
      throw new Error('Invalid token')
    }

    // Double verification: Also validate token with Supabase API (defense in depth)
    const { data, error } = await supabase.auth.getUser(token)

    if (error) {
      throw new Error('Invalid token')
    }

    return {
      userId: data.user.id,
      email: data.user.email ?? null,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export type SupabaseClient = typeof supabase
