"use client";

import React, { useRef } from "react";
import InactiveUserListSection from "./sections/InactiveUserList";
import ActiveUserListSection from "./sections/ActiveUserList";
import SendNotificationSection from "./sections/SendNotificationSection";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const DashboardAdminPageModule = () => {
  const { user, is_admin } = useAuth();
  const isAuthenticated = !!user;

  const router = useRouter();

  const notifRef = useRef<HTMLDivElement>(null);
  const inactiveRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  const scrollToNotification = () => {
    notifRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToInactive = () => {
    inactiveRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToActive = () => {
    activeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isAuthenticated || !is_admin) {
    router.push("/login");
  }

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="w-full bg-[#E85D04] text-white py-6 px-4 shadow-md">
        <h1 className="text-4xl mt-2 lg:text-5xl font-bold text-center">
          Admin Dashboard
        </h1>
      </div>

      {/* Shortcut Scroll Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={scrollToActive}
          className=" text-[#E85D04] underline mt-2 px-4 py-2 rounded-md font-semibold hover:text-[#e83504]"
        >
          Go to Active Users
        </button>
        <button
          onClick={scrollToInactive}
          className=" text-[#E85D04] underline mt-2 px-4 py-2 rounded-md font-semibold hover:text-[#e83504]"
        >
          Go to Inactive Users
        </button>
        <button
          onClick={scrollToNotification}
          className="text-[#E85D04] underline mt-2 px-4 py-2 rounded-md font-semibold hover:text-[#e81f04]"
        >
          Go to Send Notification
        </button>
      </div>

      {/* Page Content */}
      <div className="w-full flex justify-center py-10 px-4">
        <div className="w-full lg:w-3/4 xl:w-2/3 text-left max-lg:text-center">
          <div className="space-y-16">
            {/* Active Users Section */}
            <div
              ref={activeRef}
              className="bg-white p-6 rounded-md shadow-md"
            >
              <ActiveUserListSection />
            </div>

            {/* Inactive Users Section */}
            <div
              ref={inactiveRef}
              className="bg-white p-6 rounded-md shadow-md"
            >
              <InactiveUserListSection />
            </div>

            {/* Send Notification Section */}
            <div
              ref={notifRef}
              className="bg-white p-6 rounded-md shadow-md"
            >
              <SendNotificationSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
