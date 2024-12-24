import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import { BounceLoader } from "react-spinners";

export default function Login({ setLogin }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://vle-server.onrender.com/login`,
        // `http://localhost:4242/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      reset();
    } catch (error) {
      setError(error.response.data.error);
    }
    setLoading(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl mb-1  dark:text-gray-100 font-Montserrat text-center">
        Access Your Account
      </h1>
      <p className="w-80 md:w-96 mb-6 font-Montserrat text-sx dark:text-gray-400 text-gray-600 text-center">
        Your finances are waiting. Let's make things happen!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
            htmlFor="email"
          >
            Email address
          </label>
          <div className="relative">
            <HiOutlineMail className="absolute top-4 left-2 dark:text-gray-300 text-gray-700" />
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "email address is required",
              })}
              className="mt-1 w-80 md:w-96 rounded-md border  p-2 pl-8 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-zinc-800 dark:bg-zinc-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 block text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="mt-6">
          <label
            className="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute top-4 left-2 dark:text-gray-300 text-gray-700" />
            <input
              type="password"
              id="password"
              {...register("password", { required: "password is required" })}
              className="mt-1 w-80 md:w-96 rounded-md border  p-2 pl-8 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-zinc-800 dark:bg-zinc-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 block text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <p className="text-sx text-center mt-4 text-red-500">{error}</p>

        <div className="mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-purple-600 p-2 font-semibold text-white rounded"
          >
            {loading ? <BounceLoader color="#ffffff" size={15} /> : "Login"}
          </motion.button>
        </div>
      </form>

      <h1 className="dark:text-gray-400 text-gray-600 text-center mt-5 font-semibold">
        Don't have an account{" "}
        <button
          onClick={() => setLogin(false)}
          className="dark:text-gray-200 text-gray-900"
        >
          Register here
        </button>
      </h1>
    </motion.div>
  );
}
