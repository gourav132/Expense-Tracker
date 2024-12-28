import React from "react";
import { motion } from "framer-motion";
import { MdEdit, MdDelete } from "react-icons/md";
import { BounceLoader } from "react-spinners";

export default function TableRows({
  expense,
  handleInputChange,
  handleSave,
  editingRow,
  handleModal,
}) {
  return (
    <motion.tr
      layout
      key={expense.id}
      className="bg-white border-b dark:bg-zinc-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-600  transition-colors"
    >
      <td className="Date">{new Date(expense.date).toLocaleDateString()}</td>
      <td className="Description">
        <input
          name="desc"
          type="text"
          value={expense.description}
          onChange={(e) =>
            handleInputChange(expense.id, "description", e.target.value)
          }
          className="bg-transparent dark:placeholder-gray-200 placeholder-gray-700"
        />
      </td>
      <td className="Category">
        <select
          name="category"
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
          name="num"
          type="number"
          value={expense.amount}
          onChange={(e) =>
            handleInputChange(expense.id, "amount", e.target.value)
          }
          className="bg-transparent dark:placeholder-gray-200 placeholder-gray-700"
        />
      </td>
      <td className="flex space-x-2">
        <motion.button
          // whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => handleSave(expense.id)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors wrap"
        >
          {editingRow === expense.id ? (
            <BounceLoader color="#ffffff" size={14} />
          ) : (
            <MdEdit />
          )}
        </motion.button>
        <button
          onClick={() => handleModal(expense.id)}
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <MdDelete />
        </button>
      </td>
    </motion.tr>
  );
}
