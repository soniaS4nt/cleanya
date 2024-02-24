import CreateForm from '@/components/create-form'
import DetailsForm from '@/components/details-form'
import InfoForm from '@/components/info-form'
import TabsHero from '@/components/tabs'
import { BookingProvider } from '@/contexts/bookingsContext'

async function Booking() {
  const tabs = [
    {
      title: 'Requerimientos',
      content: (
        <div>
          <p className="from-neutral-900 font-extrabold text-2xl">
            Adapta tus requisitos según tus necesidades
          </p>
          <InfoForm />
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
          <CreateForm />
        </div>
      ),
    },
    {
      title: 'Detalles',
      content: (
        <div>
          <DetailsForm />
        </div>
      ),
    },
    {
      title: 'El pago',
      content: (
        <div>
          <p className="from-neutral-900 font-extrabold text-2xl">El pago</p>
        </div>
      ),
    },
  ]
  return (
    <div className="h-screen">
      <BookingProvider>
        <TabsHero tabs={tabs} className="mt-16" />
      </BookingProvider>
    </div>
  )
}
export default Booking
