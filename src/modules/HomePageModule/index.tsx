"use client";
import { useEffect, useState } from "react";
import ConverterForm from "./sections/ConverterForm";

export const HomePageModule = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch("/api/get-token");
        const { accessToken } = await res.json();

        if (accessToken) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/user-info`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              credentials: "include", // Supaya cookie ikut dikirim
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            setUsername(responseData.data.username);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        }
      } catch {
        console.error("Error checking login status");
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div
      id="hero-section"
      className="flex flex-col items-center justify-center min-h-screen px-5 py-20 lg:px-28"
    >
      <main className="py-10">
        <section>
          {isLoggedIn ? (
            <p>Hi, {username}</p>
          ) : (
            <p className="hidden md:block">Hi, Guest</p>
          )}

          <p>HALO YUK REGISTER PAWCAT</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Eaque magni blanditiis velit quidem, eius corporis ipsum
            ullam laboriosam hic? Aspernatur nisi culpa harum quidem
            consequuntur quae. Animi hic cumque illo?
          </p>
        </section>

        <section id="converter-section">
          <ConverterForm />
        </section>
      </main>
    </div>
  );
};
