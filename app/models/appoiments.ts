import { Schema, Document, model, models } from 'mongoose'

const appoimentsHours = new Schema({
  date: { type: String, require: true },
  hours: { type: Array, require: true },
})

export default models.appoiment || model('appoiment', appoimentsHours)
