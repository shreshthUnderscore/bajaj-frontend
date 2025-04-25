import React from "react";
import styles from "../styles/DoctorCard.module.css";

export default function DoctorCard({ doctor }) {
  return (
    <div data-testid="doctor-card" className={styles.card}>
      <div className={styles.infoContainer}>
        <img
          src={doctor.photo}
          alt={doctor.name}
          className={styles.doctorImage}
        />
        <div className={styles.doctorInfo}>
          <div data-testid="doctor-name" className={styles.doctorName}>
            {doctor.name}
          </div>
          <div data-testid="doctor-specialty" className={styles.specialty}>
            {doctor.specialities?.map((spec) => spec.name).join(", ")}
          </div>
          <div data-testid="doctor-experience" className={styles.experience}>
            {doctor.experience}
          </div>
          <div data-testid="doctor-clinic-name" className={styles.clinicName}>
            {doctor.clinic?.name}
          </div>
          <div
            data-testid="doctor-clinic-location"
            className={styles.clinicLocation}
          >
            {doctor.clinic?.address?.locality}, {doctor.clinic?.address?.city}
          </div>
          <div className={styles.consultationModes}>
            {doctor.video_consult && (
              <div
                data-testid="doctor-video-consult"
                className={styles.consultMode}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Video Consultation
              </div>
            )}
            {doctor.in_clinic && (
              <div
                data-testid="doctor-in-clinic"
                className={styles.consultMode}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                In-Clinic Consultation
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.feeSection}>
        <div data-testid="doctor-fee" className={styles.fee}>
          {doctor.fees}
        </div>
        <button className={styles.bookButton}>Book Appointment</button>
      </div>
    </div>
  );
}
