import React from "react";

const TopCountriesSection = ({ countries }) => (
  <div className="mt-6">
    <h3 className="font-semibold mb-2">Top Countries</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {countries
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map((item) => (
          <CountryItem key={item.countryCode} country={item} />
        ))}
    </div>
  </div>
);

const CountryItem = ({ country }) => (
  <div className="flex items-center p-2 bg-gray-50 rounded">
    <div 
      className="w-3 h-3 rounded-full mr-2"
      style={{ backgroundColor: country.color }}
    ></div>
    <span className="text-sm">{country.country}</span>
    <span className="ml-auto font-medium text-sm">{country.count}</span>
  </div>
);

export default TopCountriesSection;