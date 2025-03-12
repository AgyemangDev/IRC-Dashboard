import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import FullICRPage from "./pages/fullICRPage";
import AssociateICRPage from "./pages/AssociateICRPage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<FullICRPage />} />
            <Route path="/full-icr" element={<FullICRPage />} />
            <Route path="/associate-icr" element={<AssociateICRPage />} />
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
