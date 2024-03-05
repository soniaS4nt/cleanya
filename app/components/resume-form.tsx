'use client'
import { useBookingContext } from '@/contexts/bookingsContext'
import { Card, Divider } from '@tremor/react'
import dayjs from 'dayjs'
import PersonalInfo from './personalInfo-form'

const ReservationSummary = () => {
  const { bookingData, dispatch } = useBookingContext()

  const { requirements, fechaHora, pago, detalles } = bookingData
  const formattedPago = pago?.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
  const formatBathrooms = () => {
    if (requirements.bathrooms) {
      const value = parseInt(requirements.bathrooms.value)
      return `${value} ${value > 1 ? 'baños' : 'baño'}`
    } else {
      return 'No especificado'
    }
  }
  return (
    <Card className="grid place-content-center">
      <h2 className="text-tremor-brand text-center font-extrabold mb-2">
        Datos personales
      </h2>
      <PersonalInfo dispatch={dispatch} bookingData={bookingData} />
      <Divider />
      <h2 className="text-tremor-brand text-center font-extrabold mb-2">
        Resumen de la reserva
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-1">
        <li>
          {requirements.rooms
            ? requirements.rooms.value === 'Estudio'
              ? 'Estudio'
              : `${parseInt(requirements.rooms.value)} habitacion${
                  parseInt(requirements.rooms.value) > 1 ? 'es' : ''
                }`
            : 'No especificado'}
        </li>
        <li>
          {requirements.bathrooms
            ? `${parseInt(requirements.bathrooms.value)} ${
                parseInt(requirements.bathrooms.value) > 1 ? 'baños' : 'baño'
              }`
            : 'No especificado'}
        </li>
        <li>
          {requirements.tipo ? requirements.tipo.value : 'No especificado'}
        </li>
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
        <p>
          {fechaHora.fecha
            ? dayjs(fechaHora.fecha).format('DD/MM/YYYY')
            : 'No especificado'}
        </p>
        <p>{fechaHora.hora.length > 0 ? fechaHora.hora : 'No especificado'}</p>
        <p className="border-tremor-brand border-2 rounded-lg p-1">
          {' '}
          Pago Total: {formattedPago}
        </p>
      </div>
    </Card>
  )
}

export default ReservationSummary
