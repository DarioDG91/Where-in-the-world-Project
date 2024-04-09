import { useState } from "react";

export default function Selection({onRegionValue}) {
  const [selectedOption, setSelectedOption] = useState("");

  function handleChange(event) {
    setSelectedOption(event.target.value);
    onRegionValue(event.target.value)
  }

  return (
    <>
      <div className="custom-select mt-8 sm:mt-0 max-w-48 shadow-lg">
        <label htmlFor="select-filter" className="sr-only">
          Filter by Region
        </label>
        <select name="filter" id="select-filter" value={selectedOption} onChange={handleChange}>
          <option value="" disabled hidden>
            Filter by Region
          </option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
        <svg
          className="custom-arrow w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M112 184l144 144 144-144"
          />
        </svg>
      </div>
    </>
  );
}
