import React from "react";
import styles from "../styles/FilterPanel.module.css";

export default function FilterPanel({
  mode,
  onMode,
  specialties,
  onSpecialties,
  sort,
  onSort,
  allSpecialties,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.header} data-testid="filter-header-sort">
          Sort By
        </h3>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="sort"
              checked={sort === "fees"}
              onChange={() => onSort("fees")}
              data-testid="sort-fees"
            />
            Consultation Fee
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="sort"
              checked={sort === "experience"}
              onChange={() => onSort("experience")}
              data-testid="sort-experience"
            />
            Experience
          </label>
        </div>
        <h3 className={styles.header} data-testid="filter-header-speciality">
          Specialties
        </h3>
        <div className={styles.specialitiesContainer}>
          {allSpecialties.map((specialty) => (
            <label key={specialty} className={styles.specialityLabel}>
              <input
                type="checkbox"
                checked={specialties.includes(specialty)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSpecialties([...specialties, specialty]);
                  } else {
                    onSpecialties(specialties.filter((s) => s !== specialty));
                  }
                }}
                data-testid={`filter-specialty-${specialty.replace("/", "-")}`}
              />
              {specialty}
            </label>
          ))}
        </div>
        <h3 className={styles.header} data-testid="filter-header-moc">
          Consultation Mode
        </h3>
        <div className={styles.radioGroup}>
          <label className={styles.modeLabel}>
            <input
              type="radio"
              name="mode"
              checked={mode === "Video Consult"}
              onChange={() => onMode("Video Consult")}
              data-testid="filter-video-consult"
            />
            Video Consultation
          </label>
          <label className={styles.modeLabel}>
            <input
              type="radio"
              name="mode"
              checked={mode === "In Clinic"}
              onChange={() => onMode("In Clinic")}
              data-testid="filter-in-clinic"
            />
            In-Clinic Consultation
          </label>
        </div>
      </div>
    </div>
  );
}
