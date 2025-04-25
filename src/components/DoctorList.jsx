// DoctorList.js
import React from "react";
import DoctorCard from "./DoctorCard";

export default function DoctorList({ doctors }) {
  if (!doctors.length) {
    return (
      <div style={{ background: "#fff", padding: 32, borderRadius: 8 }}>
        No doctors found.
      </div>
    );
  }
  return (
    <div>
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} doctor={doc} />
      ))}
    </div>
  );
}
