import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../../Components";
import withAuth from "../../hoc/withAuth";
import { useAuth } from "../../context/AuthContext";
import { FiPlus, FiTrash, FiTrash2 } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

function Analytics() {
  const { user } = useAuth();
  return (
    <div className="relative flex h-screen w-full gap-10 justify-center items-center">
      <Navbar />

      {/* <div className="dark:bg-zinc-800 dark:text-gray-100 bg-gray-200 h-96 w-96 rounded-xl"> */}
      <div className="dark:text-gray-100 w-96 rounded-xl">
        <h1 className="text-lg font-Montserrat">Manage caterogies</h1>
        <div className="relative w-full flex justify-between mt-4 gap-4 items-center">
          <BiCategory className="absolute top-4 left-2 dark:text-gray-300 text-gray-700" />
          <input
            type="text"
            className="mt-1 w-full rounded-md border p-2 pl-8 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-zinc-800 dark:bg-zinc-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
            placeholder="add new category"
          />
          <button className="p-2.5 dark:bg-zinc-800 bg-black rounded-full text-white">
            <FiPlus />
          </button>
        </div>

        <div className="w-full mt-4">
          <div className="w-full flex justify-between border dark:border-zinc-800 dark:bg-zinc-900 px-2 py-2 rounded-md transition-all">
            <h1>Commercial Transportation</h1>
            <button className="text-red-400">
              <FiTrash2 />
            </button>
          </div>
          <div className="w-full flex justify-between border dark:border-zinc-800 dark:bg-zinc-900 px-2 py-2 rounded-md transition-all mt-2">
            <h1>Personal Transportation</h1>
            <button className="text-red-400">
              <FiTrash2 />
            </button>
          </div>
          <div className="w-full flex justify-between border dark:border-zinc-800 dark:bg-zinc-900 px-2 py-2 rounded-md transition-all mt-2">
            <h1>Transportation</h1>
            <button className="text-red-400">
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const AuthAnalytics = withAuth(Analytics);

export default AuthAnalytics;
