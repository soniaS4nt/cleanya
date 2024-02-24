import HeroSection from '@/components/heroSection'

export default function Home() {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) {
    return null
  }
  return (
    <main className="flex flex-col items-center justify-center mx-auto px-6 lg:px-24 ">
      <HeroSection />
    </main>
  )
}
