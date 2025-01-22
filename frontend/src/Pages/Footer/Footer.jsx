import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1565C0] rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        
        <span className="text-sm text-white sm:text-center">
          © 2025{" "}
          <a href="" className="hover:underline text-gray-200">
          TaskMaster™
          </a>
          . All Rights Reserved.
        </span>

        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-gray-200">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-gray-200">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-gray-200">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline text-gray-200">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
