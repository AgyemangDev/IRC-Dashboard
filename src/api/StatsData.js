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

        // Extract unique countries
        const allCountries = allData.map(row => row["Address (Country)"]).filter(Boolean);
        const uniqueCountries = [...new Set(allCountries)];

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