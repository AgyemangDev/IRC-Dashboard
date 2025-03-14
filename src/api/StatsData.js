import Papa from 'papaparse';


const fetchCSV = async (filePath) => {
    const response = await fetch(filePath);
    const csvText = await response.text();
    return new Promise((resolve) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
        });
    });
};

// Country code mapping
const countryCodeMap = {
    "Germany": "DE",
    "Finland": "FI",
    "Benin": "BJ",
    "France": "FR",
    "Belgium": "BE",
    "Côte d'Ivoire": "CI",
    "Ghana": "GH",
    "Uganda": "UG",
    "Rwanda": "RW",
    "Netherlands": "NL",
    "Burkina Faso": "BF",
    "Ethiopia": "ET",
    "Portugal": "PT",
    "Nigeria": "NG",
    "Zimbabwe": "ZW",
    "Tanzania, the United Republic of": "TZ",
    // Additional common country codes
    "United States": "US",
    "United Kingdom": "GB",
    "Canada": "CA",
    "Australia": "AU",
    "Kenya": "KE",
    "South Africa": "ZA",
    "Switzerland": "CH",
    "Sweden": "SE",
    "Norway": "NO",
    "Denmark": "DK",
    "Spain": "ES",
    "Italy": "IT",
    "India": "IN",
    "China": "CN",
    "Japan": "JP",
    "Brazil": "BR",
    "Argentina": "AR",
    "Mexico": "MX",
    "Senegal": "SN",
    "Mali": "ML",
    "Niger": "NE",
    "Cameroon": "CM",
    "Malawi": "MW",
    "Zambia": "ZM",
    "Egypt": "EG",
    "Morocco": "MA",
    "Algeria": "DZ",
    "Tunisia": "TN",
    "Sudan": "SD",
    "South Sudan": "SS",
    "Somalia": "SO",
    "Djibouti": "DJ",
    "Eritrea": "ER",
    "Democratic Republic of the Congo": "CD",
    "Republic of the Congo": "CG",
    "Central African Republic": "CF",
    "Chad": "TD",
    "Gabon": "GA",
    "Equatorial Guinea": "GQ",
    "Madagascar": "MG",
    "Mozambique": "MZ",
    "Tanzania": "TZ"
};

export const StatData = async () => {
    try {
        // Load CSVs from the public folder
        const associateData = await fetchCSV('/associate-irc-data.csv');
        const fullData = await fetchCSV('/full-irc-data.csv');

        // Combine both datasets
        const allData = [...associateData, ...fullData];

        // Count total number of records
        const totalRecords = allData.length;
        const associateCount = associateData.length;
        const fullCount = fullData.length;

        // Calculate membership percentages
        const fullPercentage = totalRecords > 0 ? (fullCount / totalRecords) * 100 : 0;
        const associatePercentage = totalRecords > 0 ? (associateCount / totalRecords) * 100 : 0;

        // Extract organization names
        const allOrganizations = allData.map(row => row["Full Name of Legal Entity"]).filter(Boolean);
        const uniqueOrganizations = [...new Set(allOrganizations)];

        // Extract total staff count
        const totalStaff = allData
            .map(row => parseInt(row["Total Number of Staff"] || "0", 10))
            .reduce((sum, num) => sum + num, 0);

        // Extract gender distribution
        const totalFemales = allData
            .map(row => parseInt(row["Females"] || "0", 10))
            .reduce((sum, num) => sum + num, 0);

        const totalMales = allData
            .map(row => parseInt(row["Males"] || "0", 10))
            .reduce((sum, num) => sum + num, 0);

        // Extract countries and count occurrences
        const countryOccurrences = {};
        allData.forEach(row => {
            const country = row["Address (Country)"];
            if (country) {
                countryOccurrences[country] = (countryOccurrences[country] || 0) + 1;
            }
        });

        // Create country data for mapping with React Simple Maps
        const countryData = Object.entries(countryOccurrences).map(([country, count]) => {
            const code = countryCodeMap[country] || null;
            return {
                country,
                countryCode: code,
                count,
                color: getColorByCount(count)
            };
        });

        // Extract unique countries
        const uniqueCountries = Object.keys(countryOccurrences);

        // Extract and categorize organization types
        const organizationCategories = {
            "Academia": 0,
            "Research": 0,
            "Funding Agency": 0,
            "Private Sector": 0,
            "Farmer Organization": 0,
            "Extension Organization": 0,
            "SME": 0,
            "NGO": 0,
            "Other": 0
        };

        allData.forEach(row => {
            const orgType = row["Type of Organisation"]?.trim();
            if (organizationCategories.hasOwnProperty(orgType)) {
                organizationCategories[orgType]++;
            } else {
                organizationCategories["Other"]++;
            }
        });

        // Convert categories into an array with colors
        const orgTypeData = [
            { name: "Academia", count: organizationCategories["Academia"], color: "#4f46e5" },
            { name: "Research", count: organizationCategories["Research"], color: "#818cf8" },
            { name: "Funding Agency", count: organizationCategories["Funding Agency"], color: "#6366f1" },
            { name: "Private Sector", count: organizationCategories["Private Sector"], color: "#a5b4fc" },
            { name: "Farmer Organization", count: organizationCategories["Farmer Organization"], color: "#3730a3" },
            { name: "Extension Organization", count: organizationCategories["Extension Organization"], color: "#6b7280" },
            { name: "SME", count: organizationCategories["SME"], color: "#10b981" },
            { name: "NGO", count: organizationCategories["NGO"], color: "#ec4899" },
            { name: "Other", count: organizationCategories["Other"], color: "#f59e0b" }
        ];

        return {
            associateCount,
            fullCount,
            totalRecords,
            uniqueOrganizations: uniqueOrganizations.length,
            totalStaff,
            totalFemales,
            totalMales,
            uniqueCountries: uniqueCountries.length,
            countryData,
            membershipData: [
                { name: "Full Members", value: fullPercentage, count: fullCount, color: "#4f46e5" },
                { name: "Associate Members", value: associatePercentage, count: associateCount, color: "#818cf8" },
            ],
            orgTypeData
        };
    } catch (error) {
        console.error("Error loading CSV data:", error);
        return null;
    }
};

// Helper function to get color based on count (for choropleth mapping)
function getColorByCount(count) {
    if (count >= 10) return "#4f46e5"; // Dark blue for highest counts
    if (count >= 5) return "#818cf8";  // Medium blue
    if (count >= 3) return "#a5b4fc";  // Light blue
    return "#c7d2fe";                  // Very light blue for lowest counts
}