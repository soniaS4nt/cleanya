import { Schema, Document, model, models } from 'mongoose'
import { HoursDocument } from '@/lib/definitions'

// Define el esquema de Mongoose para las horas disponibles
const hoursSchemaAvailable = new Schema<HoursDocument>({
  date: { type: String, required: true },
  hours: [
    {
      // Define un array de objetos dentro del esquema
      hours: { type: String, required: true },
      available: { type: Boolean, default: true },
    },
  ],
})

// Exporta el modelo de horas disponibles
export default models.hoursavailable ||
  model<HoursDocument>('hoursavailable', hoursSchemaAvailable)
