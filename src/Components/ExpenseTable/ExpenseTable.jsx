import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BounceLoader } from "react-spinners";

export default function ExpenseTable({
  expenses,
  status,
  handleDelete,
  handleUpdate,
}) {
  const [toggleModal, setToggleModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editedExpenses, setEditedExpenses] = useState({});

  // Sync editedExpenses with the latest expenses prop
  useEffect(() => {
    setEditedExpenses(
      expenses.reduce((acc, expense) => {
        acc[expense.id] = { ...expense };
        return acc;
      }, {})
    );
  }, [expenses]);

  const handleModal = (id) => {
    setToggleModal(!toggleModal);
    setDeleteId(id);
  };

  const handleInputChange = (id, field, value) => {
    setEditedExpenses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = (id) => {
    setEditingRow(id);
    const updatedExpense = editedExpenses[id];
    handleUpdate(id, updatedExpense).then(() => setEditingRow(null));
  };

  return (
    <div>
      {toggleModal && (
        <div
          className="absolute top-0 left-0 h-screen w-full bg-black/80 flex justify-center items-center"
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
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="font-semibold font-Montserrat">
            {Object.values(editedExpenses).map((expense) => (
              <tr
                key={expense.id}
                className="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600  transition-colors"
              >
                <td className="Date">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="Description">
                  <input
                    type="text"
                    value={expense.description}
                    onChange={(e) =>
                      handleInputChange(
                        expense.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="bg-transparent dark:placeholder-gray-200 placeholder-gray-700"
                  />
                </td>
                <td className="Category">
                  <select
                    value={expense.category}
                    onChange={(e) =>
                      handleInputChange(expense.id, "category", e.target.value)
                    }
                    className="bg-transparent"
                  >
                    <option value="transportation">Transportation</option>
                    <option value="personal-transportation">
                      Personal Transportation
                    </option>
                    <option value="miscellaneous">Miscellaneous</option>
                  </select>
                </td>
                <td className="Amount">
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) =>
                      handleInputChange(expense.id, "amount", e.target.value)
                    }
                    className="bg-transparent dark:placeholder-gray-200 placeholder-gray-700"
                  />
                </td>
                <td className="flex space-x-2">
                  <button
                    onClick={() => handleSave(expense.id)}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors wrap"
                  >
                    {editingRow === expense.id ? (
                      <BounceLoader color="#ffffff" size={15} />
                    ) : (
                      <MdEdit />
                    )}
                  </button>
                  <button
                    onClick={() => handleModal(expense.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
