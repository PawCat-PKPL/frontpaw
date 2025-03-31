import React from "react";

const Home = () => {
  return (
    <div className="w-full max-lg:flex max-lg:justify-center">
      <div className="w-1/2 space-y-4 max-lg:text-center text-left">
        <h1 className="text-4xl lg:text-5xl font-bold">
          Simplify Your Finances
        </h1>
        <h1 className="text-4xl font-bold text-[#E85D04]">
          Take Control Today!
        </h1>

        <p className="pt-3 pb-2 lg:text-xl">
          Manage your finances effortlessly with PawCat! Track
          expenses, split bills with friends, and handle transactions
          with ease. Simple, transparent, and efficient! 🚀
        </p>

        <button className="bg-[#E85D04] text-white px-7 py-[6px] lg:px-10 lg:py-4 rounded-2xl font-semibold lg:text-xl">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
