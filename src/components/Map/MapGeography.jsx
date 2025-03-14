import React from "react";
import { Geography } from "react-simple-maps";

const MapGeography = ({ geo, data, setTooltipContent }) => {
  const getFillColor = () => {
    if (!data || !data.countryData) return "#F5F4F6";
    
    // Get country code from geo properties - using correct case and checking multiple possible properties
    // Using uppercase for comparison since GeoJSON often has uppercase ISO codes
    const geoCountryCode = (geo.properties.name).toUpperCase();
    
    // If no ISO code found, return default color
    // Find matching country in data
    const countryItem = data.countryData.find(
      d => d.country.toUpperCase() === geoCountryCode.toUpperCase()
    );

    
    // Return color based on count if country is found
    if (countryItem) {
      
      const count = countryItem.count;
      if (count >= 10) return "#40007d"; // indigo-600
      if (count >= 6) return "#112c75";  // indigo-400
      if (count >= 3) return "#445d9f";  // indigo-200
      return "#a7cee8";                  // indigo-100
    }
    
    return "#e5eef4"; // default color for countries with no data
  };

  // Use consistent way to get country code for all methods
  const getCountryCode = () => {
    return (geo.properties.ISO_A2 || geo.properties.iso_a2 || geo.id || "").toUpperCase();
  };

  const isActive = data.countryData?.some(
    d => d.countryCode.toUpperCase() === getCountryCode()
  );

  const handleMouseEnter = () => {
    const countryCode = getCountryCode();
    
    const countryItem = data.countryData?.find(
      d => d.countryCode.toUpperCase() === countryCode
    );
    
    console.log("Contru",countryItem)
    if (countryItem) {
      setTooltipContent(
        `${countryItem.country}: ${countryItem.count} ${countryItem.count === 1 ? 'member' : 'members'}`
      );
    } else {
      // Use the country name from the GeoJSON if available
      const countryName = geo.properties.NAME || geo.properties.name || "Unknown";
      setTooltipContent(`${countryName}: 0 members`);
    }
  };

  return (
    <Geography
      geography={geo}
      fill={getFillColor()}
      stroke="#D6D6DA"
      strokeWidth={0.5}
      style={{
        default: {
          outline: "none",
        },
        hover: {
          fill: isActive ? "#6366F1" : "#F5F4F6",
          outline: "none",
          cursor: isActive ? "pointer" : "default"
        },
        pressed: {
          fill: "#3730A3",
          outline: "none"
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setTooltipContent("")}
    />
  );
};

export default MapGeography;