import { useEffect, useState } from "react";
import Papa from "papaparse";
import IRCTable from "../components/UserTable";

const FullICR = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch("/associate-irc-data.csv");
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Associate ICR Members</h1>
      <IRCTable data={data} isLoading={loading} />
    </div>
  );
};

export default FullICR;
