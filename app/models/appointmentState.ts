import { Schema, model, models } from 'mongoose'

const AppointmentstateSchema = new Schema({
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  previousState: {
    type: String,
    enum: ['pending', 'reserved', 'canceled', 'completed'],
  },
  newState: {
    type: String,
    enum: ['pending', 'reserved', 'canceled', 'completed'],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
})

export default models?.Appointmentstate ||
  model('Appointmentstate', AppointmentstateSchema)
