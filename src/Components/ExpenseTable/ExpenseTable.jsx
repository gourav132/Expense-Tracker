import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function ExpenseTable({ expenses, handleDelete }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const handleModal = () => {
    setToggleModal(!toggleModal);
    // handleDelete(id);
    // setToggleModal(false);
  };
  return (
    <div>
      {toggleModal && (
        <div
          className="absolute top-0 left-0 h-screen w-full bg-black/80 flex justify-center items-center"
          onClick={handleModal}
        >
          <div
            className="dark:bg-black bg-black/70 text-white w-96 h-42 p-4 rounded-xl border-2 border-red-400 flex flex-col items-center shadow"
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
              <button className="px-2 py-1 rounded bg-red-400 hover:bg-red-500 transition-colors text-sm font-semibold">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-h-96 overflow-y-scroll no-scrollbar rounded-xl">
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-200 font-Montserrat transition-colors">
            <tr>
              {/* <th className="px-6 py-3">ID</th> */}
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="font-semibold font-Montserrat">
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600 transition-colors"
              >
                {/* <td className="">{expense.id}</td> */}
                <td className="">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="">{expense.description}</td>
                <td className="">{expense.category}</td>
                <td className="">{expense.amount}</td>
                <td className="flex space-x-2">
                  <button
                    // onClick={() => onEdit(expense)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleModal(expense.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
