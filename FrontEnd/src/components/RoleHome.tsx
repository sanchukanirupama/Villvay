"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
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
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

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
    endpoint: string
  ) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-8">Your Logged as a {role}</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <Button
          onClick={() => handleFetchData(fetchPublicData, "/api/public")}
          className="w-full"
          disabled={loading}
        >
          Fetch Public Data
        </Button>
        <Button
          onClick={() => handleFetchData(fetchUserData, "/api/user-data")}
          className="w-full"
          disabled={loading}
        >
          Fetch User Data
        </Button>
        <Button
          onClick={() => handleFetchData(fetchAdminData, "/api/admin-data")}
          className="w-full"
          disabled={loading}
        >
          Fetch Admin Data
        </Button>
        <Button
          onClick={() => handleFetchData(fetchGuestData, "/api/guest-data")}
          className="w-full"
          disabled={loading}
        >
          Fetch Guest Data
        </Button>
      </div>
    </div>
  );
}
