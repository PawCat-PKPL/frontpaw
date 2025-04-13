"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "@/components/sonner";

type User = {
  id: number;
  username: string;
  email: string;
};

const SendNotificationSection = () => {
  const { user, is_admin } = useAuth();
  const isAuthenticated = !!user;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<
    number | "all"
  >("all");
  const [sending, setSending] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = `${API_URL}/admin`;

  const fetchUsers = useCallback(async () => {
    if (!isAuthenticated || !is_admin) return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data.data);
      } else {
        toast.error("Failed to fetch users.");
        setError(data.message || "Failed to fetch users.");
      }
    } catch {
      toast.error("Something went wrong while fetching users.");
      setError("Something went wrong while fetching users.");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, is_admin, BASE_URL]);

  type SendNotificationBody = {
    title: string;
    message: string;
    receiver_id?: number | "all";
  };

  const handleSendNotification = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required.");
      return;
    }

    setSending(true);

    const body: SendNotificationBody = { title, message };
    if (selectedUserId !== "all") {
      body.receiver_id = selectedUserId;
    }

    try {
      const response = await fetch(`${BASE_URL}/send-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      await response.json();

      if (response.ok) {
        toast.success("Notification sent successfully!");
        setTitle("");
        setMessage("");
        setSelectedUserId("all");
      } else {
        toast.error("Failed to send notification.");
      }
    } catch {
      toast.error("Error sending notification.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && is_admin) {
      fetchUsers();
    } else if (!isAuthenticated && is_admin === false) {
      setLoading(false);
      toast.error("Only admin can access this page.");
    }
  }, [isAuthenticated, is_admin, fetchUsers]);

  return (
    <div className="min-h-screen space-y-6">
      <Toaster />

      <h2 className="text-3xl font-bold text-[#E85D04]">
        Send Notification
      </h2>

      {/* Notifikasi Form */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Send Notification</h3>

        {loading && <p>Loading users...</p>}
        {!loading && error && <p className="text-red-500">{error}</p>}

        {!loading && !error && is_admin && (
          <div className="flex flex-col gap-2 w-full justify-center">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded-md"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 rounded-md"
            />
            <select
              value={selectedUserId}
              onChange={(e) =>
                setSelectedUserId(
                  e.target.value === "all"
                    ? "all"
                    : Number(e.target.value)
                )
              }
              className="border p-2 rounded-md"
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} - {user.email}
                </option>
              ))}
            </select>
            <button
              onClick={handleSendNotification}
              disabled={sending}
              className="bg-[#E85D04] text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Notification"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendNotificationSection;
