'use client'
import React, { useState } from 'react'
import { DatePickerHero } from '@/components/calendars'
import MultiSelectComponent from '@/components/multiSelect'
import dayjs from 'dayjs'
import { DatePickerValue } from '@tremor/react'
const DEFAULT_HOURS_AVAILABLE: { time: string }[] = [
  { time: '09:00-10:00' },
  { time: '11:00-12:00' },
  { time: '13:00-14:00' },
  { time: '15:00-16:00' },
]
export default function Booking() {
  const [book, setBook] = useState<string[]>([]) // Inicializar date como un array de cadenas
  const [date, setDate] = useState<string>(dayjs(new Date()).format('DD/MM/YY'))

  const handleChange = (hours: string[]) => {
    //if(date) aqui deberia ser si la fecha esta diponible
    setBook(hours)
  }
  const handleDateChange = (date: DatePickerValue) => {
    const dateFormat = dayjs(date).format('DD/MM/YY')
    setDate(dateFormat)
  }

  const handleSubmit = () => {
    console.log(date, book)
  }
  return (
    <div className={'flex flex-col items-center pt-16 my-5'}>
      fecha: <DatePickerHero onValueChange={handleDateChange} />
      horas disponibles:{' '}
      <MultiSelectComponent
        onValueChange={handleChange}
        value={book}
        options={DEFAULT_HOURS_AVAILABLE}
      />
      {/* aqui deberia ser que un boton next */}
      <button onClick={handleSubmit}>Reservar</button>
    </div>
  )
}
