import { Edit, Trash2 } from "lucide-react";
import BackButton from "./backButton";

const Header = ({ name, industry }) => {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {name || "Organization Details"}
            </h1>
            {industry && (
              <div className="mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {industry}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
