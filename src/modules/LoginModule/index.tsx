"use client";

import { useState } from "react";
import { loginUser } from "@/hooks/auth";
import { toast, Toaster } from "@/components/sonner";

export const LoginPageModule = () => {
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login attempt", formData);

    const responseData = await loginUser(formData);

    if (responseData?.error) {
      if (responseData.error.includes("Too many login attempts")) {
        toast.error(
          "Too many login attempts. Please try again later."
        );
      } else {
        toast.error(responseData.error);
      }
    } else {
      toast.success("Login successful!");
      setFormData({
        username_or_email: "",
        password: "",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          Sign in to your account
        </h1>

        <Toaster />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username_or_email"
              className="block mb-2 text-sm font-medium"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="username_or_email"
              value={formData.username_or_email}
              onChange={handleChange}
              placeholder="name@company.com or JohnDoe"
              className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-800"
          >
            Sign in
          </button>
          <p className="mt-4 text-sm text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:underline"
            >
              Register here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};
