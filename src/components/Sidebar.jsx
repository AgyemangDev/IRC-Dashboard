"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Shield,
  List,
  Eye,
  UserCheck,
  UserPlus,
} from "lucide-react";

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white border-r border-gray-200 flex flex-col"
    >
      <div className="h-16 border-b border-gray-200 flex items-center px-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">I</span>
          </div>
          <span className="text-xl font-semibold">IRC Panel</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-4">
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </div>
        </div>

        <div className="px-4 mb-2">
          <h3 className="text-xs uppercase text-gray-500 font-semibold px-3 mb-2">Members</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <UserCheck className="h-5 w-5" />
              <span>Full IRC Members</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <UserPlus className="h-5 w-5" />
              <span>Associate Members</span>
            </div>
          </div>
        </div>

        <div className="px-4 mb-2">
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <Shield className="h-5 w-5" />
            <span>Permissions</span>
          </div>
        </div>

        <div className="px-4 mb-2 mt-4">
          <h3 className="text-xs uppercase text-gray-500 font-semibold px-3 mb-2">Management</h3>
          <div className="pl-8 space-y-1">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <List className="h-5 w-5" />
              <span>Member List</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <Eye className="h-5 w-5" />
              <span>View Members</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
