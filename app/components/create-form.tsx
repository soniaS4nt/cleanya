'use client'
import React, { useEffect, useState } from 'react'
import { DatePickerHero } from './calendars'
import MultiSelectComponent, { Option } from './multiSelect'
import dayjs from 'dayjs'
import { DatePickerValue } from '@tremor/react'
import { useBookingContext } from '@/contexts/bookingsContext'
import { HoursDocument } from '@/lib/definitions'

export default function CreateForm({ className }: { className: string }) {
  const [options, setOptions] = useState<Option[]>([]) // Inicializar date como un array de cadenas
  const [data, setData] = useState<HoursDocument[]>([])
  const { bookingData, dispatch } = useBookingContext()

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/horasDisponibles`, {
        cache: 'no-store',
      })

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await res.json()

      return setData(data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    let ignore = false

    // Función para realizar la solicitud de datos
    const fetchDataAndSetData = async () => {
      // Se verifica si la solicitud de datos debe ser ignorada
      if (!ignore) {
        await fetchData()
      }
    }

    // Se llama a la función para realizar la solicitud de datos
    fetchDataAndSetData()

    // Función de limpieza para controlar el momento en que se desmonta el componente
    return () => {
      ignore = true
    }
  }, [bookingData.fechaHora.hora])

  const handleChange = (value: DatePickerValue) => {
    bookingData.fechaHora.hora = []
    const newValue = dayjs(value).format('D/M/YYYY')
    dispatch({
      type: 'CREATE_BOOKING_DATA',
      payload: {
        fechaHora: {
          ...bookingData.fechaHora,
          fecha: value,
        },
      },
    })
    if (value) {
      const dateFilter = data?.find((bookings) => bookings.date === newValue)

      if (dateFilter) {
        const availableHours = dateFilter.hours
          .filter((hour) => hour.available === true)
          .map((hour) => ({
            hours: hour.hours,
            available: hour.available,
          }))
        setOptions(availableHours)
      } else {
        setOptions([])
      }
    }
  }

  const handleChangeHours = (value: string[]) => {
    dispatch({
      type: 'CREATE_BOOKING_DATA',
      payload: {
        fechaHora: {
          ...bookingData.fechaHora,
          hora: value,
        },
      },
    })
  }

  const availableDates = data.map(({ date }) => date)
  return (
    <form className={className}>
      <div className="min-w-72 mb-10">
        <DatePickerHero
          availableDates={availableDates}
          onValueChange={handleChange}
          value={bookingData.fechaHora?.fecha as DatePickerValue}
        />
      </div>
      <div className="min-w-72 ">
        <MultiSelectComponent
          value={bookingData.fechaHora?.hora}
          onValueChange={handleChangeHours}
          options={options}
        />
      </div>
    </form>
  )
}
