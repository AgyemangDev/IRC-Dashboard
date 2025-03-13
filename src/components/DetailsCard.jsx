import { motion } from "framer-motion";

const DetailCard = ({ label, icon: Icon, value, variants }) => {
  return (
    <motion.div variants={variants} className="group">
      <div className="h-full overflow-hidden transition-all duration-300 hover:shadow-md rounded-xl border border-gray-200 bg-white">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="h-5 w-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
          </div>
          <p className="text-lg font-semibold text-gray-800 break-words">{value || "N/A"}</p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default DetailCard;
