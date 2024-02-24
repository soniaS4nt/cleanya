import HeroSection from '@/components/heroSection'
import { API_URL } from './lib/constants'

export default function Home() {
  if (!API_URL) {
    return null
  }
  console.log({ 'esta es la varEnt': process.env.NEXT_PUBLIC_BASE_API_URL })

  return (
    <main className="flex flex-col items-center justify-center mx-auto px-6 lg:px-24 ">
      <HeroSection />
    </main>
  )
}
