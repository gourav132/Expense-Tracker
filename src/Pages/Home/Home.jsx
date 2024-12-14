import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Modal } from "../../Components";
import axios from "axios";
import { MdCurrencyRupee } from "react-icons/md";

export default function Home() {
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleToasts = () => {
    toast.success("Success");
  };

  const onSubmit = (data) => {
    setFormData(data);
    handleModal();
  };

  const recordExpense = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://vle-server.onrender.com/recordExpense",
        {
          date: formData.Date,
          category: formData.Category,
          amount: formData.Amount,
          description: formData.Description,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        reset();
        handleModal();
        handleToasts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setValue("Date", currentDate);
  }, [setValue]);

  return (
    <div className="relative flex h-screen w-full md:items-center justify-center pt-36 md:pt-0">
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <h1 className="text-2xl font-semibold leading-9 text-center dark:text-white text-black font-Montserrat transition-colors">
          Expense journal
        </h1>
        <p className="text-sm font-medium text-gray-400 mt-1 text-center font-Montserrat">
          Keep track of all the expenses in a{" "}
          <span className="block md:inline">seamless manner</span>
        </p>

        <div className="mt-10">
          <label
            className="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
            htmlFor="category"
          >
            Category
          </label>
          <select
            {...register("Category", { required: "Category is required" })}
            className="mt-1 w-80 md:w-96 rounded-md border  p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-gray-800 dark:bg-gray-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
            id="category"
          >
            <option value="">Select a category</option>
            <option value="transportation">Transportation</option>
            <option value="personal-transportation">
              Personal Transportation
            </option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          {errors.Category && (
            <span className="text-red-500 block text-xs mt-1">
              {errors.Category.message}
            </span>
          )}
        </div>

        <div className="mt-3">
          <label
            className="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("Description", {
              required: "Description is required",
            })}
            className="mt-1 w-80 md:w-96 rounded-md border  p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-gray-800 dark:bg-gray-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
            rows="4"
            id="description"
          />
          {errors.Description && (
            <span className="text-red-500 block text-xs mt-1">
              {errors.Description.message}
            </span>
          )}
        </div>

        <div className="mt-2">
          <label
            className="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
            htmlFor="amt"
          >
            Amount
          </label>
          <div className="relative">
            <MdCurrencyRupee className="absolute top-4 left-2 dark:text-gray-300 text-gray-700" />
            <input
              type="number"
              id="amt"
              {...register("Amount", { required: "Amount is required" })}
              className="mt-1 w-80 md:w-96 rounded-md border  p-2 pl-8 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-gray-800 dark:bg-gray-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
            />
          </div>
          {errors.Amount && (
            <span className="text-red-500 block text-xs mt-1">
              {errors.Amount.message}
            </span>
          )}
        </div>

        <input type="hidden" {...register("Date")} />

        <button
          type="submit"
          className="mt-4 w-full rounded-md dark:bg-purple-400 bg-purple-500 py-2 text-sm font-semibold text-white transition-colors dark:hover:bg-purple-600 hover:bg-purple-600 duration-300"
        >
          SUBMIT
        </button>
      </form>
      {toggleModal && (
        <Modal
          handleModal={handleModal}
          formData={formData}
          loading={loading}
          recordExpense={recordExpense}
        />
      )}
      <ToastContainer
        position="top-center"
        theme={localStorage.getItem("theme")}
      />
    </div>
  );
}
