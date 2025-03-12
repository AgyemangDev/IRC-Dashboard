"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"

const DetailsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { rowData } = location.state || {} // Extract row data

  if (!rowData) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">No data available. Please select a record from the list.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold">Organization Details</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(rowData).map(([key, value], index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{key}</h3>
            <p className="text-lg">{value || "N/A"}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default DetailsPage

