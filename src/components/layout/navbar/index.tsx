"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
  const { user, user_id, username, avatar_id, is_admin, logoutUser } =
    useAuth();
  const isAuthenticated = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const pathname = usePathname();
  const router = useRouter();
  const scrollToSection = (id: string) => {
    if (pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  console.log("avatar_id: ", avatar_id);
  console.log("isAdmin: ", is_admin);
  console.log("userid: ", user_id);
  console.log("username: ", username);
  console.log("user: ", user);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg shadow-black/25 rounded-b-xl z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-2 md:space-x-3"
        >
          <Image
            src="/PawCat.png"
            className="h-8 w-8 md:h-12 md:w-12"
            alt="PawCat Logo"
            width={50}
            height={50}
          />
          <span className="text-lg md:text-2xl font-bold text-[#E85D04]">
            PawCat
          </span>
        </Link>

        {/* Register dan Login di Mobile */}
        {!isAuthenticated && (
          <div className="flex items-center space-x-3 md:hidden">
            <Link href={"/login"}>
              <button className="px-7 py-2 text-sm font-medium text-[#E85D04] hover:bg-gray-50 hover:text-[#F48C06] bg-gray-100 rounded-lg">
                Login
              </button>
            </Link>

            <Link href={"/register"}>
              <button className="px-5 py-2 text-sm font-medium text-white bg-[#E85D04] hover:bg-[#F48C06] rounded-lg">
                Register
              </button>
            </Link>
          </div>
        )}

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
          <ul className="flex flex-col lg:items-center font-bold text-[#E85D04] p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <button
                onClick={() => scrollToSection("hero-section")}
                className="w-full block text-left py-2 px-3 rounded-sm hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-[#F48C06] md:p-0"
              >
                Home
              </button>
            </li>

            <li>
              <button
                onClick={() => scrollToSection("converter-section")}
                className="w-full block text-left py-2 px-3 rounded-lg hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-[#F48C06] md:p-0"
              >
                Currency Converter
              </button>
            </li>

            {isAuthenticated && (
              <>
                <li>
                  <Link
                    href="/user-dashboard"
                    className="block py-2 px-3 rounded-sm hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-[#F48C06] md:p-0"
                  >
                    Manage
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 rounded-sm hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-[#F48C06] md:p-0"
                  >
                    Split Bill
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 hover:bg-white hover:rounded-xl md:hidden"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 hover:bg-white hover:rounded-xl md:hidden"
                  >
                    Friends
                  </Link>
                </li>

                <li className="py-1">
                  <button
                    onClick={logoutUser}
                    className="block w-full text-start py-2 px-3 text-red-800 hover:bg-white hover:rounded-xl md:hidden"
                  >
                    Sign out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Register dan Login di Desktop */}
        {!isAuthenticated && (
          <div className="hidden md:flex space-x-3">
            <Link href={"/login"}>
              <button className="w-24 px-4 py-2 text-sm font-bold text-[#E85D04] hover:text-[#F48C06] bg-gray-100 hover:bg-gray-50 rounded-lg">
                Login
              </button>
            </Link>

            <Link href={"/register"}>
              <button className="w-24 px-4 py-2 text-sm font-bold text-white bg-[#E85D04] hover:bg-[#F48C06] rounded-lg">
                Register
              </button>
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="hidden md:block space-x-3">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto "
            >
              <Image
                src="/PawCat.png"
                className="h-8 w-8 md:h-12 md:w-12"
                alt="Avatar Id"
                width={50}
                height={50}
              />
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
              <div className="absolute right-4 mt-2 font-normal bg-gray-100 divide-y divide-white rounded-lg shadow-sm w-44 p-2">
                <ul className="py-2 text-sm font-semibold text-[#E85D04]">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 hover:bg-white hover:rounded-xl"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 hover:bg-white hover:rounded-xl"
                    >
                      Friends
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <button
                    onClick={logoutUser}
                    className="block w-full text-start px-4 py-2 font-semibold text-sm text-[#E85D04] hover:bg-white hover:rounded-xl"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
