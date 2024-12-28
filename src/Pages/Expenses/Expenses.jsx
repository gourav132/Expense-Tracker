import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExpenseTable, Navbar } from "../../Components";
import { Puff } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useAuth } from "../../context/AuthContext";

export default function Expenses() {
  const [cookies] = useCookies([]);
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    edit: false,
    delete: false,
  });
  const navigate = useNavigate();
  const { user, setUser, authLoading } = useAuth();

  useEffect(() => {
    if (!user) navigate("/Auth");
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      const getExpenses = async () => {
        try {
          setLoading(true);
          const response = await axios.get("https://vle-server.onrender.com/", {
            // const response = await axios.get("http://localhost:4242/", {
            headers: {
              Authorization: `bearer ${user.token}`,
            },
          });
          setExpenses(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error.response.data.error);
        }
      };
      getExpenses();
    }
  }, [authLoading]);

  const handleDelete = async (id) => {
    setStatus({ ...status, delete: true });
    try {
      await axios.delete(`https://vle-server.onrender.com/deleteRecord/${id}`, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      });
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
      },
      {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
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
    <div className="relative flex h-screen w-full items-center justify-center">
      <Navbar />

      <div className="flex items-center justify-items-center flex-col">
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
            setExpenses={setExpenses}
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
