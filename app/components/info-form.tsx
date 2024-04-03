'use client'
import { RectangleType } from '@/lib/definitions'
import InfoComponent from './infoComponent'
import { useBookingContext } from '@/contexts/bookingsContext'

export default function InfoForm({ className }: { className: string }) {
  const { bookingData, dispatch } = useBookingContext()

  const handleSelection = (data: RectangleType | null, field: string) => {
    // Envía una acción para actualizar el estado de la reserva con los nuevos datos de requisitos
    if (data !== undefined) {
      dispatch({
        type: 'CREATE_BOOKING_DATA',
        payload: {
          requirements: {
            ...bookingData.requirements,
            [field]: data,
          },
        },
      })
      dispatch({
        type: 'CALCULATE_TOTAL_PAYMENT',
      })
    }
  }

  const titleHabitaciones = 'N° de habitaciones'
  const rectanglesHabitaciones = [
    { id: 1, value: 'Estudio', price: 0 },
    { id: 2, value: '1', price: 0 },
    { id: 3, value: '2', price: 0 },
    { id: 4, value: '3', price: 1500 },
    { id: 5, value: '4', price: 3000 },
    { id: 6, value: '5', price: 6000 },
  ]

  const titleBaños = 'N° de Baños'
  const rectanglesBaños = [
    { id: 7, value: '1', price: 0 },
    { id: 8, value: '2', price: 1500 },
    { id: 9, value: '3', price: 3000 },
    { id: 10, value: '4', price: 6000 },
  ]

  const titleTipo = 'Tipo de limpieza'
  const rectanglesTipo = [
    { id: 11, value: 'básica', price: 27000 },
    { id: 12, value: 'limpieza profunda', price: 40000 },
    { id: 13, value: 'Mudanza', price: 60000 },
    { id: 14, value: 'Post Cosntrucción', price: 70000 },
  ]

  return (
    <div className={className}>
      <InfoComponent
        rectangles={rectanglesHabitaciones}
        title={titleHabitaciones}
        name="rooms"
        selected={bookingData.requirements?.rooms}
        setSelected={(data) => handleSelection(data, 'rooms')}
      />
      <InfoComponent
        rectangles={rectanglesBaños}
        title={titleBaños}
        name="bathrooms"
        selected={bookingData.requirements?.bathrooms}
        setSelected={(data) => handleSelection(data, 'bathrooms')}
      />
      <InfoComponent
        rectangles={rectanglesTipo}
        title={titleTipo}
        name="tipo"
        selected={bookingData.requirements?.tipo}
        setSelected={(data) => handleSelection(data, 'tipo')}
      />
    </div>
  )
}
