"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateAuth, deleteAuth } from "./actions";
import { Auth, FormData, AuthUpdateData } from "../types";

type UpdateAuthFormProps = {
  auth: Auth;
  onViewModeToggle: () => void;
};

export function UpdateAuthForm({ auth, onViewModeToggle }: UpdateAuthFormProps) {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
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
    setIsLoadingUpdate(true);
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
      setIsLoadingUpdate(false);
      return;
    }

    const [, error] = await updateAuth(auth.id, dataToUpdate);

    if (error) {
      toast.error(typeof error === "string" ? error : "Failed to update authentication");
      return;
    }

    toast.success("Authentication updated successfully");
    setTimeout(() => {
      window.location.reload();
    }, 100);

    setIsLoadingUpdate(false);
  };

  // Delete auth
  const handleDeleteAuth = async () => {
    if (!confirm("Are you sure you want to delete this authentication? This action cannot be undone.")) {
      return;
    }

    setIsLoadingDelete(true);

    const [, error] = await deleteAuth(auth.id);

    if (error) {
      toast.error(typeof error === "string" ? error : "Failed to delete authentication");
      return;
    }

    toast.success("Authentication deleted successfully");
    router.refresh();

    setIsLoadingDelete(false);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-end mb-4">
          <button className="btn btn-outline" onClick={onViewModeToggle}>
            View Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New password (leave empty to keep current)"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.userRole}
              onChange={(e) => handleSelectChange("userRole", e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="contentWriter">Content Writer</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.status}
              onChange={(e) => handleSelectChange("status", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            className="btn btn-primary"
            onClick={handleUpdateAuth}
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate && <Loader2 className="animate-spin mr-2" />}
            Update Authentication
          </button>
          <button
            className="btn btn-error"
            onClick={handleDeleteAuth}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete && <Loader2 className="animate-spin mr-2" />}
            Delete Authentication
          </button>
        </div>
      </div>
    </div>
  );
}
