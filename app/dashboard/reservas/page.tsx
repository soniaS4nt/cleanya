import { fetchBookings } from '@/lib/data'
import Table from '@/components/table'

export default async function Page() {
  const reservas = await fetchBookings()

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-2">
        <h1 className={` text-2xl`}>Reservas</h1>
      </div>
      <Table data={reservas} />
    </div>
  )
}
