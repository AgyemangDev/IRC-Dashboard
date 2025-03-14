import React from "react";

const MapLegend = () => (
  <div className="mt-4 flex justify-center">
    <div className="flex items-center space-x-6">
      <LegendItem color="#e5eef4" label="No members" />
      <LegendItem color="#a7cee8" label="1-2 members" />
      <LegendItem color="#445d9f" label="3-5 members" />
      <LegendItem color="#112c75" label="6-9 members" />
      <LegendItem color="#40007d" label="10+ members" />
    </div>
  </div>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center">
    
    {color.startsWith("#") ? (
      <div className="w-4 h-4 mr-2 border border-gray-300" style={{ backgroundColor: color }}></div>
    ) : (
      <div className={`w-4 h-4 ${color} mr-2`}></div>
    )}
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export default MapLegend;
