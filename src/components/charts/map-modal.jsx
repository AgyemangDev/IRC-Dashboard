import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { X } from "lucide-react";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25],
});

const MapModal = ({ isOpen, onClose, locations }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      {/* Full-Screen Map Container */}
      <div className="relative w-screen h-screen">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded-full z-50 hover:bg-opacity-80"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Full-Screen Map */}
        <MapContainer
          center={[-1.2921, 36.8219]} // Default to Nairobi
          zoom={6}
          className="absolute top-0 left-0 w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {locations.map((location) => (
            <Marker key={location.id} position={[location.lat, location.lng]} icon={customIcon}>
              <Popup>
                <div className="text-sm">
                  <strong>{location.name}</strong>
                  <p>{location.count} organizations</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapModal;
