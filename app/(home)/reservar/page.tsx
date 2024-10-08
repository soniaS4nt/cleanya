import CreateForm from '@/components/create-form'
import DetailsForm from '@/components/details-form'
import InfoForm from '@/components/info-form'
import PagoForm from '@/components/pago-form'
import ReservationSummary from '@/components/resume-form'
import TabsHero from '@/components/tabs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reserva tu limpieza',
}
const tabs = [
  {
    title: 'Requerimientos',
    content: (
      <div>
        <p className="from-neutral-900 font-extrabold text-2xl">
          Adapta tus requisitos según tus necesidades
        </p>
        <InfoForm className={''} />
      </div>
    ),
  },
  {
    title: 'Reserva fecha y hora',
    content: (
      <div>
        <p className="from-neutral-900 font-extrabold text-2xl">
          Reserva la fecha
        </p>
        <CreateForm className="flex flex-col items-center pt-80 my-5" />
      </div>
    ),
  },
  {
    title: 'Detalles',
    content: (
      <div>
        <DetailsForm className="" />
      </div>
    ),
  },
  {
    title: 'Resumen',
    content: (
      <div>
        <ReservationSummary />
      </div>
    ),
  },
  /*  {
    title: 'El pago',
    content: (
      <div>
        <p className="from-neutral-900 font-extrabold text-2xl">El pago</p>
        <PagoForm />
      </div>
    ),
  }, */
]
function Booking() {
  return (
    <div className="block h-screen pt-16 m-4 mb-20">
      <TabsHero tabs={tabs} className=" h-auto" />
    </div>
  )
}
export default Booking
