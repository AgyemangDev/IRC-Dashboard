"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Eye, MoreVertical } from "lucide-react"

/*
// CSV Data Structure Example:
// Your CSV file should have columns that match the properties used in this component
// Example CSV structure:
// id,name,email,role,plan,billing,status
// 1,John Doe,john@example.com,Maintainer,Enterprise,Auto Debit,Active
// 2,Jane Smith,jane@example.com,Subscriber,Team,Auto Debit,Pending
// ...

// When parsing the CSV, you'll need to transform some fields:
// 1. Add initials based on the name
// 2. Add roleIcon based on the role
// 3. Ensure all required fields are present with defaults
*/

const UserTable = ({ users, isLoading }) => {
  const [selectedUsers, setSelectedUsers] = useState([])

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((user) => user.id))
    }
  }

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Helper function to determine status badge styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="py-20">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
        <p className="text-center mt-4 text-gray-500">Loading users...</p>
      </div>
    )
  }

  // Show empty state
  if (users.length === 0) {
    return (
      <div className="py-20">
        <p className="text-center text-gray-500">No users found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-left">
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length && users.length > 0}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-500">USER</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500">ROLE</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500">PLAN</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500">BILLING</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500">STATUS</th>
            <th className="py-3 px-4 text-left font-medium text-gray-500">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    {/* 
                    // If your CSV has avatar URLs, you could use an image here:
                    // {user.avatar ? (
                    //   <img 
                    //     src={user.avatar || "/placeholder.svg"} 
                    //     alt={user.name} 
                    //     className="h-9 w-9 rounded-full object-cover"
                    //   />
                    // ) : (
                    */}
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                      {user.initials}
                    </div>
                    {/* // )} */}
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{user.roleIcon}</span>
                    <span>{user.role}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{user.plan}</td>
                <td className="py-3 px-4">{user.billing}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <Trash2 className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <Eye className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}

export default UserTable

