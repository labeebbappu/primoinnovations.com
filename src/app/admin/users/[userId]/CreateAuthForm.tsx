"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAuth } from "./actions";
import { FormData } from "./types";

type CreateAuthFormProps = {
  userId: string;
  initialEmail: string;
};

export function CreateAuthForm({ userId, initialEmail }: CreateAuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: initialEmail || "",
    password: "",
    userRole: "contentWriter",
    status: "active",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create new auth
  const handleCreateAuth = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const result = await createAuth(userId, formData.email, formData.password, formData.userRole);

      if (result.success) {
        toast.success("Authentication created successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to create authentication");
      }
    } catch (error: unknown) {
      console.error("Error creating auth:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <p className="mb-4">This user does not have authentication credentials. Create them below:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="userRole">Role</Label>
        <Select value={formData.userRole} onValueChange={(value) => handleSelectChange("userRole", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="contentWriter">Content Writer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleCreateAuth} className="mt-4">
        Create Authentication
      </Button>
    </>
  );
}