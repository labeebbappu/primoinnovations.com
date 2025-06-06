"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAuth } from "./actions";
import { FormData } from "../types";

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

    const [, error] = await createAuth(userId, formData.email, formData.password, formData.userRole);

    if (error) {
      toast.error(typeof error === "string" ? error : "Failed to create authentication");
      return;
    }

    toast.success("Authentication created successfully");
    router.refresh();
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create Authentication</h2>
        <p className="text-base-content/70">This user does not have authentication credentials. Create them below:</p>

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
            placeholder="Password"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={formData.userRole}
            onChange={(e) => handleSelectChange("userRole", e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="contentWriter">Content Writer</option>
          </select>
        </div>

        <div className="card-actions justify-end mt-4">
          <button onClick={handleCreateAuth} className="btn btn-primary">
            Create Authentication
          </button>
        </div>
      </div>
    </div>
  );
}
