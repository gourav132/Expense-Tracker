import React from "react";
import BounceLoader from "react-spinners/ClipLoader";

export default function Modal({
  handleModal,
  formData,
  loading,
  recordExpense,
}) {
  return (
    <div>
      <div
        id="backdrop"
        className="absolute flex h-screen w-full items-center top-0 left-0 justify-center bg-black/90"
        onClick={handleModal}
      >
        <div
          id="card"
          className="rounded-xl border-2 dark:bg-black bg-white/90 dark:text-white border-gray-800 pl-16 pr-16 pt-10 pb-10 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-xl mb-5 font-Montserrat text-gray-700 dark:text-gray-200">
            Confirm submission
          </h1>
          <p>
            <span className="font-semibold">Date:</span> {formData.Date}
          </p>
          <p>
            <span className="font-semibold">Category: </span>{" "}
            {formData.Category}
          </p>
          <p>
            <span className="font-semibold">Description: </span>{" "}
            {formData.Description}
          </p>
          <p>
            <span className="font-semibold">Amount: </span> {formData.Amount}
          </p>
          <div className="mt-5">
            <button
              className="rounded-md bg-purple-700 px-4 py-1 font-bold text-white hover:bg-purple-600 transition-colors text-sm w-full"
              onClick={recordExpense}
            >
              {loading ? (
                <BounceLoader
                  color="#ffffff"
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
