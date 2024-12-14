"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  fetchAdminData,
  fetchGuestData,
  fetchPublicData,
  fetchUserData,
} from "@/api/auth";

interface RoleHomeProps {
  role: "ADMIN" | "USER" | "GUEST";
}

export default function RoleHome({ role }: RoleHomeProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [loadingState, setLoadingState] = useState({
    public: false,
    user: false,
    admin: false,
    guest: false,
  });

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== role) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [role, router]);

  const handleFetchData = async (
    fetchFunction: () => Promise<unknown>,
    endpoint: string,
    key: "public" | "user" | "admin" | "guest"
  ) => {
    setLoadingState((prev) => ({ ...prev, [key]: true }));
    try {
      const data = await fetchFunction();
      toast({
        title: `${endpoint} Response`,
        description: JSON.stringify(data, null, 2),
      });
    } catch (error) {
      toast({
        title: `Error fetching ${endpoint}`,
        description: "Unauthorized",
        variant: "destructive",
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, [key]: false }));
    }
  };

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      {/* User Information */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center mb-8">
        <h1 className="text-xl font-bold">Welcome!</h1>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span>{" "}
          {localStorage.getItem("email")}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Role:</span>{" "}
          {localStorage.getItem("userRole")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Public Endpoint
          </h2>
          <p className="text-gray-600 mb-4">
            Accessible to everyone, without authentication.
          </p>
          <Button
            onClick={() =>
              handleFetchData(fetchPublicData, "/api/public", "public")
            }
            className="w-full"
            disabled={loadingState.public}
          >
            {loadingState.public ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Fetch Public Data"
            )}
          </Button>
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test User Endpoint
          </h2>
          <p className="text-gray-600 mb-4">
            Accessible only to authenticated users with the{" "}
            <strong>USER</strong> or <strong>ADMIN</strong> role.
          </p>
          <Button
            onClick={() =>
              handleFetchData(fetchUserData, "/api/user-data", "user")
            }
            className="w-full"
            disabled={loadingState.user}
          >
            {loadingState.user ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Fetch User Data"
            )}
          </Button>
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Admin Endpoint
          </h2>
          <p className="text-gray-600 mb-4">
            Accessible only to authenticated users with the{" "}
            <strong>ADMIN</strong> role.
          </p>
          <Button
            onClick={() =>
              handleFetchData(fetchAdminData, "/api/admin-data", "admin")
            }
            className="w-full"
            disabled={loadingState.admin}
          >
            {loadingState.admin ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Fetch Admin Data"
            )}
          </Button>
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Guest Endpoint
          </h2>
          <p className="text-gray-600 mb-4">
            Accessible only to authenticated users with the{" "}
            <strong>GUEST</strong> role.
          </p>
          <Button
            onClick={() =>
              handleFetchData(fetchGuestData, "/api/guest-data", "guest")
            }
            className="w-full"
            disabled={loadingState.guest}
          >
            {loadingState.guest ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Fetch Guest Data"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
