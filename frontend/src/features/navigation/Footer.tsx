import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-700 text-white py-5 mt-7">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Left Section */}
        <div>
          <p className="text-lg font-semibold">📍 123 Library Street, TW</p>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col gap-2">
          <p className="hover:text-gray-200 cursor-pointer transition">Return Policy</p>
          <p className="hover:text-gray-200 cursor-pointer transition">Privacy Policy</p>
          <p className="hover:text-gray-200 cursor-pointer transition">Terms & Conditions</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="font-semibold mb-2">Follow Us</p>
          <div className="flex gap-4 text-white">
            <YouTube className="cursor-pointer hover:text-red-500 transition" />
            <Twitter className="cursor-pointer hover:text-blue-400 transition" />
            <Facebook className="cursor-pointer hover:text-blue-600 transition" />
            <Instagram className="cursor-pointer hover:text-pink-500 transition" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-200 mt-3 border-t border-gray-400 pt-3">
        © {new Date().getFullYear()} My Library. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;