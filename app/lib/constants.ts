import { ColorMap } from './definitions'

export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
export const COLORS: ColorMap = {
  pending: 'yellow',
  reserved: 'green',
  canceled: 'red',
  completed: 'tremor-brand',
}
