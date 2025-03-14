import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Users } from "lucide-react"

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload; 

    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium text-gray-900">{dataItem.name}</p>
        <p style={{ color: dataItem.color }}>{`Count: ${dataItem.count}`}</p>
        <p style={{ color: dataItem.color }}>{`Percentage: ${dataItem.value.toFixed(0)}%`}</p>
      </div>
    );
  }
  return null;
};

const MembershipPieChart = ({ data, isLoading, title = "Membership Categories" }) => {

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
        <Users className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MembershipPieChart

