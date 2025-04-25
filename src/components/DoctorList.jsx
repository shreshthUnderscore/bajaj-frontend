import React from "react";
import DoctorCard from "./DoctorCard";

function DoctorList({ doctors }) {
  return (
    <div className="doctor-list">
      {doctors.length === 0 ? (
        <div className="no-results">
          <p>No doctors found matching your criteria.</p>
        </div>
      ) : (
        doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
      )}
    </div>
  );
}

export default DoctorList;
