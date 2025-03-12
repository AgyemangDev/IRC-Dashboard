import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  const { rowData } = location.state || {}; // Extract row data

  if (!rowData) {
    return <p className="text-center mt-10 text-gray-500">No data available</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Details</h1>
      <div className="space-y-4">
        {Object.entries(rowData).map(([key, value], index) => (
          <div key={index} className="p-4 border rounded-md">
            <strong className="text-gray-700">{key}:</strong>
            <p className="text-gray-900">{value || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsPage;
