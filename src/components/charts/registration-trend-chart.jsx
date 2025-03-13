import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

// Custom tooltip for the line chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium text-gray-900">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color || entry.stroke }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const RegistrationTrendChart = ({ data, isLoading, title = "Monthly Registration Trend" }) => {
  if (!data || isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-indigo-600 border-opacity-50"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="registrations"
              name="New Registrations"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4, fill: "#4f46e5" }}
              activeDot={{ r: 6, fill: "#4f46e5" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RegistrationTrendChart

