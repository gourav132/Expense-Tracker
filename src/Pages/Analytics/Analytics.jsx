import React, { useState, useEffect } from "react";
import axios from "axios";
import { InformationCard, Navbar, ExpenseTable } from "../../Components";

export default function Analytics() {
  const [expenses, setExpenses] = useState();
  const [status, setStatus] = useState({
    edit: false,
    delete: false,
  });

  useEffect(() => {
    const getExpenses = async () => {
      try {
        // setLoading(true);
        const response = await axios.get("https://vle-server.onrender.com/");
        setExpenses(response.data);
        // setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = () => {};
  const handleUpdate = () => {};

  const filterTable = async (category) => {
    console.log(category);
    try {
      const response = await axios.get(
        `https://vle-server.onrender.com/retrieve/`,
        {
          params: {
            category: category,
          },
        }
      );
      setExpenses(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative flex h-screen w-full gap-10 justify-center items-center">
      <Navbar />
      <div className="w-10/12 grid grid-cols-4 h-96">
        <InformationCard filterTable={filterTable} />
        <div className="col-span-3">
          {expenses && (
            <ExpenseTable
              expenses={expenses}
              status={status}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
