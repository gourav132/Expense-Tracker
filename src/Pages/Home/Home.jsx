import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/ClipLoader";
import { Navbar } from '../../Components';

export default function Home() {

  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const formRef = useRef(null);
  const [ loading, setLoading ] = useState(false);

  const handleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleToasts = () => {
    toast.success("Success");
  }

  const onSubmit = (data) => {
    setFormData(data);
    handleModal();
  };

  const addToGoogleSheet = () => {
    setLoading(true);
    const formData = new FormData(formRef.current);
    fetch(
      process.env.REACT_APP_GOOGLE_SHEET_API,
      {
        method: "POST",
        body: formData
      }
    )
    .then((res) => {
      reset();
      handleModal();
      setLoading(false);
      handleToasts();
      })
      .catch((error) => {
        console.log(error);  // Handling errors
      });  
  }

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setValue('Date', currentDate);
  }, [setValue]);

  return (
    <div className="relative flex h-screen w-full md:items-center justify-center pt-36 md:pt-0">
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <h1 className="text-2xl font-semibold leading-9 tracking-tight text-center dark:text-white text-black">Expense journal</h1>
        <p className="text-sm font-semibold text-gray-400 mt-1 text-center">Keep track of all the expenses in a <span className='block md:inline'>seamless manner</span></p>

        <div className="mt-10">
          <label className="block font-semibold dark:text-gray-300 text-gray-600" htmlFor="category">Category</label>
          <select
            {...register('Category', { required: 'Category is required' })}
            className="mt-1 w-80 md:w-96 rounded-md border  p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-gray-800 dark:bg-gray-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
          >
            <option value="">Select a category</option>
            <option value="transportation">Transportation</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          {errors.Category && <span className="text-red-500 block text-xs mt-1">{errors.Category.message}</span>}
        </div>

        <div className="mt-3">
          <label className="block font-semibold dark:text-gray-300 text-gray-600" htmlFor="description">Description</label>
          <textarea
            {...register('Description', { required: 'Description is required' })}
            className="mt-1 w-80 md:w-96 rounded-md border  p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-gray-800 dark:bg-gray-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
            rows="4"
          />
          {errors.Description && <span className="text-red-500 block text-xs mt-1">{errors.Description.message}</span>}
        </div>

        <div className="mt-2">
          <label className="block font-semibold dark:text-gray-300 text-gray-600" htmlFor="amt">Amount</label>
          <input
            type="number"
            id="amt"
            {...register('Amount', { required: 'Amount is required' })}
            className="mt-1 w-80 md:w-96 rounded-md border  p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0 dark:text-white dark:border-gray-800 dark:bg-gray-900 text-black bg-white text-sm transition-colors ease-in-out duration-300"
          />
          {errors.Amount && <span className="text-red-500 block text-xs mt-1">{errors.Amount.message}</span>}
        </div>

        <input
          type="hidden"
          {...register('Date')}
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-md dark:bg-purple-400 bg-purple-500 py-2 font-semibold text-white transition-colors dark:hover:bg-purple-600 hover:bg-purple-600 duration-300"
        >
          Submit
        </button>
      </form>
      {toggleModal && (
        <div id='backdrop' className="absolute flex h-screen w-full items-center justify-center bg-black/90" onClick={handleModal}> 
          <div id='card' className="rounded-md border-2 dark:bg-black bg-white dark:text-white border-gray-800 px-14 py-10 z-10" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-xl font-bold mb-5">Confirm submission</h1>
            <p><span className="font-semibold">Date:</span> {formData.Date}</p>
            <p><span className="font-semibold">Category: </span> {formData.Category}</p>
            <p><span className="font-semibold">Description: </span> {formData.Description}</p>
            <p><span className="font-semibold">Amount: </span> {formData.Amount}</p>
            <div className="mt-5">
              <button
                className="mr-2 rounded-md bg-red-700 px-4 py-1 font-semibold text-white hover:bg-red-600 transition-colors"
                onClick={handleModal}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-green-700 px-4 py-1 font-semibold text-white hover:bg-green-600 transition-colors"
                onClick={addToGoogleSheet}
              >
                {loading? 
                <BounceLoader
                color="#ffffff"
                // loading= {loading}
                // cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader" 
        /> : "Submit" } 
              </button>
            </div>
          </div>
        </div>
      )}
       <ToastContainer 
        position='top-center'
        theme={localStorage.getItem('theme')}

      />
    </div>
  );
}
