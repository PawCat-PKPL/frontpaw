"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast, Toaster } from "@/components/sonner";
import Image from "next/image";

export const RegisterPageModule = () => {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

    if (isLoading) return;
    setIsLoading(true);

    const responseData = await registerUser(formData);

    if (responseData?.error) {
      toast.error(responseData.error);
      setIsLoading(false);
    } else {
      toast.success("Registration successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      setFormData({
        username: "",
        email: "",
        full_name: "",
        password: "",
        password2: "",
      });
    }
  };

  return (
    <section className="flex flex-col px-5 py-20 lg:px-28 max-lg:bg-[#FAA307]/20 min-h-screen items-center justify-center">
      <Image
        src="/Divide2.png"
        className="max-lg:hidden absolute top-16 right-0 w-[80%] h-full object-cover -z-10"
        alt="Divide2"
        width={600}
        height={300}
      />
      <div className="flex items-center justify-center lg:grid lg:grid-cols-2 gap-8 w-full max-w-6xl">
        <Image
          src="/Register.png"
          className="max-lg:hidden"
          alt="Register"
          width={900}
          height={600}
        />

        <div className="w-full max-w-md rounded-xl shadow bg-white p-8">
          <h1 className="text-2xl font-bold text-center mb-1">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Please fill in the details to register
          </p>

          <Toaster />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Toaster />
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full p-2.5 border text-sm rounded-lg bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="JohnDoe"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2.5 border text-sm rounded-lg bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="full_name"
                className="block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-2.5 border text-sm rounded-lg bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
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
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 border text-sm rounded-lg bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password2"
                className="block mb-2 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                placeholder="••••••••"
                value={formData.password2}
                onChange={handleChange}
                className="w-full p-2.5 text-sm rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-[#FF7A00] hover:bg-[#F48C06] focus:ring-blue-800"
            >
              Register Now
            </button>

            <p className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium hover:underline text-blue-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
