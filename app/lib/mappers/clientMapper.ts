import { BookingData } from '@/reducers/dataBooking'

export const clientMapper = (data: BookingData, id: string) => ({
  fullName: data.client.fullName,
  email: data.client.email,
  appointments: [id],
})
