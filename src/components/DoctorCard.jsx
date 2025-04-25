// DoctorCard.js
import React from "react";

export default function DoctorCard({ doctor }) {
  console.log(doctor.specialties);
  return (
    <div
      data-testid="doctor-card"
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: 24,
        marginBottom: 24,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: 18 }}>
        <img
          src={doctor.photo}
          alt={doctor.name}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <div
            data-testid="doctor-name"
            style={{ fontWeight: 600, fontSize: 18, marginBottom: 2 }}
          >
            {doctor.name}
          </div>
          <div
            data-testid="doctor-specialty"
            style={{ color: "#444", marginBottom: 2 }}
          >
            {doctor.specialties}
          </div>
          <div
            data-testid="doctor-experience"
            style={{ color: "#666", fontSize: 15 }}
          >
            {doctor.experience} yrs exp.
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          data-testid="doctor-fee"
          style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}
        >
          ₹ {doctor.fees}
        </div>
        <button
          style={{
            border: "1.5px solid #1752a6",
            color: "#1752a6",
            background: "#fff",
            padding: "10px 28px",
            borderRadius: 4,
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
