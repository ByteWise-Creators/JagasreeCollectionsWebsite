import { useEffect, useState } from "react";

/**
 * Custom hook to check the mediaquery matches
 * @param {string} query - The media query string.
 * @returns {boolean} - wether the mediaquery matches or not
 */

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (e) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;