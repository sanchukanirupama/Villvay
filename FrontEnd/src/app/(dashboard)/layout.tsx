"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import RoleUpdateComponent from "@/components/RoleUpdate";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("email");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Villvay Assessment</h1>
          <Button
            onClick={handleLogout}
            className="px-4 py-2"
            variant="destructive"
          >
            Logout
          </Button>
        </div>
      </header>
      <main className="flex max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 gap-4">
        <div className="section w-full md:w-1/2 bg-white shadow p-4 rounded animate-slide-up">
          {children}
        </div>
        <div className="section w-full md:w-1/2 bg-white shadow p-4 rounded animate-slide-up">
          <RoleUpdateComponent />
        </div>
      </main>
    </div>
  );
}
