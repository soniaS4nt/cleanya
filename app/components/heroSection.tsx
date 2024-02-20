import Image from 'next/image'
import ButtonBooking from '@/components/buttonBooking'

export default function HeroSection() {
  return (
    <header className="flex flex-col items-center justify-center pt-16 my-5 md:bg-[url('/HeroIllustration.svg')] bg-no-repeat bg-contain md:w-screen md:h-screen">
      <h1 className="lg:font-extrabold font-bold text-4xl text-center">
        Deja que hagamos el trabajo sucio
      </h1>
      <ButtonBooking href={'/reservar'} className={'md:w-1/4'} />
      <Image
        className="flex md:hidden"
        src="/HeroIllustrationMobile.svg"
        alt="Hero"
        width={300}
        height={300}
        priority
      />
    </header>
  )
}
