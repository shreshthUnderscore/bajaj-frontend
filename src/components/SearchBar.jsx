import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
