"use client";

import { useState, FormEvent } from "react";
import { RegisterSchema } from "@/hooks/auth";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const RegisterPageModule = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = RegisterSchema.safeParse(formData);

    if (!result.success) {
      const errorMessages = result.error.errors.map(
        (err) => err.message
      );
      errorMessages.forEach((message) => alert(message));
      return;
    }

    // Continue with the registration process
    console.log("Form data is valid", result.data);
  };

  return (
    <section className="flex flex-col px-5 py-20 lg:px-28 bg-gray-900 min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow bg-gray-800 p-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          Create an account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full p-2.5 border text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="JohnDoe"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2.5 border text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="full_name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              placeholder="John Doe"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2.5 border text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2.5 border text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password2"
              className="block mb-2 text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              placeholder="••••••••"
              value={formData.password2}
              onChange={handleChange}
              className="w-full p-2.5 text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Create an account
          </button>
        </form>
      </div>
    </section>
  );
};
