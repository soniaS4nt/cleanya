import LocationIcon from '@/components/icons/locationIcon'
import PhoneIcon from './icons/phoneIcon'
import MailIcon from './icons/mailIcon'
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center min-h-96 bg-[rgb(216,216,216)]"
    >
      <div className="flex flex-col md:w-2/4 text-center">
        <h1 className="lg:font-extrabold font-bold text-4xl text-center m-3">
          Contáctanos
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          illum quisquam voluptas facere odit omnis facilis minus possimus rem,
          expedita eos quibusdam ab qui dolorum hic magnam quae saepe. Quas.
        </p>
        <div className="flex flex-col sm:flex-row justify-between m-3">
          <ul>
            <li className="flex flex-row justify-between">
              <p> lunes-viernes</p>
              <p className="text-tremor-brand font-extrabold mx-2">
                08:00 -19:00
              </p>
            </li>
          </ul>
          <ul>
            <li className="flex flex-row">
              <LocationIcon />
              <p className="mx-2">La serena, Coquimbo</p>
            </li>
            <li className="flex flex-row">
              <PhoneIcon />
            </li>
            <li className="flex flex-row">
              <MailIcon />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
