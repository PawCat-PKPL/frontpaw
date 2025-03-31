"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast, Toaster } from "@/components/sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const LoginPageModule = () => {
  const { loginUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const responseData = await loginUser(formData);

    if (responseData?.error) {
      toast.error(responseData.error);
      setIsLoading(false);
    } else {
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
      setFormData({
        username_or_email: "",
        password: "",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center max-lg:bg-[#FAA307]/20 px-5 lg:px-28">
      <Image
        src="/Divide2.png"
        className="max-lg:hidden absolute top-16 right-0 w-[80%] h-full object-cover -z-10"
        alt="Divide2"
        width={600}
        height={300}
      />

      <div className="flex justify-center lg:grid lg:grid-cols-2 gap-8 w-full max-w-6xl">
        <Image
          src="/Login.png"
          alt="Login"
          width={900}
          height={600}
          className="max-lg:hidden"
        />

        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-1 text-center">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Please login to your account to continue
          </p>

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
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF7A00] hover:bg-[#F48C06] text-white font-bold rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="mt-4 text-sm text-center text-gray-500">
              Don&apos;t have an account yet?{" "}
              <a
                href="/register"
                className="text-blue-500 hover:underline"
              >
                Register Now
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
