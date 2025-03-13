import { useNavigate } from "react-router-dom";
import { Building } from "lucide-react";

const NoData = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full p-8 text-center bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <Building className="h-16 w-16 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-800">No Organization Selected</h2>
          <p className="text-gray-500">Please select an organization from the list to view its details.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoData;
