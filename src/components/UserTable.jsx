import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const IRCTable = ({ data, isLoading }) => {
  const navigate = useNavigate();

  const displayedColumns = [
    "Full Name of Legal Entity",
    "Acronym of Organisation",
    "Type of Organisation",
    "Email of Focal Person (Enter Email)",
    "Telephone Number of Organisation",
  ];

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
        <p className="text-center mt-4 text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-20">
        <p className="text-center text-gray-500">
          No records found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 bg-white shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white border-b border-gray-200">
            {displayedColumns.map((col, index) => (
              <th key={index} className="py-3 px-4 text-left font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate("/details", { state: { rowData: row } })}
              >
                {displayedColumns.map((col, colIndex) => (
                  <td key={colIndex} className="py-3 px-4">{row[col] || "-"}</td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default IRCTable;
