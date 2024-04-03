import LocationIcon from '@/components/icons/locationIcon'
import PhoneIcon from './icons/phoneIcon'
import MailIcon from './icons/mailIcon'
import Link from 'next/link'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex flex-col items-center p-16 justify-center min-h-[500px] bg-[rgb(216,216,216)]"
    >
      <div className="flex flex-col m-10 md:w-2/4 text-center">
        <h1 className="lg:font-extrabold font-bold text-4xl text-center m-3">
          Contáctanos
        </h1>
        <p>
          ¡Tu satisfacción es nuestra prioridad número uno! ¿Tienes alguna
          pregunta, inquietud o simplemente quieres decir hola? ¡Estamos aquí
          para ayudarte!
        </p>
        <div className="flex flex-col mt-10 gap-9 sm:flex-row justify-between m-3">
          <ul>
            <li className="flex flex-row justify-between">
              <p>Lun - Sáb</p>
              <p className="text-tremor-brand font-extrabold mx-2">
                09:00 -19:00
              </p>
            </li>
            <li className="flex flex-row justify-between">
              <p>Domingo</p>
              <p className="text-tremor-brand font-extrabold mx-2">
                10:00 - 14:00
              </p>
            </li>
          </ul>
          <ul>
            <li className="flex flex-row">
              <LocationIcon />
              <p className="mx-2 text-sm">La serena, Coquimbo</p>
            </li>
            <li className="flex flex-row">
              <PhoneIcon />
              <p className="mx-2 text-sm">+56 9 5646 8634</p>
            </li>
            <li className="flex flex-row">
              <Link href="mailto:cleanya.ayuda@gmail.com">
                <MailIcon />
              </Link>
              <p className="mx-2 text-sm">cleanya.ayuda@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
