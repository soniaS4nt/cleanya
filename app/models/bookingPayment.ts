import { Schema, model, models } from 'mongoose'

const BookingPayment = new Schema({
  id: { type: Number },
  amount: { type: Number },
  message: { type: String },
})

export default models.BookingPayment || model('BookingPayment', BookingPayment)
