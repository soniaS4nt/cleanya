import CreateForm from '@/components/create-form'
import DetailsForm from '@/components/details-form'
import InfoForm from '@/components/info-form'
import TabsHero from '@/components/tabs'
import { BookingProvider } from '@/contexts/bookingsContext'
import { getData } from '@/lib/data'

async function Booking() {
  const hoursData = await getData()
  const { data } = hoursData
  //const appoiment = await postAppoiment()
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
      title: 'Reserva la fecha',
      content: (
        <div>
          <p className="from-neutral-900 font-extrabold text-2xl">
            Reserva la fecha
          </p>
          <CreateForm data={data} />
        </div>
      ),
    },
    {
      title: 'Reserva la hora',
      content: (
        <div>
          <p className="from-neutral-900 font-extrabold text-2xl">
            Reserva la hora
          </p>
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
    // Añade más objetos de pestaña según sea necesario
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
