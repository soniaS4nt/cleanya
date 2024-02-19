import React, { ChangeEvent } from 'react'
import { MultiSelect, MultiSelectItem } from '@tremor/react'

type Props = {
  onChange: (selectedValues: string[]) => void
}

export default function MultiSelectComponent({ onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange([e.target.value])
  return (
    <MultiSelect className="mx-auto max-w-md" onChange={handleChange}>
      <MultiSelectItem value="1">Option 1</MultiSelectItem>
      <MultiSelectItem value="2">Option 2</MultiSelectItem>
      <MultiSelectItem value="3">Option 3</MultiSelectItem>
    </MultiSelect>
  )
}
