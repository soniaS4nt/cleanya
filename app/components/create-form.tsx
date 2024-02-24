'use client'
import React, { useState } from 'react'
import { DatePickerHero } from './calendars'
import MultiSelectComponent, { Option } from './multiSelect'
import dayjs from 'dayjs'
import { DatePickerValue } from '@tremor/react'
import { toast } from 'sonner'
import { initialState, useBookingContext } from '@/contexts/bookingsContext'
import { API_URL } from '@/lib/constants'

export interface ReservationData {
  fecha: DatePickerValue | null
  hora: string[]
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

export default function CreateForm({ data }: Props) {
  const [options, setOptions] = useState<Option[]>([]) // Inicializar date como un array de cadenas
  const { bookingData, setBookingData } = useBookingContext()

  const handleChange = (value: DatePickerValue) => {
    setOptions([])
    setBookingData((prevData) => ({
      ...prevData,
      fechaHora: {
        ...prevData.fechaHora,
        fecha: value,
      },
    }))

    const newValue = dayjs(value).format('D/M/YYYY')

    if (value) {
      const dateFilter = data.find((bookings) => bookings.date === newValue)
      console.log({
        newValue: newValue,
        value: data.map((d) => d.date),
      })

      if (dateFilter) {
        // Filtrar las horas disponibles
        const availableHours = dateFilter.hours.filter(
          (hour) => hour.available === true
        )

        // Actualizar las opciones con las horas disponibles
        setOptions(availableHours)
      } else {
        // Si no se encuentra ninguna reserva para la fecha seleccionada, limpiar las opciones
        setOptions([])
      }
      /*  return dateFilter ? setOptions(dateFilter.hours) : setOptions([]) */
    }
  }
  const clearBookingData = () => {
    setBookingData({
      requirements: {
        rooms: null,
        bathrooms: null,
        tipo: null,
      },
      fechaHora: {
        fecha: null,
        hora: [],
      },
      pago: '',
      detalles: {
        frecuencia: null,
        direccion: {
          region: '',
          comuna: '',
          calle: '',
          numero: '',
          adicionales: '',
        },
        instrucciones: null,
      },
    })
  }
  const clearBookingDataAndForm = () => {
    // Limpiar los datos del contexto
    clearBookingData()

    // Restablecer los valores de los campos del formulario
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
      input.value = ''
    })
  }
  const handleChangeHours = (value: string[]) => {
    setBookingData((prevData) => ({
      ...prevData,
      fechaHora: {
        ...prevData.fechaHora,
        hora: value,
      },
    }))
  }
  async function postAppoiment(body: any) {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + '/reservas',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

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
  console.log(bookingData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await postAppoiment(bookingData)
    if (res.status === 1) {
      toast.success('La reserva fue hecha exitosamente', {
        position: 'top-center',
      })
      //se limpia el calendario y select o forms
      clearBookingDataAndForm()
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
      <div className="shadow-lg rounded-lg min-w-72 mb-10">
        <DatePickerHero onValueChange={handleChange} />
      </div>
      <div className="shadow-lg rounded-lg min-w-72 ">
        <MultiSelectComponent
          onValueChange={handleChangeHours}
          options={options}
        />
      </div>
      <button type="submit" className="bg-blue-500">
        {' '}
        reservar
      </button>
    </form>
  )
}
