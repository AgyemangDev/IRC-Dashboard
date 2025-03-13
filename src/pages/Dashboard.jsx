"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Building, UserCheck, UserMinus, Globe } from "lucide-react"
import { StatData } from "../api/StatsData"

// Import chart components
import MembershipPieChart from "../components/charts/membership-Pie-Chart"
import OrganizationTypeChart from "../components/charts/organization-type-chart"
import LocationMap from "../components/charts/location-map"
import RegistrationTrendChart from "../components/charts/registration-trend-chart"
import StatsSummaryCard from "../components/StatSummaryCard"
import { fetchDashboardData } from "../api/dashboardData"

const Dashboard = ({ initialData = null, fetchData = null }) => {

  const [summaryStats, setSummaryStats] = useState([])
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(!initialData)

  useEffect(() => {
    const fetchData = async () => {
        const data = await StatData();
        console.data
        // Convert the object into an array of objects with necessary properties
        const formattedData = [
            { title: "Total Organizations", value: data.uniqueOrganizations, icon: "Building" },
            { title: "Full IRC Accounts", value: data.fullCount, icon: "UserCheck" },
            { title: "Associated IRC Accounts", value: data.associateCount, icon: "UserCheck" },
            { title: "Countries Represented", value: data.uniqueCountries, icon: "Globe" },
        ];
        
        setSummaryStats(formattedData);
        setData(prevData => ({
          ...prevData,
          membershipData: data.membershipData,
          orgTypeData: data.orgTypeData,
      }));
    };
    fetchData();
}, []);

  

  useEffect(() => {
    if (initialData) {
      setData(initialData)
      setIsLoading(false)
      return
    }

    const StatData = async () => {
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

    StatData()
  }, [initialData, fetchData])


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div>
        <p className="ml-4 text-gray-600 font-medium">Loading dashboard data...</p>
      </div>
    )
  }

  const {orgTypeData, monthlyData, locationData } = data
  
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
  />
))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MembershipPieChart data={data.membershipData} title="Membership Categories" />
          <OrganizationTypeChart data={orgTypeData} title="Organization Types" />
          <LocationMap data={locationData} title="Organizations by Location" />
          <RegistrationTrendChart data={monthlyData} title="Monthly Registration Trend" />
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
