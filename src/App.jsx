import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import AutocompleteSearchBar from "./components/AutocompleteSearchBar";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"; //env file later maybe

const ALL_SPECIALTIES = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Cardiologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian/Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ayurveda",
  "Homeopath",
];

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const mode = searchParams.get("mode") || "";
  const specialties = searchParams.get("specialties")
    ? searchParams.get("specialties").split(",").filter(Boolean)
    : [];
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setDoctors(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  let filteredDoctors = [...doctors];

  if (search) {
    filteredDoctors = filteredDoctors.filter((doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (mode === "Video Consult") {
    filteredDoctors = filteredDoctors.filter(
      (doc) => doc.mode === "Video Consult"
    );
  } else if (mode === "In Clinic") {
    filteredDoctors = filteredDoctors.filter((doc) => doc.mode === "In Clinic");
  }

  if (specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter((doc) =>
      specialties.some((sp) => doc.specialties?.includes(sp))
    );
  }

  if (sort === "fees") {
    filteredDoctors.sort((a, b) => a.fees - b.fees);
  } else if (sort === "experience") {
    filteredDoctors.sort((a, b) => b.experience - a.experience);
  }

  function handleSearch(newSearch) {
    setSearchParams((params) => {
      if (newSearch) params.set("search", newSearch);
      else params.delete("search");
      return params;
    });
  }
  function handleMode(newMode) {
    setSearchParams((params) => {
      if (newMode) params.set("mode", newMode);
      else params.delete("mode");
      return params;
    });
  }
  function handleSpecialties(newSpecs) {
    setSearchParams((params) => {
      if (newSpecs.length) params.set("specialties", newSpecs.join(","));
      else params.delete("specialties");
      return params;
    });
  }
  function handleSort(newSort) {
    setSearchParams((params) => {
      if (newSort) params.set("sort", newSort);
      else params.delete("sort");
      return params;
    });
  }

  // For autocomplete suggestions
  const doctorNames = useMemo(() => doctors.map((d) => d.name), [doctors]);

  return (
    <div style={{ background: "#f3f6f8", minHeight: "100vh" }}>
      <div style={{ background: "#1752a6", padding: 16 }}>
        <AutocompleteSearchBar
          value={search}
          suggestions={doctorNames}
          onSelect={handleSearch}
        />
      </div>
      <div style={{ display: "flex", maxWidth: 1400, margin: "24px auto" }}>
        <FilterPanel
          mode={mode}
          onMode={handleMode}
          specialties={specialties}
          onSpecialties={handleSpecialties}
          sort={sort}
          onSort={handleSort}
          allSpecialties={ALL_SPECIALTIES}
        />
        <div style={{ flex: 1, marginLeft: 24 }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DoctorList doctors={filteredDoctors} />
          )}
        </div>
      </div>
    </div>
  );
}
