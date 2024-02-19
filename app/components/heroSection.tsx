import Image from 'next/image'
import ButtonBooking from '@/components/buttonBooking'

export default function HeroSection() {
  return (
    <header className="flex flex-col items-center pt-16 my-5">
      <h1 className="lg:font-extrabold font-bold text-4xl text-center">
        Deja que hagamos el trabajo sucio
      </h1>
      <ButtonBooking href={'/reservar'} />
      <Image
        className=""
        src="/HeroIllustrationMobile.svg"
        alt="Hero"
        width={300}
        height={300}
        priority
      />
    </header>
  )
}
