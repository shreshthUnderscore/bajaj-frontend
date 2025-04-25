import React from "react";
import DoctorCard from "./DoctorCard";
import styles from "../styles/DoctorList.module.css";

export default function DoctorList({ doctors }) {
  if (!doctors.length) {
    return (
      <div className={styles.noResults}>
        No doctors found matching your criteria
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
