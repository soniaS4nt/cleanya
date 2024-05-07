import '@/globals.css'

import SideNav from '@/components/sideMenu/sidenav'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-2">
            {children}
          </div>
          <Toaster richColors expand />
        </div>
      </body>
    </html>
  )
}
