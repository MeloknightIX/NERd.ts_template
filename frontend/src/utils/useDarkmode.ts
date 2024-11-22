import { useCallback, useEffect, useState } from "react";

const useDarkmode = () => {
  const updateTheme = (theme: "light" | "dark") => {
    document.body.setAttribute("data-theme", theme);
  };

  const [isDarkmode, setIsDarkmode] = useState<boolean>(
    () => document.body.getAttribute("data-theme") === "dark"
  );

  const toggleDarkmode = useCallback(() => {
    setIsDarkmode((p) => {
      const isNewDarkmode = !p;
      updateTheme(isNewDarkmode ? "dark" : "light");
      return isNewDarkmode;
    });
  }, []);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = prefersDarkMode ? "dark" : "light";
    setIsDarkmode(prefersDarkMode);
    updateTheme(initialTheme);
  }, []);

  return { isDarkmode, toggleDarkmode };
};
export default useDarkmode;
