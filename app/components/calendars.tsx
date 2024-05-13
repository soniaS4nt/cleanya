'use client'
import { useState } from 'react'
import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
  DatePicker,
  DatePickerValue,
} from '@tremor/react'
import { es } from 'date-fns/locale'
import { filteredDates } from '@/lib/utils'

type Props = {
  name?: string
  title?: string
  value?: DatePickerValue
  availableDates?: any
  onValueChange: (date: DatePickerValue) => void
}
export function DateRangePickerHero({
  onValueChange,
}: {
  onValueChange: (value: DateRangePickerValue) => void
}) {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  })
  const handleValueChange = (newValue: DateRangePickerValue) => {
    setValue(newValue)
    onValueChange(newValue) // Llama a la función proporcionada por el padre para actualizar el valor
  }

  return (
    <DateRangePicker
      className="my-1 max-w-md"
      value={value}
      onValueChange={handleValueChange}
      locale={es}
      placeholder=""
      selectPlaceholder="Seleccionar"
      color="rose"
    >
      {/*  <DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
        Año transcurrido
      </DateRangePickerItem>
      <DateRangePickerItem
        key="half"
        value="half"
        from={new Date(2023, 0, 1)}
        to={new Date(2023, 5, 31)}
      >
        Primer semestre
      </DateRangePickerItem> */}
    </DateRangePicker>
  )
}

export function DatePickerHero({
  onValueChange,
  value,
  availableDates,
}: Props) {
  /*   const [value, setValue] = useState<DatePickerValue>() */

  // Función para manejar cambios en la selección de fecha
  const handleChange = (newValue: DatePickerValue) => {
    /*  setValue(newValue) // Actualiza el estado con la nueva fecha */
    onValueChange(newValue) // Llama a la función proporcionada con la nueva fecha
  }
  const disabledDates = filteredDates(availableDates)

  return (
    <DatePicker
      /*    minDate={new Date(2024, 5, 1)}
      maxDate={new Date(2024, 6, 30)} //Controls the mininmum and maximun available date. */
      className="mx-auto max-w-72"
      value={value}
      onValueChange={handleChange}
      locale={es}
      placeholder="Seleccionar fecha..."
      color="blue"
      enableClear
      id="calendar"
      disabledDates={disabledDates}
    />
  )
}
