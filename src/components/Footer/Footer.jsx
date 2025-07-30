import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 py-12 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img
              className="bg-orange-200/30 rounded-3xl h-20 w-20"
              src="logo.png"
              alt="NepaliThali"
            />
            <h2 className="text-2xl font-bold text-orange-400">NepaliThali</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Authentic Nepali food delivered fresh to your door. Enjoy
            traditional dishes with rich taste and culture that brings the
            Himalayas to your home.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {["Home", "Menu", "About", "Contact", "Order Now"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase().replace(" ", "")}`}
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">
            Contact Us
          </h3>
          <ul className="text-sm text-gray-300 space-y-3">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-orange-400" />
              <span>+977 9701683070</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-orange-400" />
              <span>hello@nepalithali.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-orange-400" />
              <span>Pokhara, Nepal</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        <p>
          © 2024 NepaliThali. All rights reserved. Made with ❤️ for authentic
          Nepali cuisine.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
