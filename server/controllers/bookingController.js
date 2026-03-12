import mongoose from 'mongoose'
import Booking from '../models/Booking.js'
import Property from '../models/Property.js'
import Agency from '../models/Agency.js'

//Internal helper
const checkAvailability = async ({ checkInDate, checkOutDate, property }) => {
  try {
    const bookings = await Booking.find({
      property, checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate }
    })
    const isAvailable = bookings.length === 0
    return isAvailable
  } catch (error) {
    console.log(error.message)
  }
}

//to check property availability [POST '/check-availability']
export const checkBookingAvailability = async (req, res) => {
  try {
    const { property, checkInDate, checkOutDate } = req.body
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, property })

    res.json({ success: true, isAvailable })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//create a new Booking [POST '/book]
export const bookingCreate = async (req, res) => {
  try {
    const { property, checkInDate, checkOutDate, guests } = req.body
    const user = req.user._id

    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, property })
    if (!isAvailable) {
      return res.json({ success: false, message: "Property is not available" })
    }

    //Get TotalPrice from property
    const propertyData = await Property.findById(property).populate('agency')
    let totalPrice = propertyData.price.rent

    //calculate total price based on nights
    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const timeDiff = checkOut.getTime() - checkIn.getTime()
    const nights = Math.cell(timeDiff / (1000 * 3600 * 24))

    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      property,
      agency: propertyData.agency._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });
    res.json({ success: true, message: "booking created" });
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: "failed to create booking" });
  }
};

//Get Bookings of Current User [GET /user]
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id
    const bookings = await Booking.find({ user }).populate('property agency').sort({ createdAt: -1 })
    res.json({ success: true, bookings })
  } catch (error) {
    res.json({ success: false, message: "failed to get booking" });
  }
}

//Get Bookimngs for Agency [Get '/Agency]
export const getAgencyBookings = async (req, res) => {
  try {
    const user = req.user._id
    const agency = await Agency.findOne({ owner: req.auth.userId })
    if (!agency) {
      return res.json({ success: false, message: "no agency found" })
    }

    const bookings = await Booking.find({ agency: agency._id }).populate("property agency user").sort({ createdAt: -1 })

    const totalBookings = bookings.length
    const totalRevenue = bookings.reduce((acc, b) => acc + (b.isPaid ? b.totalPrice : 0), 0)

    res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
  } catch (error) {
    res.json({ success: false, message: "failed to get agency Booking" });
  }
}