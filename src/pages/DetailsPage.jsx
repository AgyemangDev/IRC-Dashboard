"use client"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Edit, Trash2, Building, Calendar, Mail, Phone, MapPin, User, Briefcase } from "lucide-react"

const DetailsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { rowData } = location.state || {} // Extract row data

  // Map of field names to their corresponding icons
  const fieldIcons = {
    name: Building,
    email: Mail,
    phone: Phone,
    address: MapPin,
    contactPerson: User,
    industry: Briefcase,
    founded: Calendar,
  }

  // Function to get a readable label from a camelCase key
  const getReadableLabel = (key) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
  }

  // Function to get the appropriate icon for a field
  const getIcon = (key) => {
    const IconComponent = fieldIcons[key] || Building
    return <IconComponent className="h-5 w-5 text-indigo-600" />
  }

  if (!rowData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full p-8 text-center bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <Building className="h-16 w-16 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800">No Organization Selected</h2>
            <p className="text-gray-500">Please select an organization from the list to view its details.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
          {/* Header Section */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {rowData.name || "Organization Details"}
                  </h1>
                  {rowData.industry && (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {rowData.industry}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200" />

          {/* Data Display Section */}
          <div className="p-6 md:p-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Object.entries(rowData).map(([key, value], index) => (
                <motion.div key={index} variants={itemVariants} className="group">
                  <div className="h-full overflow-hidden transition-all duration-300 hover:shadow-md rounded-xl border border-gray-200 bg-white">
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        {getIcon(key)}
                        <h3 className="text-sm font-medium text-gray-500">{getReadableLabel(key)}</h3>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 break-words">{value || "N/A"}</p>
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DetailsPage

