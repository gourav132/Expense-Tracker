import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { MdAdd } from "react-icons/md";
import { FiFile } from "react-icons/fi";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="absolute top-6 md:w-10/12 w-11/12 flex items-center justify-between">
      <h1 className="dark:text-purple-100 hidden md:block text-purple-800 text-xl font-semibold font-Montserrat">
        Vijay Lakshmi Enterprises
      </h1>
      <h1 className="dark:text-purple-100 block md:hidden text-purple-800 font-semibold font-Montserrat">
        VL Enterprises
      </h1>
      <div className="flex gap-8">
        {location.pathname === "/Exp" ? (
          <button
            onClick={() => navigate("/")}
            className="dark:text-black text-black p-2 rounded text-sm dark:bg-purple-200 bg-purple-200 hover:ring-2"
          >
            <MdAdd />
          </button>
        ) : (
          <button
            onClick={() => navigate("/Exp")}
            className="dark:text-black text-black p-2 rounded text-sm dark:bg-purple-200 bg-purple-200 hover:ring-2"
          >
            <FiFile />
          </button>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
}
