import { Schema, Document, model, models } from 'mongoose'

export type hoursDocument = Document

const hoursSchemaAvailable = new Schema({
  date: { type: String, require: true },
  hours: { type: Array, require: true },
})

export default models.hoursAvailable ||
  model('hoursAvailable', hoursSchemaAvailable)
