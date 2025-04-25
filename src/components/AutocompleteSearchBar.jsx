import React, { useState, useRef, useEffect } from "react";

export default function AutocompleteSearchBar({
  value,
  suggestions,
  onSelect,
}) {
  const [input, setInput] = useState(value || "");
  const [show, setShow] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  // Filter top 3 suggestions
  const filtered = input
    ? suggestions
        .filter((n) => n.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 3)
    : [];

  // Keep input in sync with value prop
  useEffect(() => setInput(value || ""), [value]);

  // Handle outside click to close suggestions
  const ref = useRef();
  useEffect(() => {
    function handler(e) {
      if (!ref.current?.contains(e.target)) setShow(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleInput(e) {
    setInput(e.target.value);
    setShow(true);
  }
  function handleKeyDown(e) {
    if (!show) return;
    if (e.key === "ArrowDown") {
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (highlight >= 0 && filtered[highlight]) {
        setInput(filtered[highlight]);
        setShow(false);
        onSelect(filtered[highlight]);
      } else {
        setShow(false);
        onSelect(input);
      }
    }
  }
  function handleSuggestionClick(s) {
    setInput(s);
    setShow(false);
    onSelect(s);
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
        position: "relative",
      }}
      ref={ref}
    >
      <input
        data-testid="autocomplete-input"
        type="text"
        value={input}
        onChange={handleInput}
        onFocus={() => setShow(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search Symptoms, Doctors, Specialists, Clinics"
        style={{
          width: "100%",
          padding: "12px 48px 12px 16px",
          fontSize: 16,
          borderRadius: 6,
          border: "none",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: 20,
          top: 12,
          color: "#888",
        }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke="#888" strokeWidth="2" />
          <path
            d="M20 20l-3-3"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {show && filtered.length > 0 && (
        <ul
          style={{
            position: "absolute",
            width: "100%",
            top: 44,
            left: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 4,
            zIndex: 10,
            margin: 0,
            padding: 0,
            listStyle: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        >
          {filtered.map((s, i) => (
            <li
              key={s}
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(s)}
              style={{
                padding: "10px 16px",
                background: highlight === i ? "#f3f6f8" : "#fff",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHighlight(i)}
              onMouseLeave={() => setHighlight(-1)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
