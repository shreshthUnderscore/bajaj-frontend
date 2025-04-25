// src/components/DoctorCard.js
import React from "react";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <div className="doctor-info">
        <div className="doctor-image">
          <img src={doctor.image} alt={doctor.name} />
        </div>
        <div className="doctor-details">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-specialty">{doctor.specialty}</p>
          <p className="doctor-qualifications">{doctor.qualifications}</p>
          <p className="doctor-experience">{doctor.experience} yrs exp.</p>
          <div className="doctor-location">
            <div className="clinic-info">
              <i className="fa fa-hospital-o"></i>
              <span>{doctor.clinic}</span>
            </div>
            <div className="location-info">
              <i className="fa fa-map-marker"></i>
              <span>{doctor.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="doctor-fee-booking">
        <div className="doctor-fee">
          <span>₹ {doctor.fee}</span>
        </div>
        <button className="book-appointment-btn">Book Appointment</button>
      </div>
    </div>
  );
}

export default DoctorCard;
