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

type Props = {
  title?: string
  onValueChange?: (date: DatePickerValue) => void
}
export function DateRangePickerHero({ title }: Props) {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  })

  return (
    <DateRangePicker
      className="mx-auto max-w-md"
      value={value}
      onValueChange={setValue}
      locale={es}
      placeholder=""
      selectPlaceholder="Seleccionar"
      color="rose"
    >
      <DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
        Año transcurrido
      </DateRangePickerItem>
      <DateRangePickerItem
        key="half"
        value="half"
        from={new Date(2023, 0, 1)}
        to={new Date(2023, 5, 31)}
      >
        Primer semestre
      </DateRangePickerItem>
    </DateRangePicker>
  )
}

export function DatePickerHero({ onValueChange }: Props) {
  const [value, setValue] = useState<DatePickerValue>(new Date())

  return (
    <DatePicker
      className="mx-auto max-w-72"
      value={value}
      onValueChange={(selectedDate) => {
        setValue(selectedDate)
        if (onValueChange) {
          onValueChange(selectedDate)
        }
      }}
      locale={es}
      placeholder="Seleccionar"
      color="blue"
    />
  )
}
