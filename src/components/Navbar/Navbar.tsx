"use client"
import { useTheme } from "@/context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`${theme} w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md`}>
            <div className="container mx-auto flex justify-between items-center p-6">
                <div className="text-white text-2xl font-bold">Next Todo
                    <button
                        className="text-white flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
                        onClick={toggleTheme}
                    >
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
        </nav>
    );
}
