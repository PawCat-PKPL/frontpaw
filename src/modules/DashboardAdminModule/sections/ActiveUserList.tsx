"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "@/components/sonner";

type User = {
  id: number;
  username: string;
  email: string;
  last_login: string;
};

const ActiveUserListSection = () => {
  const { user, is_admin } = useAuth();
  const isAuthenticated = !!user;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingUserId, setDeletingUserId] = useState<number | null>(
    null
  );

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = `${API_URL}/admin`;

  const fetchActiveUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/active-users`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setUsers(data.data);
    } catch {
      toast.error("Something went wrong while fetching users.");
      setError("Something went wrong while fetching users.");
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  const deleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?"))
      return;

    setDeletingUserId(userId);

    try {
      const res = await fetch(`${BASE_URL}/delete-user/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } else {
        toast.error("Failed to delete user.");
      }
    } catch {
      toast.error("Error deleting user.");
    } finally {
      setDeletingUserId(null);
    }
  };

  const parseDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("-");
    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  useEffect(() => {
    if (isAuthenticated && is_admin) {
      fetchActiveUsers();
    } else if (!isAuthenticated && is_admin === false) {
      setLoading(false);
      toast.error("Only admin can view this page.");
    }
  }, [isAuthenticated, is_admin, fetchActiveUsers]);

  return (
    <div className="min-h-screen space-y-6">
      <Toaster />

      <h2 className="text-3xl font-bold text-[#E85D04]">
        Manage Active Users
      </h2>

      {!loading && !error && users.length > 0 && (
        <p className="pt-3 pb-5 lg:text-xl">
          Below is a list of users who have been active for the past
          five months. Keep up the great work! 🎉
        </p>
      )}

      {loading ? (
        <p className="text-lg">Loading users...</p>
      ) : !is_admin ? (
        <p className="text-lg">
          You are not authorized to view this page.
        </p>
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-lg">
          No active users found. Everyone&apos;s inactive 🎉
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-orange-500 text-sm lg:text-base">
            <thead className="bg-[#B64703] text-white">
              <tr>
                <th className="p-3 border">Username</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Last Login</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">
                    {parseDate(user.last_login).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => deleteUser(user.id)}
                      disabled={deletingUserId === user.id}
                      className="bg-red-500/90 text-white px-4 py-1 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50"
                    >
                      {deletingUserId === user.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveUserListSection;
