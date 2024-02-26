'use client'
import React, { useEffect, useState } from 'react'
import { DatePickerHero } from './calendars'
import MultiSelectComponent, { Option } from './multiSelect'
import dayjs from 'dayjs'
import { DatePickerValue } from '@tremor/react'
import { toast } from 'sonner'
import { initialState, useBookingContext } from '@/contexts/bookingsContext'

export interface ReservationData {
  fecha: DatePickerValue | null
  hora: string[]
}

interface Props {
  date: string
  hours: {
    hours: string
    available?: boolean
  }[]
}

export default function CreateForm({ className }: { className: string }) {
  const [options, setOptions] = useState<Option[]>([]) // Inicializar date como un array de cadenas
  const [data, setData] = useState<Props[]>([])
  const { bookingData, setBookingData } = useBookingContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/horasDisponibles`, {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await res.json()
        setData(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [options])

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
      const dateFilter = data?.find((bookings) => bookings.date === newValue)
      console.log({
        newValue: newValue,
        value: data?.map((d) => d.date),
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
      const res = await fetch(`/api/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        toast.warning('Faltan campos por llenar', {
          position: 'bottom-center',
        })
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
    <form onSubmit={handleSubmit} className={className}>
      <div className="min-w-72 mb-10">
        <DatePickerHero onValueChange={handleChange} />
      </div>
      <div className="min-w-72 ">
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
/* export const dynamic = 'force-dynamic' */
