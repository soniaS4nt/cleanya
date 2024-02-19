import HeroSection from '@/components/heroSection'
import TopNav from '@/components/topNav'
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center mx-auto px-2 lg:px-24 ">
      <TopNav />
      <HeroSection />
    </main>
  )
}
