import { Schema, model, models } from 'mongoose'

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
)

export default models.User || model('User', User)
