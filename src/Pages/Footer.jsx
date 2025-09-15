import React from "react";
import { Mail, Phone, Info } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold text-blue-600">Customer Support</h1>
            <p className="text-gray-600 text-sm">Ticketing System </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-yellow-500" />
              <span>Mon - Fri, 9am - 6pm</span>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 text-center text-gray-500 text-medium">
          All Rights Reserved Sakshi Priya  &copy; 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
