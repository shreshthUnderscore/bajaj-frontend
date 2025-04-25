// src/App.js
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import FiltersSidebar from "./components/FiltersSidebar";
import SortSection from "./components/SortSection";
import DoctorList from "./components/DoctorList";
import "./App.css";

// Dummy data for doctors
const doctorsData = [
  {
    id: 1,
    name: "Dr. Munaf Inamdar",
    specialty: "General Physician",
    qualifications: "MBBS, MD-General Medicine",
    experience: 27,
    clinic: "Apex Multispeciality and Mater...",
    location: "Kondhawa Khurd",
    fee: 600,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    mode: "In-clinic Consultation",
  },
  {
    id: 2,
    name: "Dr. Subhash Bajaj",
    specialty: "General Physician",
    qualifications: "MBBS, Diploma in Cardiology",
    experience: 11,
    clinic: "Dr. Bajaj Wellness Clinic",
    location: "Wanowarie",
    fee: 600,
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    mode: "In-clinic Consultation",
  },
  {
    id: 3,
    name: "Dr. Mufaddal Zakir",
    specialty: "General Physician",
    qualifications: "MBBS",
    experience: 27,
    clinic: "Sparsh Polyclinic.",
    location: "Wanwadi",
    fee: 600,
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    mode: "In-clinic Consultation",
  },
  {
    id: 4,
    name: "Dr. Ajay Gangoli",
    specialty: "General Physician",
    qualifications: "MBBS",
    experience: 34,
    clinic: "Niramaya Clinic",
    location: "Wanowarie",
    fee: 400,
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    mode: "In-clinic Consultation",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [mode, setMode] = useState("In-clinic Consultation");
  const [sort, setSort] = useState("");

  // Filtering logic
  const filteredDoctors = doctorsData
    .filter((doc) =>
      search
        ? doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((doc) =>
      selectedSpecialties.length > 0
        ? selectedSpecialties.includes(doc.specialty)
        : true
    )
    .filter((doc) => (mode === "All" ? true : doc.mode === mode))
    .sort((a, b) => {
      if (sort === "price") return a.fee - b.fee;
      if (sort === "experience") return b.experience - a.experience;
      return 0;
    });

  return (
    <div className="app-bg">
      <SearchBar onSearch={setSearch} />
      <div className="main-content">
        <div className="sidebar">
          <SortSection sort={sort} setSort={setSort} />
          <FiltersSidebar
            selectedSpecialties={selectedSpecialties}
            setSelectedSpecialties={setSelectedSpecialties}
            mode={mode}
            setMode={setMode}
          />
        </div>
        <div className="doctors-list-section">
          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
}

export default App;
