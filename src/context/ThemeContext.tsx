"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("dark");
    console.log(theme);
    
    // useEffect(() => {
    //     const storedTheme = localStorage.getItem("Theme") as Theme | null;
    //     if (storedTheme) {
    //         setTheme(storedTheme);
    //     }
    // }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("Theme", newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme} >
            <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-black min-h-screen">
            {children}
            </div>
            </div>

        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
