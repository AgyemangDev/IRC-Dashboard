"use client";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import DetailCard from "../components/DetailsCard";
import NoData from "../components/NoData";
import { Building, Calendar, Mail, Phone, MapPin, User, Briefcase } from "lucide-react";

const fieldIcons = {
  "Full Name of Legal Entity": User,
  "Acronym of Organisation": Briefcase,
  "Type of Organisation": Briefcase,
  "Key Priority Areas of the Organisation": Briefcase,
  "Reason for joining the IRC": Briefcase,
  "Name and Title of Highest Authority": User,
  "Name of Focal Person for the IRC": User,
  "Email of Focal Person (Enter Email)": Mail,
  "Email of  the Organisation (Enter Email)": Mail,
  "Total Number of Staff": Building,
  "Telephone Number of Organisation": Phone,
  "Address (Street Address)": MapPin,
  "Address (Address Line 2)": MapPin,
  "Address (City)": MapPin,
  "Address (State / Province)": MapPin,
  "Address (Country)": MapPin,
  "Address (ZIP / Postal Code)": MapPin,
  "Date": Calendar,
  "Upload Picture of Head of Organisation(Optional)": Building,
};

const getReadableLabel = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const DetailsPage = () => {
  const location = useLocation();
  const { rowData } = location.state || {}; 


  if (!rowData) return <NoData />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
          <Header name={rowData.name} industry={rowData.industry} />

          <div className="h-px w-full bg-gray-200" />

          <div className="p-6 md:p-8">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(rowData).map(([key, value]) => (
                <DetailCard key={key} label={getReadableLabel(key)} icon={fieldIcons[key] || Building} value={value} variants={itemVariants} />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailsPage;
