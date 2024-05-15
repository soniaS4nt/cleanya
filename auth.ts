import { dbConnect } from '@/lib/mongodb'
import users from '@/models/users'
import nextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { authConfig } from './auth.config'
import bcrypt from 'bcrypt'

async function getUser(email: string) {
  dbConnect()
  try {
    const user = await users.findOne({
      email: email,
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { auth, signIn, signOut } = nextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)
          if (!user) return null
          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) {
            return { name: user.name, email: user.email, image: user.image }
          }
        }

        return null
      },
    }),
  ],
})
