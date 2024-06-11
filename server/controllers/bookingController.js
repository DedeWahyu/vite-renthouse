const Booking = require("../models/bookings");
const Property = require("../models/properties");
const { validationResult } = require("express-validator");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("property").populate("user");
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

const addBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { property } = req.params;
  const { start_date, duration_in_months, user } = req.body;

  try {
    const findProperty = await Property.findById(property);
    if (!findProperty) {
      return res.status(400).json({ msg: "Properti tidak ditemukan" });
    }

    const newBooking = new Booking({
      property,
      user,
      start_date,
      duration_in_months,
      status: "pending", // Set status to pending
    });

    await newBooking.save();
    res
      .status(201)
      .json({ msg: "Pemesanan berhasil ditambahkan", booking: newBooking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("property").populate("user");
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

module.exports = {
  getAllBookings,
  addBooking,
  getBookingsByUser
};