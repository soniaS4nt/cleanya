'use server'
import MercadoPagoConfig, { Preference } from 'mercadopago'
import { signIn } from '../../auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

// ...
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.YOUR_ACCESS_TOKEN!,
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidas'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
