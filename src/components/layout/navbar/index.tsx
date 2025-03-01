"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const Navbar = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          <span className="text-2xl font-semibold">PawCat</span>
        </a>

        {/* Register dan Login di Mobile */}
        <div className="flex items-center space-x-3 md:hidden">
          <Link href={"/register"}>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg">
              Register
            </button>
          </Link>

          <Link href={"/login"}>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg">
              Login
            </button>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col lg:items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className="block py-2 px-3  text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto "
              >
                Dropdown{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 font-normal bg-gray-200 divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </li> */}
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Currency Converter
              </Link>
            </li>
          </ul>
        </div>

        {/* Register dan Login di Desktop */}
        <div className="hidden md:flex space-x-3">
          <Link href={"/register"}>
            <button className="w-24 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg">
              Register
            </button>
          </Link>

          <Link href={"/login"}>
            <button className="w-24 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
