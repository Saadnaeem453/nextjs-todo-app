"use client"
import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "dark" | "light"

interface ThemeContextType {
    theme: Theme;
    toggleTheme?: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light")

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"))
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("Usetheme must be used in provider")
    }
    return context
}