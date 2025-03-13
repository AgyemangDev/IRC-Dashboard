import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Search, Globe, Grid, Bell } from "lucide-react"
import Sidebar from "./components/Sidebar"
import FullIRCPage from "./pages/FullIRCPage"
import AssociateIRCPage from "./pages/AssociateIRCPage"
import DetailsPage from "./pages/DetailsPage"
import Dashboard from "./pages/Dashboard"


function App() {
  return (
    <Router>
      <div className="h-screen flex">
        {/* Sidebar (Fixed Height) */}
        <Sidebar />

        {/* Main Content (Scrollable) */}
        <main className="flex-1 bg-gray-50 flex flex-col h-screen overflow-hidden">
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
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Globe className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Grid className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-500" />
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/full-irc" element={<FullIRCPage />} />
              <Route path="/associate-irc" element={<AssociateIRCPage />} />
              <Route path="/details" element={<DetailsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}


export default App

