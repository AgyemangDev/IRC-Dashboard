"use client";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

const IRCTable = ({ data, isLoading }) => {
  const navigate = useNavigate();

  const displayedColumns =
    data.length > 0
      ? Object.keys(data[0])
      : [
          "Full Name",
          "Acronym",
          "Type",
          "Email",
          "Phone",
        ];

  const truncateText = (text, maxLength = 20) => {
    if (!text) return "-";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div>
        <p className="mt-4 text-gray-500 text-lg">Loading data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-500 text-lg">No records found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white p-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-indigo-600 text-white text-xs uppercase tracking-wider">
            {displayedColumns.map((col, index) => (
              <th key={index} className="py-3 px-4 text-left font-medium">
                {col}
              </th>
            ))}
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
                className="border-b border-gray-200 hover:bg-indigo-100 transition group"
              >
                {displayedColumns.map((col, colIndex) => (
                  <td key={colIndex} className="py-3 px-4 text-gray-700 relative">
                    <span className="block truncate group-hover:hidden">{truncateText(row[col])}</span>
                    <span className="hidden group-hover:block absolute left-0 top-0 bg-white p-2 shadow-md rounded-md w-max text-black">
                      {row[col]}
                    </span>
                  </td>
                ))}
                <td className="py-3 px-4">
                  <button
                    onClick={() => navigate("/details", { state: { rowData: row } })}
                    className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default IRCTable;
