import { useContext, useState } from "react";
import { PrimeReactContext } from "primereact/api";
import { AppConstants } from "../../data/AppConstants";

const ThemeToggle = () => {
  const { changeTheme } = useContext(PrimeReactContext)!;
  const [theme, setTheme] = useState(AppConstants.primeReactDarkModeTheme);
  const isLight = theme === AppConstants.primeReactLightModeTheme;
  const toggle = () => {
    const nextTheme =
      theme === AppConstants.primeReactDarkModeTheme
        ? AppConstants.primeReactLightModeTheme
        : AppConstants.primeReactDarkModeTheme;
    document.documentElement.classList.add("dark");
    if (isLight) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    if (changeTheme)
      changeTheme(theme, nextTheme, "theme-link", () => {
        setTheme(nextTheme);
      });
  };

  return (
    <button onClick={toggle} className="bg-red-400  dark:bg-blue-900">
      Switch to{" "}
      { isLight ? "Light" : "Dark"}
    </button>
  );
};
export default ThemeToggle;
