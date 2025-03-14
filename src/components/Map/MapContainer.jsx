import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import MapGeography from "./MapGeography";

// Using a direct URL to a GeoJSON file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapContainer = ({ data }) => {

  const [tooltipContent, setTooltipContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Fetch the GeoJSON data
    fetch(geoUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(worldData => {
        setGeoData(worldData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching map data:", error);
        setError("Failed to load map data");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !geoData) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="text-red-500 text-center p-4">
          <p>{error || "Failed to load map data"}</p>
          <p className="text-sm mt-2">
            Please check your internet connection or try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 relative" data-tooltip-id="map-tooltip">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20] // Centered more on Africa
        }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <MapGeography
                  key={geo.rsmKey}
                  geo={geo}
                  data={data}
                  setTooltipContent={setTooltipContent}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      <ReactTooltip id="map-tooltip" content={tooltipContent} place="top" />
    </div>
  );
};

export default MapContainer;