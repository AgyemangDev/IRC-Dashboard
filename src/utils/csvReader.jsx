import Papa from "papaparse";

export const loadCSVData = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        });
      })
      .catch((error) => reject(error));
  });
};
