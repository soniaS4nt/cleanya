import CreateForm from '@/components/create-form'
import DetailsForm from '@/components/details-form'
import InfoForm from '@/components/info-form'
import PagoForm from '@/components/pago-form'
import TabsHero from '@/components/tabs'
import { BookingProvider } from '@/contexts/bookingsContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reserva tu limpieza',
}
function Booking() {
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
          <CreateForm className="'flex flex-col items-center pt-16 my-5'" />
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
      title: 'El pago',
      content: (
        <div>
          <p className="from-neutral-900 font-extrabold text-2xl">El pago</p>
          <PagoForm />
        </div>
      ),
    },
  ]
  return (
    <div className="h-screen m-2">
      <BookingProvider>
        <TabsHero tabs={tabs} className="mt-16" />
      </BookingProvider>
    </div>
  )
}
export default Booking
