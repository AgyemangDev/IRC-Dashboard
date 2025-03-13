"use client";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {}; // Extract row data

  if (!rowData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">No data available. Please select a record from the list.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-6"
    >
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 max-w-4xl w-full border border-gray-200">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} className="p-3 rounded-full hover:bg-gray-200 transition">
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-3xl font-semibold text-gray-800">Organization Details</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-5 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition">
              <Edit className="h-5 w-5" />
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-2 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
              <Trash2 className="h-5 w-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Data Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(rowData).map(([key, value], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-sm font-medium text-gray-500 uppercase">{key}</h3>
              <p className="text-lg font-semibold text-gray-900">{value || "N/A"}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsPage;
