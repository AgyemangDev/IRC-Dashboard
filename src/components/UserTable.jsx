"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, ChevronUp, ChevronDown, Search, Loader2, FileX, ArrowUpDown } from "lucide-react"

const IRCTable = ({ data, isLoading }) => {
  const navigate = useNavigate()
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [searchTerm, setSearchTerm] = useState("")

  // Get columns from data or use default columns
  const displayedColumns = useMemo(() => {
    return data.length > 0 ? Object.keys(data[0]) : ["Full Name", "Acronym", "Type", "Email", "Phone"]
  }, [data])

  // Sort and filter data
  const processedData = useMemo(() => {
    let filteredData = [...data]

    // Filter data based on search term
    if (searchTerm.trim() !== "") {
      const lowercasedSearch = searchTerm.toLowerCase()
      filteredData = filteredData.filter((row) =>
        Object.values(row).some((value) => value && value.toString().toLowerCase().includes(lowercasedSearch)),
      )
    }

    // Sort data if sort config is set
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key] || ""
        const bValue = b[sortConfig.key] || ""

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filteredData
  }, [data, sortConfig, searchTerm])

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get sort direction icon
  const getSortDirectionIcon = (column) => {
    if (sortConfig.key !== column) {
      return <ArrowUpDown className="h-4 w-4 opacity-50" />
    }

    return sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  // Truncate text with tooltip
  const truncateText = (text, maxLength = 20) => {
    if (!text) return "-"
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/80 rounded-xl shadow-lg border border-gray-200">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-t-2 border-indigo-200 animate-ping"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading data...</p>
      </div>
    )
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-xl shadow-lg border border-gray-200">
        <FileX className="h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-gray-700 text-lg font-medium">No Records Found</h3>
        <p className="mt-2 text-gray-500">No records match your current criteria.</p>
      </div>
    )
  }

  // Empty search results
  if (processedData.length === 0 && searchTerm) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
              onClick={() => navigate("/add-entry")}
            >
              <span className="text-lg font-bold">+</span>
              <span>Add Entry</span>
            </button>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search records..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
          <div className="text-sm text-gray-500">0 of {data.length} records</div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-xl shadow-lg border border-gray-200">
          <Search className="h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-gray-700 text-lg font-medium">No Matching Records</h3>
          <p className="mt-2 text-gray-500">No records match your search for "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            Clear Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Action Bar: Add Entry, Search, and Results Count */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            onClick={() => navigate("/add-entry")}
          >
            <span className="text-lg font-bold">+</span>
            <span>Add Entry</span>
          </button>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Showing {processedData.length} of {data.length} records
          {searchTerm && ` (filtered)`}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <div className="p-1 min-w-full inline-block align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {displayedColumns.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 transition-colors"
                    onClick={() => requestSort(col)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col}</span>
                      <span>{getSortDirectionIcon(col)}</span>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {processedData.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: rowIndex * 0.03 }}
                    className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition-colors`}
                  >
                    {displayedColumns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3 whitespace-nowrap group relative border-r border-gray-100 last:border-r-0"
                      >
                        <div className="text-sm text-gray-700 font-medium">{truncateText(row[col])}</div>

                        {/* Tooltip on hover if text is truncated */}
                        {row[col] && row[col].toString().length > 20 && (
                          <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded-md py-1 px-2 -mt-1 max-w-xs shadow-lg transform -translate-y-full left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {row[col]}
                          </div>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <button
                        onClick={() => navigate("/details", { state: { rowData: row } })}
                        className="inline-flex items-center justify-center p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default IRCTable

