import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isOnBookingPage = request?.nextUrl?.pathname === '/reservar'

      // Permitir acceso a todas las páginas si el usuario está autenticado
      if (isLoggedIn) {
        return true
      }

      // Prohibir acceso a la página de reservar para usuarios no autenticados
      if (isOnBookingPage) {
        return false
      }

      // Permitir acceso a todas las demás páginas para usuarios no autenticados
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
