import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Register({ setLogin }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // animate={{ opacity: 1, transition: { duration: 0.6 } }}
      // exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <h1 className="text-2xl mb-1 font-normal dark:text-gray-100 font-Montserrat text-center">
        Welcome Aboard
      </h1>
      <p className="w-80 md:w-96 mb-6 font-normal font-Montserrat text-sx dark:text-gray-400 text-center text-gray-600">
        Start tracking every penny. Your smarter{" "}
        <span className="text-purple-700 dark:text-purple-400">
          financial journey
        </span>{" "}
        begins here!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-80 md:w-96 gap-4">
          <div>
            <label
              className="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
              htmlFor="fname"
            >
              First Name
            </label>
            <div className="relative">
              <FiUser className="absolute top-4 left-2 dark:text-gray-300 text-gray-700" />
              <input
                type="fname"
                id="fname"
                {...register("fname", {
                  required: "First name is required",
                })}
                className="mt-1 rounded-md border w-full p-2 pl-8 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-zinc-800 dark:bg-zinc-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
              />
            </div>
            {errors.fname && (
              <span className="text-red-500 block text-xs mt-1">
                {errors.fname.message}
              </span>
            )}
          </div>
          <div>
            <label
              className="block dark:text-gray-100 text-sm font-medium leading-6 text-gray-900"
              htmlFor="lname"
            >
              Last Name
            </label>
            <div className="relative">
              <FiUser className="absolute top-4 left-2 dark:text-gray-300 text-gray-700" />
              <input
                type="lname"
                id="lname"
                {...register("lname", {
                  required: "Last name is required",
                })}
                className="mt-1 rounded-md border w-full p-2 pl-8 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-zinc-800 dark:bg-zinc-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
              />
            </div>
            {errors.lname && (
              <span className="text-red-500 block text-xs mt-1">
                {errors.lname.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6">
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

        <div className="mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-purple-600 p-2 font-semibold text-white rounded"
          >
            Register
          </motion.button>
        </div>
      </form>

      <h1 className="dark:text-gray-400 text-gray-600 text-center mt-5 font-semibold">
        Already have an account?{" "}
        <button
          onClick={() => setLogin(true)}
          className="dark:text-gray-200 text-gray-900"
        >
          Sign in
        </button>
      </h1>
    </motion.div>
  );
}
