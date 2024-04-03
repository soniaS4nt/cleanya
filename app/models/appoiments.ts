import { Schema, model, models } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IAppointment {
  fechaHora: {
    fecha: Date
    hora: string[]
  }
  pago: number
  detalles: {
    frecuencia: { id: number; value: string }
    direccion: {
      region: string
      comuna: string
      calle: string
      numero: string
      adicionales: string
    }
    instrucciones: { id: number; value: string }
  }
  requirements: {
    rooms: { id: number; value: string; price: number }
    bathrooms: { id: number; value: string; price: number }
    tipo: { id: number; value: string; price: number }
  }
}

// 2. Create a Schema corresponding to the document interface.
const AppointmentSchema = new Schema<IAppointment>(
  {
    fechaHora: {
      fecha: { type: Date, required: true },
      hora: [{ type: String, required: true }],
    },
    pago: { type: Number },
    detalles: {
      frecuencia: {
        id: { type: Number },
        value: { type: String, required: true },
      },
      direccion: {
        region: { type: String, required: true },
        comuna: { type: String, required: true },
        calle: { type: String, required: true },
        numero: { type: String, required: true },
        adicionales: { type: String },
      },
      instrucciones: {
        id: { type: Number },
        value: { type: String, required: true },
      },
    },
    requirements: {
      rooms: {
        id: { type: Number },
        value: { type: String, required: true },
        price: { type: Number },
      },
      bathrooms: {
        id: { type: Number },
        value: { type: String, required: true },
        price: { type: Number },
      },
      tipo: {
        id: { type: Number },
        value: { type: String, required: true },
        price: { type: Number },
      },
    },
  },
  { timestamps: true }
)

// 3. Create a Model.
export default models.Appointment ||
  model<IAppointment>('Appointment', AppointmentSchema)
