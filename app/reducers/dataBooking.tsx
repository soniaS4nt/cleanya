import { initialState } from '@/contexts/bookingsContext'
import { Action, BookingData } from '@/lib/definitions'

// Reducer para manejar las acciones sobre la información de reserva
export const reducer = (state: BookingData, action: Action): BookingData => {
  switch (action.type) {
    case 'CREATE_BOOKING_DATA':
      return {
        ...state,
        ...action.payload,
      }
    case 'CLEAN_BOOKING_DATA':
      return initialState // Restablece los datos al estado inicial
    case 'CALCULATE_TOTAL_PAYMENT':
      let total = 0
      for (const key in state.requirements) {
        if (state.requirements.hasOwnProperty(key) && state.requirements[key]) {
          total += state.requirements[key]?.price || 0
        }
      }
      return {
        ...state,
        pago: total,
      }
    default:
      return state
  }
}
