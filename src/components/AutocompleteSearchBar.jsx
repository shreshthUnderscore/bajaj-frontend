import React, { useState } from "react";
import styles from "../styles/AutocompleteSearchBar.module.css";

export default function AutocompleteSearchBar({
  value,
  suggestions = [],
  onSelect,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    )
    .slice(0, 3);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    onSelect(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      const selected = filteredSuggestions[highlightedIndex];
      setInputValue(selected);
      setIsOpen(false);
      onSelect(selected);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setIsOpen(false);
    onSelect(suggestion);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search doctors by name"
        className={styles.input}
        data-testid="autocomplete-input"
      />
      <svg
        className={styles.searchIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isOpen && filteredSuggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={
                index === highlightedIndex
                  ? styles.suggestionItemHighlighted
                  : styles.suggestionItem
              }
              data-testid="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
