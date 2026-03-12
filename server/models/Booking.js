import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  user: { type: String, required: true },
  property: { type: String, required: true },
  agency: { type: String, required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  totalPrice: { type: String, required: true },
  guests: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, required: true, default: 'Pay at Check-in' },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
