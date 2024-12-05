import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExpenseTable, Navbar } from "../../Components";
import { Puff } from "react-loader-spinner";

export default function Expenses() {
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(true);

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
    try {
      axios.delete(`http://localhost:4242/deleteRecord/${id}`);
      console.log("Record deleted successfully");
    } catch (error) {
      console.log("Error deleting record - ", error);
    }
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
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {!loading && (
          <ExpenseTable expenses={expenses} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
