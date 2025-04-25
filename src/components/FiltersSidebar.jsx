import React from "react";

function FiltersSidebar({
  selectedSpecialties,
  setSelectedSpecialties,
  mode,
  setMode,
}) {
  const specialties = ["Neurologist", "Oncologist", "Ayurveda", "Homeopath"];

  const handleSpecialtyChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(
        selectedSpecialties.filter((item) => item !== specialty)
      );
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleClearAll = () => {
    setSelectedSpecialties([]);
    setMode("In-clinic Consultation");
  };

  return (
    <div className="filters-sidebar">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="clear-all" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-title">
          <h4>Specialities</h4>
          <i className="fa fa-chevron-up"></i>
        </div>
        <div className="filter-search">
          <input type="text" placeholder="Search specialities" />
          <i className="fa fa-search"></i>
        </div>
        <div className="filter-options">
          {specialties.map((specialty, index) => (
            <div className="filter-option" key={index}>
              <input
                type="checkbox"
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              <label htmlFor={specialty}>{specialty}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-title">
          <h4>Mode of consultation</h4>
          <i className="fa fa-chevron-up"></i>
        </div>
        <div className="filter-options">
          <div className="filter-option">
            <input
              type="radio"
              id="video"
              name="mode"
              checked={mode === "Video Consultation"}
              onChange={() => setMode("Video Consultation")}
            />
            <label htmlFor="video">Video Consultation</label>
          </div>
          <div className="filter-option">
            <input
              type="radio"
              id="in-clinic"
              name="mode"
              checked={mode === "In-clinic Consultation"}
              onChange={() => setMode("In-clinic Consultation")}
            />
            <label htmlFor="in-clinic">In-clinic Consultation</label>
          </div>
          <div className="filter-option">
            <input
              type="radio"
              id="all"
              name="mode"
              checked={mode === "All"}
              onChange={() => setMode("All")}
            />
            <label htmlFor="all">All</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltersSidebar;
