export default function Searchbar({ onCountryName }) {
  function handleChange(event) {
    onCountryName(event.target.value);
  }

  return (
    <>
      <div className=" shadow-lg">
        <label htmlFor="searchbar" className=" sr-only">
          {" "}
          Search for a country
        </label>
        <div
          id="searchbar-container"
          className=" flex items-center gap-4 px-4 py-2 rounded-sm"
        >
          <svg
            className=" w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M338.29 338.29L448 448"
            />
          </svg>{" "}
          <input
            onChange={handleChange}
            className=" w-full outline-none"
            id="searchbar"
            placeholder="Search for a country..."
          ></input>
        </div>
      </div>
    </>
  );
}
