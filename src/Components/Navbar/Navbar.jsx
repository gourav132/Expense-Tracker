import React, { useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { MdAdd } from "react-icons/md";
import { FiFile } from "react-icons/fi";
// import { IoAnalyticsSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCookies } from "react-cookie";
import { useAuth } from "../../context/AuthContext";

import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [cookies, setCookies, removeCookie] = useCookies([]);
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="absolute top-6 md:w-10/12 w-11/12 flex items-center justify-between">
      <h1 className="dark:text-purple-100 hidden md:block text-purple-800 text-xl font-semibold font-Montserrat">
        Expense Journal
      </h1>
      <h1 className="dark:text-purple-100 block md:hidden text-purple-800 font-semibold font-Montserrat">
        Exp Journal
      </h1>
      <div className="flex gap-8">
        {user && (
          <>
            {location.pathname === "/Exp" ? (
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => navigate("/")}
                className="dark:text-black text-black p-2 rounded text-sm dark:bg-purple-200 bg-purple-200 hover:ring-2"
              >
                <MdAdd />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => navigate("/Exp")}
                className="dark:text-black text-black p-2 hidden md:block rounded text-sm dark:bg-purple-200 bg-purple-200 hover:ring-2"
              >
                <FiFile />
              </motion.button>
            )}
          </>
        )}
        {/* <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => navigate("/Analytics")}
          className="dark:text-black text-black p-2 rounded text-sm dark:bg-purple-200 bg-purple-200 hover:ring-2"
        > 
          <IoAnalyticsSharp />
        </motion.button> */}

        <ThemeToggle />
        {user && (
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="dark:text-black text-black p-2 rounded text-sm dark:bg-purple-200 bg-purple-200 hover:ring-2"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <CiMenuKebab />
            </motion.button>
            <AnimatePresence>
              {toggleMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute w-52 pb-4 pt-4 px-2 dark:bg-zinc-800 bg-gray-100 top-12 right-0 rounded-md dark:text-gray-200"
                >
                  <ul>
                    <li
                      onClick={() => navigate("/Analytics")}
                      className="flex items-center gap-2 px-2 py-2 text-sm mb-2 dark:hover:bg-black hover:bg-gray-200 rounded-md transition-colors"
                    >
                      <CgProfile />
                      Profile settings
                    </li>
                    <li
                      onClick={() => {
                        setUser(null);
                        removeCookie("jwt");
                        // logout();
                      }}
                      className="flex items-center gap-2 px-2 py-2 text-sm dark:hover:bg-black hover:bg-red-200 rounded-md transition-colors"
                    >
                      <RiLogoutCircleRLine />
                      Logout session
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
