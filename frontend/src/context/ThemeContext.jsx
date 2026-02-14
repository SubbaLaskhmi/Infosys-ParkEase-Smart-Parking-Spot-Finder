import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check local storage or system preference
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) return savedTheme;
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "dark"; // Default to dark for premium feel
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
