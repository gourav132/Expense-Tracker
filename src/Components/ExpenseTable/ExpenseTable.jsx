import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import TableRows from "./TableRows";
import CategoryFilter from "../Filters/CategoryFilter";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";

export default function ExpenseTable({
  expenses,
  setExpenses,
  status,
  handleDelete,
  handleUpdate,
}) {
  const [toggleModal, setToggleModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editedExpenses, setEditedExpenses] = useState({});
  const [filter, setFilter] = useState({
    category: false,
  });

  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const [date, setDate] = useState();

  // Sync editedExpenses with the latest expenses prop
  useEffect(() => {
    setEditedExpenses(
      expenses.reduce((acc, expense) => {
        acc[expense.id] = { ...expense };
        return acc;
      }, {})
    );
  }, [expenses]);

  const handleModal = (id) => {
    setToggleModal(!toggleModal);
    setDeleteId(id);
  };

  const handleInputChange = (id, field, value) => {
    setEditedExpenses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = (id) => {
    setEditingRow(id);
    const updatedExpense = editedExpenses[id];
    handleUpdate(id, updatedExpense).then(() => setEditingRow(null));
  };

  const filterTable = async (category, start, end) => {
    try {
      const response = await axios.get(
        `https://vle-server.onrender.com/retrieve/`,
        {
          params: {
            category: category,
            startDate: start,
            endDate: end,
          },
        }
      );
      setExpenses(response.data);
      setFilter({ ...filter, category: false });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    filterTable(filters.category, filters.startDate, filters.endDate);
  }, [filters]);

  return (
    <div>
      <div
        className={`absolute top-0 left-0 h-screen w-full bg-black/80 flex justify-center items-center ${
          toggleModal ? "" : "hidden"
        }`}
        onClick={handleModal}
      >
        <div
          className="dark:bg-black bg-black/20 text-white w-96 h-42 p-4 rounded-xl border-2 border-red-400 flex flex-col items-center shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-xl font-semibold mb-2">Delete record?</h1>
          <h1 className="font-semibold tracking-tighter mb-6">
            Are you sure you want to delete this record?
          </h1>
          <div className="flex gap-4 justify-end">
            <button
              className="px-2 py-1 rounded bg-gray-500 text-sm font-semibold"
              onClick={handleModal}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(deleteId).then(() => {
                  setDeleteId(null);
                  setToggleModal(!toggleModal);
                });
              }}
              className="py-1 rounded-sm bg-red-400 hover:bg-red-500 transition-colors text-sm font-semibold w-16 flex justify-center items-center"
            >
              {status.delete ? (
                <BounceLoader color="#ffffff" size={15} />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-scroll no-scrollbar rounded-xl">
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-200 font-Montserrat transition-colors">
            <tr>
              <th className="px-6 py-3 flex w-full justify-between items-center gap-8">
                <div className="">
                  <Datepicker
                    value={date}
                    onChange={(newValue) => {
                      setFilters({
                        ...filters,
                        startDate: newValue.startDate,
                        endDate: newValue.endDate,
                      });
                      setDate(newValue);
                    }}
                    useRange={false}
                    showShortcuts={true}
                    toggleClassName="hidden"
                    containerClassName=""
                    inputClassName="bg-transparent outline-none dark:placeholder-gray-200 dark:text-gray-200 text-gray-700 placeholder-gray-700"
                    placeholder="DATE"
                    separator="- To -"
                  />
                </div>
              </th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 flex w-full justify-between items-center relative">
                <span>CATEGORY</span>

                <div>
                  <button
                    onClick={() =>
                      setFilter({ ...filter, category: !filter.category })
                    }
                    className="rounded p-2 hover:bg-gray-400 transition-all"
                  >
                    <FiFilter />
                  </button>
                  <AnimatePresence>
                    {filter.category && (
                      <CategoryFilter
                        filters={filters}
                        setFilters={setFilters}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <motion.tbody layout className="font-Montserrat font-semibold">
            {Object.values(editedExpenses).map((expense) => (
              <TableRows
                key={expense.id}
                expense={expense}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                editingRow={editingRow}
                handleModal={handleModal}
              />
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
