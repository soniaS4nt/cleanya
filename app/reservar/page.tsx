import CreateForm from '@/components/create-form'
import TabsHero from '@/components/tabs'
import { getData } from '@/lib/data'

async function Booking() {
  const hoursData = await getData()
  const { data } = hoursData
  //const appoiment = await postAppoiment()
  const tabs = [
    {
      title: 'Reserva',
      content: (
        <div>
          <p>Contenido de la reserva</p>
          <CreateForm data={data} />
        </div>
      ),
    },
    {
      title: 'Otra pestaña',
      content: <p>Contenido de otra pestaña</p>,
    },
    // Añade más objetos de pestaña según sea necesario
  ]
  return (
    <div>
      <TabsHero tabs={tabs} className="mt-16" />
    </div>
  )
}
export default Booking
