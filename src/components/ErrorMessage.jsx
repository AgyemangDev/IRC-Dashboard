import React from "react";

const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
    <p>Error: {message}</p>
  </div>
);

export default ErrorMessage;