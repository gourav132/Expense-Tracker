import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { MdAdd } from "react-icons/md";
import { FiFile } from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [cookies, setCookies, removeCookie] = useCookies([]);
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
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => navigate("/Analytics")}
          className="dark:text-black text-black p-2 rounded text-sm dark:bg-purple-200 bg-purple-200 hover:ring-2"
        >
          <IoAnalyticsSharp />
        </motion.button>

        <ThemeToggle />
        {user && (
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="dark:text-black text-black p-2 rounded text-sm dark:bg-red-200 bg-red-200 hover:ring-2"
            onClick={() => {
              setUser(null);
              removeCookie("jwt");
              // logout();
            }}
          >
            <FiLogIn />
          </motion.button>
        )}
      </div>
    </div>
  );
}
