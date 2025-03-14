import React, { useState, useEffect } from "react";
import MapContainer from "../Map/MapContainer";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import MapLegend from "../Map/MapLegend";
import TopCountriesSection from "../Map/TopCountriesSection";
import { StatData } from "../../api/StatsData";

const WorldMapComponent = ({ title = "Organizations by Location" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const stats = await StatData();
        if (stats) {
          setData(stats);
        } else {
          setError("Failed to load data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Geographic Distribution</h2>
      <div className="text-sm text-gray-500 mb-4">
        Showing distribution of {data.totalRecords} members across {data.uniqueCountries} countries
      </div>
      
      <MapContainer data={data} />
      <MapLegend />
      <TopCountriesSection countries={data.countryData} />
    </div>
  );
};

export default WorldMapComponent;