import { Schema, model, models } from 'mongoose'
import { IClient } from '@/lib/definitions'

// Define el esquema para el cliente
const ClientSchema = new Schema<IClient>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    appointments: [
      { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
    ], // Referencia a citas (appointments)
  },
  { timestamps: true }
)

// Crea y exporta el modelo de cliente
export default models.Client || model<IClient>('Client', ClientSchema)
