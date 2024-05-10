import { fetchBookings } from '@/lib/data'
import Table from '@/components/table'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    state?: string
    startDate: Date
    endDate: Date
    page?: string
  }
}) {
  const state = searchParams?.state || ''
  const startDate = searchParams?.startDate || ''
  const endDate = searchParams?.endDate || ''

  const currentPage = Number(searchParams?.page) || 1
  const { bookings, totalPages } = await fetchBookings(
    state,
    startDate,
    endDate,
    currentPage
  )

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-2">
        <h1 className={` text-2xl`}>Reservas</h1>
      </div>
      <Table data={bookings} currentPage={currentPage} pages={totalPages} />
    </div>
  )
}
