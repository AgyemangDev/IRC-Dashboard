"use client"

import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

// These arrays could be dynamically generated from your CSV data
// For example, you could extract unique values from each column
const roles = ["", "Maintainer", "Subscriber", "Author", "Editor"]
const plans = ["", "Enterprise", "Team", "Company", "Basic"]
const statuses = ["", "Active", "Pending", "Inactive"]

/*
// Example of how to extract unique values from CSV data:
function extractUniqueValues(data, field) {
  // Create a Set to automatically remove duplicates
  const uniqueValues = new Set(data.map(item => item[field]).filter(Boolean))
  // Convert Set back to array and add empty option at the beginning
  return ["", ...Array.from(uniqueValues)]
}

// Then in your component:
// const roles = extractUniqueValues(csvData, 'role')
// const plans = extractUniqueValues(csvData, 'plan')
// const statuses = extractUniqueValues(csvData, 'status')
*/

const SearchFilters = ({ filters, onFilterChange }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <select
            className="w-full appearance-none border border-gray-200 rounded-md p-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.role}
            onChange={(e) => onFilterChange("role", e.target.value)}
          >
            <option value="">Select Role</option>
            {roles.slice(1).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            className="w-full appearance-none border border-gray-200 rounded-md p-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.plan}
            onChange={(e) => onFilterChange("plan", e.target.value)}
          >
            <option value="">Select Plan</option>
            {plans.slice(1).map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            className="w-full appearance-none border border-gray-200 rounded-md p-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="">Select Status</option>
            {statuses.slice(1).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </motion.div>
  )
}

export default SearchFilters

