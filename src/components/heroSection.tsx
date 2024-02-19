import Image from 'next/image'

export default function HeroSection() {
  return (
    <header className="flex flex-col items-center pt-16 my-5">
      <h1 className="font-extrabold lg:text-5xl">¡Próximamente!</h1>
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
