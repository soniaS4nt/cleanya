'use client'
import React, { useState } from 'react'
import { DatePickerHero } from '@/components/calendars'

export default function Booking() {
  // Función para manejar el cambio de fecha
  const handleDateChange = (fecha: any) => {
    // Aquí podrías realizar cualquier procesamiento adicional con la fecha si lo necesitas
    console.log(fecha)
  }

  return (
    <div className={'flex flex-col items-center pt-16 my-5'}>
      <DatePickerHero onValueChange={handleDateChange} />
    </div>
  )
}
