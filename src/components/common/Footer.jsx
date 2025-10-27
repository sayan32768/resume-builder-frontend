import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 w-full md:px-12 max-md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-white text-2xl font-bold">Resume.</h2>
          <p className="text-gray-400 max-w-sm">
            Create stunning, professional resumes effortlessly. Build, preview,
            and download your perfect resume — all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#templates" className="hover:text-white transition">
                Templates
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <p className="text-gray-400 mb-3 max-w-xs">
            Subscribe to get the latest updates and resume tips.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-sm bg-gray-800 text-white focus:outline-none w-full"
            />
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-r-sm transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Resume. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
