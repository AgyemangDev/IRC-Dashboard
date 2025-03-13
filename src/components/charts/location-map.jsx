import { useState } from "react";
import { MapPin } from "lucide-react";
import MapModal from "./map-modal";

const LocationMap = ({ data, title = "Organizations by Location" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter out invalid locations
  const validLocations = data.filter(
    (location) => location.lat !== undefined && location.lng !== undefined
  );

  return (
    <div>
      {/* Rectangle Section */}
      <div
        className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <span className="text-sm text-gray-500">Click to view map</span>
        </div>
        <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Map Preview</span>
        </div>
      </div>

      {/* Import & Use the Modal */}
      <MapModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} locations={validLocations} />
    </div>
  );
};

export default LocationMap;
