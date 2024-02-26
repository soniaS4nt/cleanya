'use client'
import React from 'react'
import InfoComponent, { RectangleType } from './infoComponent'
import { useBookingContext } from '@/contexts/bookingsContext'

export default function InfoForm({ className }: { className: string }) {
  const { bookingData, setBookingData } = useBookingContext()

  const handleSelection = (data: RectangleType | null, field: string) => {
    if (data !== undefined) {
      setBookingData((prevData) => ({
        ...prevData,
        requirements: {
          ...prevData.requirements,
          [field]: data,
        },
      }))
    }
  }

  const titleHabitaciones = 'N° de habitaciones'
  const rectanglesHabitaciones = [
    { id: 1, value: 'Estudio' },
    { id: 2, value: '1' },
    { id: 3, value: '2' },
    { id: 4, value: '3' },
    { id: 5, value: '4' },
    { id: 6, value: '5' },
  ]

  const titleBaños = 'N° de Baños'
  const rectanglesBaños = [
    { id: 7, value: '1' },
    { id: 8, value: '2' },
    { id: 9, value: '3' },
    { id: 10, value: '4' },
  ]

  const titleTipo = 'Tipo de limpieza'
  const rectanglesTipo = [
    { id: 11, value: 'standard' },
    { id: 12, value: 'deep clean' },
    { id: 13, value: 'Mudanza' },
    { id: 14, value: 'Post Cosntrucción' },
  ]

  const handleSubmit = () => {
    // No necesitas enviar los datos al backend aquí, ya que se manejará en el componente Booking
    console.log('Datos de reserva actualizados:', bookingData)
  }

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
