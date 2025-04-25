import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import AutocompleteSearchBar from "./components/AutocompleteSearchBar";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";
import styles from "./styles/App.module.css";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

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
  const specialties = useMemo(
    () =>
      searchParams.get("specialties")
        ? searchParams.get("specialties").split(",").filter(Boolean)
        : [],
    [searchParams]
  );
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

  const getFeeValue = (feeString) => {
    const match = feeString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const getExperienceValue = (expString) => {
    const match = expString.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const filteredDoctors = useMemo(() => {
    let filtered = [...doctors];

    if (search) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (mode) {
      filtered = filtered.filter((doc) => {
        if (mode === "Video Consult") {
          return doc.video_consult;
        } else if (mode === "In Clinic") {
          return doc.in_clinic;
        }
        return true;
      });
    }

    if (specialties.length > 0) {
      filtered = filtered.filter((doc) =>
        specialties.some((sp) =>
          doc.specialities?.some(
            (docSp) => docSp.name.toLowerCase() === sp.toLowerCase()
          )
        )
      );
    }

    if (sort === "fees") {
      filtered = [...filtered].sort(
        (a, b) => getFeeValue(a.fees) - getFeeValue(b.fees)
      );
    } else if (sort === "experience") {
      filtered = [...filtered].sort(
        (a, b) =>
          getExperienceValue(b.experience) - getExperienceValue(a.experience)
      );
    }

    return filtered;
  }, [doctors, search, mode, specialties, sort]);

  const handleSearch = (newSearch) => {
    setSearchParams((params) => {
      if (newSearch) params.set("search", newSearch);
      else params.delete("search");
      return params;
    });
  };

  const handleMode = (newMode) => {
    setSearchParams((params) => {
      if (newMode) params.set("mode", newMode);
      else params.delete("mode");
      return params;
    });
  };

  const handleSpecialties = (newSpecs) => {
    setSearchParams((params) => {
      if (newSpecs.length) params.set("specialties", newSpecs.join(","));
      else params.delete("specialties");
      return params;
    });
  };

  const handleSort = (newSort) => {
    setSearchParams((params) => {
      if (newSort) params.set("sort", newSort);
      else params.delete("sort");
      return params;
    });
  };

  const doctorNames = useMemo(() => doctors.map((d) => d.name), [doctors]);

  return (
    <div className={styles.container}>
      <div className={styles.searchHeader}>
        <AutocompleteSearchBar
          value={search}
          suggestions={doctorNames}
          onSelect={handleSearch}
        />
      </div>
      <div className={styles.mainContent}>
        <FilterPanel
          mode={mode}
          onMode={handleMode}
          specialties={specialties}
          onSpecialties={handleSpecialties}
          sort={sort}
          onSort={handleSort}
          allSpecialties={ALL_SPECIALTIES}
        />
        <div className={styles.doctorsSection}>
          {loading ? (
            <div className={styles.loadingState}>Loading...</div>
          ) : (
            <DoctorList doctors={filteredDoctors} />
          )}
        </div>
      </div>
    </div>
  );
}
