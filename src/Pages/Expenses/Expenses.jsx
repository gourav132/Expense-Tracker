import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExpenseTable, Navbar } from "../../Components";
import { Puff } from "react-loader-spinner";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Expenses() {
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    edit: false,
    delete: false,
  });

  useEffect(() => {
    const getExpenses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://vle-server.onrender.com/");
        setExpenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    setStatus({ ...status, delete: true });
    try {
      await axios.delete(`https://vle-server.onrender.com/deleteRecord/${id}`);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      setStatus({ ...status, delete: false });
      handleToasts("Record Deleted");
    } catch (error) {
      console.log("Error deleting record - ", error);
    }
  };

  const handleUpdate = async (id, updatedExpense) => {
    // setExpenses((prevExpenses) =>
    //   prevExpenses.map((expense) =>
    //     expense.id === id ? updatedExpense : expense
    //   )
    // );
    setStatus({ ...status, edit: true });
    const response = await axios.put(
      `https://vle-server.onrender.com/editRecord/${id}`,
      {
        date: updatedExpense.date,
        category: updatedExpense.category,
        amount: updatedExpense.amount,
        description: updatedExpense.description,
      }
    );
    if (response.status === 200) {
      setStatus({ ...status, edit: false });
      handleToasts("Record edited");
    }
  };

  const handleToasts = (msg) => {
    toast.success(msg);
  };

  return (
    <div className="relative flex h-screen w-full md:items-center justify-center">
      <Navbar />

      <div className="flex items-center justify-items-center flex-col col-span-3">
        <h1 className="text-xl font-Montserrat font-semibold mb-10 dark:text-gray-200 transition-colors">
          Expenses incurred till now
        </h1>
        {loading && (
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="puff-loading"
          />
        )}
        {!loading && (
          <ExpenseTable
            expenses={expenses}
            status={status}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        theme={localStorage.getItem("theme")}
        transition={Slide}
      />
    </div>
  );
}
