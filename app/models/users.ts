import { Schema, model, models } from 'mongoose'

const User = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export default models.User || model('User', User)
