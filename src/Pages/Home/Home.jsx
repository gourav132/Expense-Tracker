import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const formRef = useRef(null);

  const handleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleToasts = () => {
    toast.success("Success");
  }

  const onSubmit = (data) => {
    setFormData(data);
    handleModal();
    console.log(process.env.REACT_APP_google_script_api);
  };

  const addToGoogleSheet = () => {
    const formData = new FormData(formRef.current);
    console.log(Object.fromEntries(formData));
    fetch(
      // "https://script.google.com/macros/s/AKfycbzpcfTyltwwl2Amzmc76_c8QacUNrx-NacJxq4rGZf03BmOJjOdPJUlX8UgHhoxeCut/exec",
      process.env.REACT_APP_GOOGLE_SHEET_API,
      {
        method: "POST",
        body: formData
      }
    )
      .then((res) => {
        reset();
        handleModal();
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
    <div className="relative flex h-screen w-full items-center justify-center bg-black">
      <div className="absolute left-3 md:left-6 top-3">
        <h1 className="text-white">Vijay Lakshmi Enterprises</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <h1 className="text-2xl font-bold text-white">Expense journal</h1>
        <p className="text-sm font-semibold text-gray-500">Keep track of all the expenses in a <span className='block md:inline'>seamless manner</span></p>

        <div className="mt-10">
          <label className="block font-semibold text-gray-300" htmlFor="category">Category</label>
          <select
            {...register('Category', { required: 'Category is required' })}
            className="mt-1 w-80 md:w-96 rounded-md border-2 text-white border-gray-800 bg-gray-900 p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0"
          >
            <option value="">Select a category</option>
            <option value="transportation">Transportation</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          {errors.Category && <span className="text-red-500 block text-xs mt-1">{errors.Category.message}</span>}
        </div>

        <div className="mt-3">
          <label className="block font-semibold text-gray-300" htmlFor="description">Description</label>
          <textarea
            {...register('Description', { required: 'Description is required' })}
            className="mt-1 w-80 md:w-96 rounded-md border-2 text-white border-gray-800 bg-gray-900 p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0"
            rows="4"
          />
          {errors.Description && <span className="text-red-500 block text-xs mt-1">{errors.Description.message}</span>}
        </div>

        <div className="mt-2">
          <label className="block text-gray-300" htmlFor="amt">Amount</label>
          <input
            type="number"
            id="amt"
            {...register('Amount', { required: 'Amount is required' })}
            className="mt-1 w-80 md:w-96 rounded-md border-2 text-white border-gray-800 bg-gray-900 p-2 outline-blue-400 hover:ring-2 hover:ring-blue-300 focus:ring-0"
          />
          {errors.Amount && <span className="text-red-500 block text-xs mt-1">{errors.Amount.message}</span>}
        </div>

        <input
          type="hidden"
          {...register('Date')}
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-700 py-2 font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
      {toggleModal && (
        <div id='backdrop' className="absolute flex h-screen w-full items-center justify-center bg-black/90" onClick={handleModal}> 
          <div id='card' className="rounded-md border-2 bg-black text-white border-gray-800 px-14 py-10 z-10" onClick={(e) => e.stopPropagation()}>
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
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
       <ToastContainer 
        position='top-center'
        theme='dark'

      />
    </div>
  );
}
