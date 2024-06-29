import React from 'react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Navbar() {
  return (
    <div className="absolute top-6 md:w-10/12 w-11/12 flex items-center justify-between">
        <h1 className="dark:text-white hidden md:block text-black font-bold">Vijay Lakshmi Enterprises</h1>
        <h1 className="dark:text-white block md:hidden text-black font-bold">VL Enterprises</h1>
        <ThemeToggle />
    </div>
  )
}
