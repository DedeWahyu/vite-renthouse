const Booking = require("../models/bookings");
const Property = require("../models/properties");
const Transaction = require("../models/transactions");

// Fungsi untuk mengubah status transaksi, status booking, dan mengurangi stok properti
const createTransaction = async (req, res) => {
  try {
    const { booking, payment_method, kode_bayar } = req.body;

    // Buat transaksi baru
    const newTransaction = new Transaction({
      booking,
      payment_method,
      kode_bayar,
      status: "success",
    });

    await newTransaction.save();

    // Temukan booking terkait dan ubah statusnya
    const relatedBooking = await Booking.findById(booking);
    if (!relatedBooking) {
      return res.status(404).json({ msg: "Booking tidak ditemukan" });
    }
    relatedBooking.status = "success";
    await relatedBooking.save();

    // Temukan properti terkait dan kurangi stoknya
    const relatedProperty = await Property.findById(relatedBooking.property);
    if (!relatedProperty) {
      return res.status(404).json({ msg: "Properti tidak ditemukan" });
    }
    relatedProperty.stocks -= 1;
    await relatedProperty.save();

    res.status(201).json({ msg: "Pembayaran berhasil", transaction: newTransaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

module.exports = {
  createTransaction,
};
