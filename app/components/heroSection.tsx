import Image from 'next/image'
import ButtonBooking from '@/components/buttonBooking'

export default function HeroSection() {
  return (
    <>
      <header className="flex flex-col items-center justify-center pt-16 my-5 md:bg-[url('/HeroIllustration.svg')] bg-no-repeat bg-contain md:w-screen md:h-screen mb-5">
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
      <div className="flex flex-row">
        <h1 className="from-neutral-900 font-extrabold text-2xl">
          ¿Por qué elegirnos?
        </h1>
        <p>
          Bienvenido a CleanYa, tu solución integral para una limpieza impecable
          y rápida. En CleanYa, entendemos que la limpieza es más que un simple
          deber; es una forma de vida que transforma espacios y promueve la
          tranquilidad. Nos enorgullece ofrecerte servicios de limpieza
          excepcionales para tu hogar, oficina o espacio comercial. En CleanYa,
          nuestra misión es brindarte comodidad y tranquilidad al proporcionarte
          un ambiente limpio y saludable para vivir y trabajar. Nos destacamos
          por nuestra atención al detalle, nuestra eficiencia y nuestro
          compromiso con la satisfacción del cliente en cada servicio que
          ofrecemos.
        </p>
      </div>

      <Image
        className="flex "
        src="/Illustration.svg"
        alt=""
        width={900}
        height={600}
      />
    </>
  )
}
