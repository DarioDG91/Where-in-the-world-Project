import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = useState(prefersLight);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", !isDarkTheme);
  }, [isDarkTheme]);

  function handleToggleTheme() {
    setIsDarkTheme((prevTheme) => !prevTheme);
  }

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <header id="header" className=" py-6 px-4 sm:py-6 sm:px-20 shadow-lg">
        <button
          onClick={handleScrollToTop}
          className=" text-base sm:text-2xl font-semibold sm:font-bold cursor-pointer"
        >
          <h1>Where in the world?</h1>
        </button>
        <div
          onClick={handleToggleTheme}
          id="toggle-theme"
          className=" flex gap-3 items-center"
        >
          <svg
            className=" w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
              fill="var(--element-color)"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
          <p className=" text-xs sm:text-base">Dark Mode</p>
        </div>
      </header>
    </>
  );
}
