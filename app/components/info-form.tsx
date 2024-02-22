'use client'
import React from 'react'
import InfoComponent, { RectangleType } from './infoComponent'
import { useBookingContext } from '@/contexts/bookingsContext'

export default function InfoForm() {
  const { bookingData, setBookingData } = useBookingContext()

  const handleSelection = (data: RectangleType | null, field: string) => {
    if (data !== undefined) {
      setBookingData((prevData) => ({
        ...prevData,
        requerimientos: {
          ...prevData.requerimientos,
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
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '3' },
    { id: 4, value: '4' },
  ]

  const titleTipo = 'Tipo de limpieza'
  const rectanglesTipo = [
    { id: 1, value: 'standard' },
    { id: 2, value: 'deep clean' },
    { id: 3, value: 'Mudanza' },
    { id: 4, value: 'Post Cosntrucción' },
  ]

  const handleSubmit = () => {
    // No necesitas enviar los datos al backend aquí, ya que se manejará en el componente Booking
    console.log('Datos de reserva actualizados:', bookingData)
  }

  return (
    <>
      <InfoComponent
        rectangles={rectanglesHabitaciones}
        title={titleHabitaciones}
        name="habitaciones"
        selected={bookingData.requerimientos?.habitaciones}
        setSelected={(data) => handleSelection(data, 'habitaciones')}
      />
      <InfoComponent
        rectangles={rectanglesBaños}
        title={titleBaños}
        name="baños"
        selected={bookingData.requerimientos?.baños}
        setSelected={(data) => handleSelection(data, 'baños')}
      />
      <InfoComponent
        rectangles={rectanglesTipo}
        title={titleTipo}
        name="tipo"
        selected={bookingData.requerimientos?.tipo}
        setSelected={(data) => handleSelection(data, 'tipo')}
      />
    </>
  )
}
