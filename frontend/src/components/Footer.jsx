import React from "react";
import { Smartphone, Mail } from "lucide-react";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <footer className="bg-olive-700 text-white py-10">
      <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-6 gap-10">
        {/* Contact */}
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4 tracking-wide">
            Contact Us
          </h3>

          <p className="flex items-center gap-2 text-sm text-gray-200 mb-3">
            <Smartphone size={18} />
            Phone: 123-456-7890
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-200">
            <Mail size={18} />
            Email: info@ecommerce.com
          </p>
        </div>

        {/* Social */}
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4 tracking-wide">
            Follow Us
          </h3>

          <div className="flex items-center gap-4">
            <SocialIcon
              url="https://facebook.com"
              style={{ height: 35, width: 35 }}
            />
            <SocialIcon url="https://x.com" style={{ height: 35, width: 35 }} />
            <SocialIcon
              url="https://instagram.com"
              style={{ height: 35, width: 35 }}
            />
          </div>
        </div>

        {/* About */}
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4 tracking-wide">About Us</h3>

          <p className="text-sm text-gray-200 leading-relaxed">
            Welcome to our e-commerce store! We offer the best products at
            competitive prices.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-400/30 mt-8 pt-5 text-center text-sm text-gray-300">
        <p>&copy; 2026 E-commerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
