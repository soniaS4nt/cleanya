'use client'
import React, { useState } from 'react'
import { DatePickerHero } from './calendars'
import MultiSelectComponent, { Option } from './multiSelect'
import dayjs from 'dayjs'
import { DatePickerValue } from '@tremor/react'
import { toast } from 'sonner'

interface ReservationData {
  date: DatePickerValue | undefined
  hours: string[]
}

interface Props {
  data: {
    _id: string
    date: string
    hours: {
      hours: string
      available?: boolean
    }[]
  }[]
}

const reservaData = {
  date: undefined,
  hours: [],
}

export default function CreateForm({ data }: Props) {
  const [options, setOptions] = useState<Option[]>([]) // Inicializar date como un array de cadenas
  const [reserva, setReserva] = useState<ReservationData>(reservaData)

  const handleChange = (value: DatePickerValue) => {
    setOptions([])
    setReserva({ ...reserva, date: value })
    const newValue = dayjs(value).format('DD/MM/YY')
    if (value) {
      const dateFilter = data.find(
        (bookings) => dayjs(bookings.date).format('DD/MM/YY') === newValue
      )
      return dateFilter ? setOptions(dateFilter.hours) : setOptions([])
    }
  }

  const handleChangeHours = (value: string[]) => {
    setReserva({ ...reserva, hours: value })
  }
  async function postAppoiment(body: any) {
    try {
      const res = await fetch('http://localhost:3001/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        // Aquí maneja la situación en la que la solicitud no fue exitosa (por ejemplo, error de servidor)
        throw new Error('Error al enviar la solicitud')
      }

      // Si la solicitud fue exitosa, puedes manejar la respuesta si es necesario
      const data = await res.json()
      return data // Devuelve los datos de respuesta si es necesario
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await postAppoiment(reserva)
    if (res.status === 1) {
      toast.success('La reserva fue hecha exitosamente', {
        position: 'top-center',
      })
      //se limpia el calendario y select o forms
    } else {
      toast.error('No se pudo reservar', {
        position: 'top-center',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={'flex flex-col items-center pt-16 my-5'}
    >
      <DatePickerHero onValueChange={handleChange} />

      <MultiSelectComponent
        onValueChange={handleChangeHours}
        options={options}
      />
      <button type="submit" className="bg-blue-500">
        {' '}
        reservar
      </button>
    </form>
  )
}
