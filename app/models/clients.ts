import { Schema, model, models } from 'mongoose'
import { ObjectId } from 'mongodb'

// Define la interfaz para un cliente
export interface IClient {
  fullName: string
  email: string
  appointments: ObjectId[] // Array de ObjectIds de citas
}

// Define el esquema para el cliente
const ClientSchema = new Schema<IClient>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }], // Referencia a citas (appointments)
  },
  { timestamps: true }
)

// Crea y exporta el modelo de cliente
export default models.Client || model<IClient>('Client', ClientSchema)
