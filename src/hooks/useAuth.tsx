"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { RegisterSchema, LoginSchema } from "./authSchemas";
import { sanitizeInput } from "./authUtils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  user_id: string;
  username: string;
  avatar_id: number;
  is_admin: boolean;
  role: string;
}

interface AuthResponse {
  success?: string;
  error?: string;
  data?: unknown;
}

interface AuthContextType {
  user: User | null;
  user_id: string;
  username: string;
  avatar_id: number;
  is_admin: boolean;
  isAdmin: boolean;
  registerUser: (
    data: Record<string, unknown>
  ) => Promise<AuthResponse>;
  loginUser: (data: Record<string, unknown>) => Promise<AuthResponse>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (data: Record<string, unknown>) => {
    const sanitizedData = {
      username: sanitizeInput(data.username as string),
      email: sanitizeInput(data.email as string),
      full_name: sanitizeInput(data.full_name as string),
      password: sanitizeInput(data.password as string),
      password2: sanitizeInput(data.password2 as string),
    };

    const result = RegisterSchema.safeParse(sanitizedData);
    if (!result.success) {
      return {
        error: result.error.errors
          .map((err) => err.message)
          .join(", "),
      };
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const apiErrors = responseData?.data
          ? Object.values(responseData.data).flat().join(" ")
          : responseData.message || "Registration failed!";
        return { error: apiErrors };
      }

      return { success: "Registration successful!" };
    } catch {
      return { error: "An error occurred on the server." };
    }
  };

  const loginUser = async (data: Record<string, unknown>) => {
    const sanitizedData = {
      username_or_email: sanitizeInput(
        data.username_or_email as string
      ),
      password: sanitizeInput(data.password as string),
    };

    const result = LoginSchema.safeParse(sanitizedData);
    if (!result.success) {
      return {
        error: result.error.errors
          .map((err) => err.message)
          .join(", "),
      };
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
        credentials: "include",
      });

      const responseData = await response.json();

      if (response.status === 429) {
        return {
          error: "Too many login attempts. Please try again later.",
        };
      }

      if (!response.ok) {
        const apiErrors = responseData?.data
          ? Object.values(responseData.data).flat().join(" ")
          : responseData.message || "Login failed";
        return { error: apiErrors };
      }
      setUser(responseData.data);
      return { success: "Login successful!" };
    } catch {
      return {
        error: "An error occurred on the server.",
      };
    }
  };

  const logoutUser = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      // console.log("Logout response:", response);
    } catch {
      // console.error("Error logging out");
    } finally {
      setUser(null);
    }
  };

  const refreshToken = useCallback(async () => {
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch("/api/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (response.status === 401) {
          console.warn("Refresh token expired, logging out...");
          logoutUser();
          return null;
        }

        if (!response.ok) {
          throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        return data.accessToken;
      } catch {
        console.error("Error refreshing token");
        retries -= 1;
        if (retries === 0) {
          logoutUser();
          return null;
        }
      }
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const tokenResponse = await fetch("/api/get-token");
      if (!tokenResponse.ok) throw new Error("Failed to fetch token");

      const tokenData = await tokenResponse.json();
      let accessToken = tokenData?.accessToken;
      // console.log("Token data:", tokenData);

      if (!accessToken) {
        console.warn("No access token found, attempting refresh...");
        accessToken = await refreshToken();

        if (!accessToken) {
          console.warn(
            "No valid token after refresh, logging out..."
          );
          logoutUser();
          return;
        }
      }

      const response = await fetch(`${API_URL}/auth/user-info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      });

      if (response.status === 401) {
        console.warn("Access denied, logging out...");
        logoutUser();
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData.data);
      }
    } catch {
      // console.error("Error fetching user info");
    }
  }, [setUser, refreshToken]);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        user_id: user?.user_id ?? "",
        username: user?.username ?? "",
        avatar_id: user?.avatar_id ?? 0,
        is_admin: user?.is_admin ?? false,
        isAdmin: user?.role === "admin",
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
