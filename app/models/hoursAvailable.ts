import { Schema, Document, model, models } from 'mongoose'

interface Hour {
  hours: string
  available: boolean
}

interface HoursDocument extends Document {
  date: Date
  hours: Hour[]
}

const hoursSchemaAvailable = new Schema<HoursDocument>({
  date: { type: Date, required: true },
  hours: [
    {
      hours: { type: String, required: true },
      available: { type: Boolean, default: true },
    },
  ],
})

export default models.hoursAvailable ||
  model<HoursDocument>('hoursAvailable', hoursSchemaAvailable)
