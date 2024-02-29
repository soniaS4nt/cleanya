import type { Metadata } from 'next'
import { Inter, Josefin_Sans } from 'next/font/google'
import './globals.css'
import TopNav from '@/components/navBar/topNav'
import { Toaster } from 'sonner'
import FooterSection from './components/footerSection'

const inter = Inter({ subsets: ['latin'] })
const joseFin = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { template: '%s | CleanYA', default: 'CleanYa App' },
  description: 'Empresa dedicada a la limpieza',
  metadataBase: new URL('https://cleanya.shop'),
  keywords: [
    'limpieza',
    'limpieza de alfombras',
    'servicio de limpieza',
    'limpieza profesional',
    'limpieza a domicilio',
    'empresa de limpieza',
    'limpieza de interiores',
    'limpieza de exteriores',
    'limpieza de hogar',
    'limpieza residencial',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={joseFin.className}>
        <TopNav />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
