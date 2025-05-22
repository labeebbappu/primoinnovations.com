"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateAuth, deleteAuth } from "./actions";
import { Auth, FormData, AuthUpdateData } from "./types";

type UpdateAuthFormProps = {
  auth: Auth;
  onViewModeToggle: () => void;
};

export function UpdateAuthForm({ auth, onViewModeToggle }: UpdateAuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: auth.email || "",
    password: "", // Don't show existing password for security
    userRole: auth.userRole || "contentWriter",
    status: auth.status || "active",
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

  // Update existing auth
  const handleUpdateAuth = async () => {
    const dataToUpdate: AuthUpdateData = {};

    if (formData.email && formData.email !== auth.email) {
      dataToUpdate.email = formData.email;
    }

    if (formData.password) {
      dataToUpdate.password = formData.password;
    }

    if (formData.userRole && formData.userRole !== auth.userRole) {
      dataToUpdate.userRole = formData.userRole;
    }

    if (formData.status && formData.status !== auth.status) {
      dataToUpdate.status = formData.status;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      toast.info("No changes to update");
      return;
    }

    try {
      const result = await updateAuth(auth.id, dataToUpdate);

      if (result.success) {
        toast.success("Authentication updated successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update authentication");
      }
    } catch (error: unknown) {
      console.error("Error updating auth:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // Delete auth
  const handleDeleteAuth = async () => {
    if (!confirm("Are you sure you want to delete this authentication? This action cannot be undone.")) {
      return;
    }

    try {
      const result = await deleteAuth(auth.id);

      if (result.success) {
        toast.success("Authentication deleted successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete authentication");
      }
    } catch (error: unknown) {
      console.error("Error deleting auth:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={onViewModeToggle}>
          View Details
        </Button>
      </div>

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
            placeholder="New password (leave empty to keep current)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
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
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex space-x-2 mt-6">
        <Button onClick={handleUpdateAuth}>Update Authentication</Button>
        <Button variant="destructive" onClick={handleDeleteAuth}>
          Delete Authentication
        </Button>
      </div>
    </>
  );
}