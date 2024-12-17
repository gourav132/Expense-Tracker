import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Datepicker from "react-tailwindcss-datepicker";

export default function InformationCard({ filterTable }) {
  const [categoryExp, setCategoryExp] = useState();
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });

  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get("https://vle-server.onrender.com/categoryExpense")
        .then((res) => {
          setCategoryExp(res.data);
        });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    filterTable(filters.category, filters.startDate, filters.endDate);
  }, [filters]);

  return (
    <div>
      {loading ? (
        <div className="hidden md:block absolute bottom-10 w-full left-0">
          render(
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          )
        </div>
      ) : (
        ""
      )}
      <div>
        <h1 className="font-semibold font-Montserrat mb-2 text-gray-600 dark:text-gray-300 transition-colors">
          Date
        </h1>
        <Datepicker
          popoverDirection="down"
          toggleClassName="hidden"
          useRange={false}
          value={dateFilter}
          onChange={(newValue) => {
            setDateFilter(newValue);
            setFilters({
              ...filters,
              startDate: newValue.startDate,
              endDate: newValue.endDate,
            });
          }}
          primaryColor={"purple"}
          showShortcuts={true}
          inputClassName="py-2 w-full rounded dark:bg-zinc-900 bg-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-500 transition-colors dark:text-gray-300 text-sm text-left pl-4"
          containerClassName="w-72 mb-10"
          separator="-To-"
        />
        <h1 className="font-semibold font-Montserrat mb-2 text-gray-600 dark:text-gray-300 transition-colors">
          Category
        </h1>
        {categoryExp && (
          <div className="hidden md:block w-full">
            <div className="flex flex-col gap-2 font-Montserrat">
              <button
                className="py-2 rounded dark:bg-zinc-900 bg-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-500 transition-colors w-72"
                onClick={() => {
                  setFilters({ ...filters, category: "" });
                }}
              >
                <h1 className="dark:text-gray-300 text-sm transition-colors text-left pl-4 ">
                  all-records
                </h1>
              </button>
              {categoryExp.map((category) => (
                <button
                  key={category.category}
                  className="py-2 rounded dark:bg-zinc-900 bg-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-500 transition-colors w-72"
                  onClick={() => {
                    setFilters({ ...filters, category: category.category });
                  }}
                >
                  <h1 className="dark:text-gray-300 text-sm transition-colors text-left pl-4 ">
                    {category.category}
                  </h1>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
