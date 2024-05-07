import { fetchBookings } from '@/lib/data'
import Table from '@/components/table'

export default async function Page() {
  const reservas = await fetchBookings()

  return (
    <div className="flex flex-row h-screen m-2 my-80 justify-center">
      <Table data={reservas} />
    </div>
  )
}
