import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopNav from '@/components/topNav'
import { Toaster } from 'sonner'
import FooterSection from './components/footerSection'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CleanYa App',
  description: 'Empresa dedicada a la limpieza',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
