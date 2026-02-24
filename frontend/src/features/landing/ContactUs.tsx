import React from "react";

export const ContactUs: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-blue-200">
        <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Contact Us
        </h3>

        <div className="space-y-5 text-gray-700 text-lg">
          <div>
            <h4 className="font-semibold text-blue-800">Address</h4>
            <p className="ml-2">123 Library Street, TW</p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-800">Phone</h4>
            <p className="ml-2">(123) 456-7890</p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-800">Email</h4>
            <p className="ml-2">5bS5T@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
