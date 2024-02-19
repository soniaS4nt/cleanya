import React, { ChangeEvent } from 'react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'

type Option = {
  time: string
}

type Props = {
  value: string[]
  onValueChange: (value: string[]) => void
  options: Option[] // Especificar el tipo de options como un array de objetos Option
}

export default function MultiSelectComponent({
  value,
  onValueChange,
  options,
}: Props) {
  const handleChange = (newValue: string[]) => {
    onValueChange(newValue) // Pasar el nuevo valor al prop onValueChange
  }

  return (
    <MultiSelect
      className="mx-auto max-w-md"
      onValueChange={handleChange}
      value={value}
    >
      {options.map((hours, index) => (
        <MultiSelectItem key={index} value={hours.time}>
          {hours.time}
        </MultiSelectItem>
      ))}
    </MultiSelect>
  )
}
