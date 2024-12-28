import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function CategoryFilter({ filters, setFilters }) {
  const [loading, setLoading] = useState(true);
  const [categoryExp, setCategoryExp] = useState();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get("https://vle-server.onrender.com/categoryExpense", {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        })
        .then((res) => {
          setCategoryExp(res.data);
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full absolute z-10 bg-gray-200 dark:bg-zinc-700 rounded-md top-12 shadow"
    >
      {loading ? (
        <div className="w-full h-24 flex justify-center items-center">
          <PulseLoader size={8} color="gray" loading={loading} />
        </div>
      ) : (
        <div className="w-full p-2 gap-2 flex  flex-col">
          <button
            onClick={() => {
              setFilters({ ...filters, category: "" });
            }}
            className="w-full hover:bg-white hover:dark:bg-zinc-950 py-2 rounded text-left pl-3 transition-all"
          >
            clear filter
          </button>
          {categoryExp.map((category) => (
            <button
              key={category.category}
              onClick={() => {
                setFilters({ ...filters, category: category.category });
              }}
              className="w-full hover:bg-white hover:dark:bg-zinc-950 py-2 rounded text-left pl-3 transition-all"
            >
              {category.category}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
