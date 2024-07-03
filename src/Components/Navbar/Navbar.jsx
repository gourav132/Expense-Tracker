import React from 'react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Navbar() {
  return (
    <div className="absolute top-6 md:w-10/12 w-11/12 flex items-center justify-between">
        <h1 className="dark:text-purple-100 hidden md:block text-purple-800 text-xl font-semibold">Vijay Lakshmi Enterprises</h1>
        <h1 className="dark:text-purple-100 block md:hidden text-purple-800 font-semibold">VL Enterprises</h1>
        <ThemeToggle />
    </div>
  )
}
