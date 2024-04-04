import { IAppointment } from '@/lib/definitions'
import { Schema, model, models } from 'mongoose'

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
    state: {
      type: String,
      enum: ['pending', 'reserved', 'canceled', 'completed'], // Enumera los posibles estados
      default: 'pending', // Valor predeterminado del estado
    },
  },
  { timestamps: true }
)

// 3. Create a Model.
export default models.Appointment ||
  model<IAppointment>('Appointment', AppointmentSchema)
