import React from "react";

export default function FilterPanel({
  mode,
  onMode,
  specialties,
  onSpecialties,
  sort,
  onSort,
  allSpecialties,
}) {
  // Specialties with data-testid mapping
  const specialtyTestIds = {
    "General Physician": "filter-specialty-General-Physician",
    Dentist: "filter-specialty-Dentist",
    Dermatologist: "filter-specialty-Dermatologist",
    Paediatrician: "filter-specialty-Paediatrician",
    Gynaecologist: "filter-specialty-Gynaecologist",
    ENT: "filter-specialty-ENT",
    Diabetologist: "filter-specialty-Diabetologist",
    Cardiologist: "filter-specialty-Cardiologist",
    Physiotherapist: "filter-specialty-Physiotherapist",
    Endocrinologist: "filter-specialty-Endocrinologist",
    Orthopaedic: "filter-specialty-Orthopaedic",
    Ophthalmologist: "filter-specialty-Ophthalmologist",
    Gastroenterologist: "filter-specialty-Gastroenterologist",
    Pulmonologist: "filter-specialty-Pulmonologist",
    Psychiatrist: "filter-specialty-Psychiatrist",
    Urologist: "filter-specialty-Urologist",
    "Dietitian/Nutritionist": "filter-specialty-Dietitian-Nutritionist",
    Psychologist: "filter-specialty-Psychologist",
    Sexologist: "filter-specialty-Sexologist",
    Nephrologist: "filter-specialty-Nephrologist",
    Neurologist: "filter-specialty-Neurologist",
    Oncologist: "filter-specialty-Oncologist",
    Ayurveda: "filter-specialty-Ayurveda",
    Homeopath: "filter-specialty-Homeopath",
  };

  function handleSpecialtyChange(s) {
    if (specialties.includes(s)) {
      onSpecialties(specialties.filter((x) => x !== s));
    } else {
      onSpecialties([...specialties, s]);
    }
  }

  return (
    <div style={{ width: 320, minWidth: 220 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 20,
          marginBottom: 20,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{ fontWeight: 600, marginBottom: 12 }}
          data-testid="filter-header-sort"
        >
          Sort by
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6 }}>
            <input
              data-testid="sort-fees"
              type="radio"
              checked={sort === "fees"}
              onChange={() => onSort("fees")}
              name="sort"
            />{" "}
            Price: Low-High
          </label>
          <label style={{ display: "block" }}>
            <input
              data-testid="sort-experience"
              type="radio"
              checked={sort === "experience"}
              onChange={() => onSort("experience")}
              name="sort"
            />{" "}
            Experience - Most Experience first
          </label>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 20,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{ fontWeight: 600, marginBottom: 12 }}
          data-testid="filter-header-speciality"
        >
          Specialities
        </div>
        <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 18 }}>
          {allSpecialties.map((s) => (
            <label
              key={s}
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 400,
                fontSize: 15,
              }}
            >
              <input
                type="checkbox"
                data-testid={specialtyTestIds[s]}
                checked={specialties.includes(s)}
                onChange={() => handleSpecialtyChange(s)}
              />{" "}
              {s}
            </label>
          ))}
        </div>
        <div
          style={{ fontWeight: 600, marginBottom: 12 }}
          data-testid="filter-header-moc"
        >
          Mode of consultation
        </div>
        <label style={{ display: "block", marginBottom: 6 }}>
          <input
            data-testid="filter-video-consult"
            type="radio"
            checked={mode === "Video Consult"}
            onChange={() => onMode("Video Consult")}
            name="mode"
          />{" "}
          Video Consult
        </label>
        <label style={{ display: "block", marginBottom: 6 }}>
          <input
            data-testid="filter-in-clinic"
            type="radio"
            checked={mode === "In Clinic"}
            onChange={() => onMode("In Clinic")}
            name="mode"
          />{" "}
          In Clinic
        </label>
      </div>
    </div>
  );
}
