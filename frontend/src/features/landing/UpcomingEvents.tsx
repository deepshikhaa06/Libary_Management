import { AutoAwesome } from "@mui/icons-material";
import React from "react";

export const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 relativeflex flex-col items-center py-6 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full border border-blue-200">
        <div className="flex justify-center items-center gap-3 mb-6">
          <AutoAwesome sx={{ fontSize: "2.15rem", color: "#1e3a8a" }} />
          <h2 className="text-2xl font-bold text-blue-900 text-center">
            Upcoming Events
          </h2>
          <AutoAwesome sx={{ fontSize: "2.15rem", color: "#1e3a8a" }} />
        </div>

        <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          This Summer
        </h3>

        {/* Tuesday */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">
            Tuesday's : 10:00 AM - Noon
          </h4>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            <li>Who: Children to 6th Grade</li>
            <li>Where: Logic Puzzles, Scratch Puzzles and more</li>
          </ul>
        </div>

        {/* Wednesday */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">
            Wednesday's : 10:00 AM - Noon
          </h4>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            <li>Who: Adults (19+)</li>
            <li>Where: Craft’s and Sip – Come Enjoy a Cup of Tea</li>
          </ul>
        </div>

        {/* Thursday */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">
            Thursday's : 10:00 AM - Noon
          </h4>
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            <li>Who: Teens (13–18)</li>
            <li>Where: Logic Puzzles, Scratch Puzzles and more</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
