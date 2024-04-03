import { Action, BookingData } from '@/lib/definitions'
import { TextInput } from '@tremor/react'
import React from 'react'
export interface Props {
  dispatch: React.Dispatch<Action>
  bookingData: BookingData
}
export default function PersonalInfo({ dispatch, bookingData }: Props) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value
    let name = event.target.name
    dispatch({
      type: 'CREATE_BOOKING_DATA',
      payload: {
        client: {
          ...bookingData.client,
          [name]: value,
        },
      },
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <TextInput
        type="text"
        placeholder="Juan Perez"
        maxLength={40}
        name="fullName"
        onChange={handleChange}
      />
      <TextInput
        type="email"
        placeholder="juanperez@example.com"
        maxLength={45}
        name="email"
        onChange={handleChange}
      />
    </div>
  )
}
