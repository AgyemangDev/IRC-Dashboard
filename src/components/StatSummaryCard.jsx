import { ArrowUpRight } from "lucide-react"

const StatsSummaryCard = ({ title, value, icon: Icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
      </div>
      <div
        className={`flex items-center mt-3 text-sm ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}
      >
        <ArrowUpRight className={`h-4 w-4 mr-1 ${changeType === "negative" ? "rotate-180" : ""}`} />
        <span>{change} from last month</span>
      </div>
    </div>
  )
}

export default StatsSummaryCard

