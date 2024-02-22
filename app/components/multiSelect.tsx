import { MultiSelect, MultiSelectItem } from '@tremor/react'

export type Option = {
  hours: string
}

type Props = {
  value?: string[]
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
      name="multiSelect"
    >
      {options && options.length > 0 ? (
        options.map((hours, index) => (
          <MultiSelectItem key={hours.hours} value={hours.hours}>
            {hours.hours}
          </MultiSelectItem>
        ))
      ) : (
        <div className="p-2 text-center" key="no-data">
          No hay horas disponibles
        </div>
      )}
    </MultiSelect>
  )
}
