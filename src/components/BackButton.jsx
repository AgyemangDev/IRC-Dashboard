import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
      <ArrowLeft className="h-5 w-5 text-gray-600" />
    </button>
  );
};

export default BackButton;
