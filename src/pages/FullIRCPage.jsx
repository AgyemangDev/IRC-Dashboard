"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import Papa from "papaparse"
import IRCTable from "../components/UserTable"

const FullIRCPage = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch("/full-irc-data.csv")
        const text = await response.text()

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data)
            setFilteredData(result.data)
            setIsLoading(false)
          },
        })
      } catch (error) {
        console.error("Error fetching CSV:", error)
        setIsLoading(false)
      }
    }

    fetchCSV()
  }, [])

  // Apply search filter
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = data.filter((item) => {
      // Search in all fields
      return Object.values(item).some((value) => value && value.toString().toLowerCase().includes(term))
    })

    setFilteredData(filtered)
  }, [data, searchTerm])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Full IRC Members</h1>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <select className="border border-gray-200 rounded-md p-2">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-3 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Entry</span>
            </motion.button>
          </div>
        </div>

        <IRCTable data={filteredData} isLoading={isLoading} />

        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            Showing 1 to {filteredData.length} of {data.length} entries
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">1</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100">2</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100">3</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100">4</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100">5</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FullIRCPage
