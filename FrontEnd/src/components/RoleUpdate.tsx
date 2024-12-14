"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateRole } from "@/api/auth";
import { toast } from "@/hooks/use-toast";

export default function RoleUpdateComponent() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await updateRole(email, role);
      console.log(data);
      if (data.status) {
        toast({
          title: "Role Update Successful",
          description:
            "If your own user role gets changed you will be automatically logged out",
        });

        const userRole = localStorage.getItem("userRole");
        const userEmail = localStorage.getItem("email");

        if (userEmail === data?.data?.email && userRole != data?.data.role) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("email");

          router.push("/login");
        }
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error?.msg ||
        (error instanceof Error ? error.message : "An error occurred");

      toast({
        title: "Role Update failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-bold">Update User Role</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <RadioGroup
            value={role}
            onValueChange={setRole}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ADMIN" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="USER" id="user" />
              <Label htmlFor="user">User</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="GUEST" id="guest" />
              <Label htmlFor="guest">Guest</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="w-full">
          Update Role
        </Button>
      </form>
    </div>
  );
}
