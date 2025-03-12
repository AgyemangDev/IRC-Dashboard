"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Globe, Grid, Bell } from "lucide-react"
import Sidebar from "./components/Sidebar"
import UserTable from "./components/UserTable"
import SearchFilters from "./components/SearchFilter"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filters, setFilters] = useState({
    role: "",
    plan: "",
    status: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchDummyUsers = async () => {
      setIsLoading(true)
      try {
        // Dummy user data
        let data = [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Maintainer", roleIcon: "🔧", plan: "Enterprise", billing: "Auto Debit", status: "Active", initials: "JD" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Subscriber", roleIcon: "📝", plan: "Team", billing: "Auto Debit", status: "Pending", initials: "JS" },
          { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Author", roleIcon: "✍️", plan: "Company", billing: "Auto Debit", status: "Inactive", initials: "AJ" },
          { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Editor", roleIcon: "✏️", plan: "Basic", billing: "Auto Debit", status: "Active", initials: "BB" },
        ]

        setUsers(data)
        setFilteredUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDummyUsers()
  }, [])

  useEffect(() => {
    let result = [...users]
    if (filters.role) result = result.filter((user) => user.role === filters.role)
    if (filters.plan) result = result.filter((user) => user.plan === filters.plan)
    if (filters.status) result = result.filter((user) => user.status === filters.status)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter((user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term))
    }
    setFilteredUsers(result)
  }, [users, filters, searchTerm])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search [CTRL + K]"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100"><Globe className="h-5 w-5 text-gray-500" /></button>
            <button className="p-2 rounded-full hover:bg-gray-100"><Grid className="h-5 w-5 text-gray-500" /></button>
            <button className="p-2 rounded-full hover:bg-gray-100"><Bell className="h-5 w-5 text-gray-500" /></button>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">JD</div>
          </div>
        </header>

        <div className="p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow-sm p-6">
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <select className="border border-gray-200 rounded-md p-2">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  <Plus className="h-4 w-4" />
                  <span>Add New User</span>
                </motion.button>
              </div>
              <UserTable users={filteredUsers} isLoading={isLoading} />
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>Showing 1 to {filteredUsers.length} of {users.length} entries</div>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-md hover:bg-gray-100">2</button>
                  <button className="px-3 py-1 rounded-md hover:bg-gray-100">3</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default App
