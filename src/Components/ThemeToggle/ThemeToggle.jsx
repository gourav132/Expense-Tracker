import React, { useState, useEffect } from 'react'
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const [ theme, setTheme ] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
          localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      };


  return (
    <div>
    <button className='dark:text-black text-black p-2 rounded text-sm dark:bg-teal-200 bg-teal-200 hover:ring-2' onClick={toggleTheme}>
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
    </div>
  )
}
