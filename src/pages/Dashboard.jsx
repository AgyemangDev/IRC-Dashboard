"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Building, UserCheck, UserMinus, Globe } from "lucide-react"

// Import chart components
import MembershipPieChart from "../components/charts/membership-Pie-Chart"
import OrganizationTypeChart from "../components/charts/organization-type-chart"
import LocationMap from "../components/charts/location-map"
import RegistrationTrendChart from "../components/charts/registration-trend-chart"
import StatsSummaryCard from "../components/StatSummaryCard"
import { fetchDashboardData } from "../api/dashboardData"





const Dashboard = ({ initialData = null, fetchData = null }) => {

  const summaryStats = [
    { title: "Total Organizations", value: 145, icon: Building, change: "+12%", changeType: "positive" },
    { title: "Active Members", value: 94, icon: UserCheck, change: "+8%", changeType: "positive" },
    { title: "Pending Approvals", value: 17, icon: UserMinus, change: "-5%", changeType: "negative" },
    { title: "Countries Represented", value: 12, icon: Globe, change: "+2", changeType: "positive" },
  ]
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(!initialData)

  useEffect(() => {
    if (initialData) {
      setData(initialData)
      setIsLoading(false)
      return
    }

    const loadData = async () => {
      setIsLoading(true)
      try {
        if (fetchData) {
          const result = await fetchData()
          setData(result)
        } else {
          const result = await fetchDashboardData()
          setData(result)
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [initialData, fetchData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div>
        <p className="ml-4 text-gray-600 font-medium">Loading dashboard data...</p>
      </div>
    )
  }

  const { membershipData, orgTypeData, monthlyData, locationData } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4 md:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Organization Dashboard</h1>
          <p className="text-gray-600">Overview of organization statistics and metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryStats.map((stat, index) => (
  <StatsSummaryCard
    key={index}
    title={stat.title}
    value={stat.value}
    icon={
      stat.icon === "Building"
        ? Building
        : stat.icon === "UserCheck"
        ? UserCheck
        : stat.icon === "UserMinus"
        ? UserMinus
        : Globe
    }
    change={stat.change}
    changeType={stat.changeType}
  />
))}

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MembershipPieChart data={membershipData} title="Membership Categories" />
          <OrganizationTypeChart data={orgTypeData} title="Organization Types" />
          <LocationMap data={locationData} title="Organizations by Location" />
          <RegistrationTrendChart data={monthlyData} title="Monthly Registration Trend" />
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
