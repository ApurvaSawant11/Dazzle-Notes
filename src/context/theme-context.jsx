import { createContext, useState, useContext, useEffect } from "react";
import {} from "react/cjs/react.development";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("Dazzle notes theme")
  );

  const changeTheme = () => {
    setTheme((theme) => (theme === "night" ? "light" : "night"));
  };

  useEffect(() => {
    theme === "light"
      ? localStorage.removeItem("Dazzle notes theme")
      : localStorage.setItem("Dazzle notes theme", "night");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
