import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbarpenyewa from "../components/navbarpenyewa";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Asumsi token disimpan di localStorage
          },
        });
        setBookings(response.data);
      } catch (err) {
        setError(
          "Terjadi kesalahan saat mengambil data booking. Silakan coba lagi nanti."
        );
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <Navbarpenyewa />
      <div className="container">
        <h1>Booking Saya</h1>
        {bookings.length === 0 ? (
          <p>Tidak ada booking ditemukan</p>
        ) : (
          <div className="property-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="property-item">
                {booking.property.images &&
                  booking.property.images.length > 0 && (
                    <img
                      src={booking.property.images[0]}
                      alt={booking.property.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                <h3>Properti : {booking.property.title}</h3>
                <p>Deskripsi : {booking.property.description}</p>
                <p>Harga : {booking.property.price}</p>
                <p>
                  Lokasi:{" "}
                  {`${booking.property.location.street}, ${booking.property.location.village}, ${booking.property.location.district}, ${booking.property.location.city}, ${booking.property.location.province}, ${booking.property.location.country}`}
                </p>
                <p>Occupant : {booking.property.occupant}</p>
                <p>Size : {booking.property.details.size}</p>
                <p>Kamar mandi : {booking.property.details.bathrooms}</p>
                <p>Fasilitas :</p>
                <p>
                  {booking.property.details.furnished ? "Isian" : "Kosongan"},{" "}
                  {booking.property.details.wifi ? "WiFi" : "Tidak ada WiFi"},{" "}
                  {booking.property.details.ac ? "AC" : "Tidak ada AC"},{" "}
                  {booking.property.details.kitchen ? "Dapur" : "Tidak ada Dapur"}
                </p>
                <p>Rating : {booking.property.rating}</p>
                <br/>
                <p>Tanggal mulai : {new Date(booking.start_date).toLocaleDateString()}</p>
                <p>Tanggal selesai : {new Date(booking.end_date).toLocaleDateString()}</p>
                <p>Durasi : {booking.duration_in_months} bulan</p>
                <p>Status : {booking.status}</p>
                <p>Total price : {booking.total_price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
