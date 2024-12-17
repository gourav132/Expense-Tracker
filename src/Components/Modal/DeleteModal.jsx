import React from "react";
import { BounceLoader } from "react-spinners";

export default function DeleteModal({
  setToggleModal,
  toggleModal,
  handleModal,
  handleDelete,
  deleteId,
  setDeleteId,
  status,
}) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-full bg-black/80 flex justify-center items-center ${
        toggleModal ? "" : "hidden"
      }`}
      onClick={handleModal}
    >
      <div
        className="dark:bg-black bg-black/20 text-white w-96 h-42 p-4 rounded-xl border-2 border-red-400 flex flex-col items-center shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-semibold mb-2">Delete record?</h1>
        <h1 className="font-semibold tracking-tighter mb-6">
          Are you sure you want to delete this record?
        </h1>
        <div className="flex gap-4 justify-end">
          <button
            className="px-2 py-1 rounded bg-gray-500 text-sm font-semibold"
            onClick={handleModal}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete(deleteId).then(() => {
                setDeleteId(null);
                setToggleModal(!toggleModal);
              });
            }}
            className="py-1 rounded-sm bg-red-400 hover:bg-red-500 transition-colors text-sm font-semibold w-16 flex justify-center items-center"
          >
            {status.delete ? (
              <BounceLoader color="#ffffff" size={15} />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
