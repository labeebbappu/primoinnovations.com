"use client";

import { Button } from "@/components/ui/button";
import { Auth } from "./types";

type ViewAuthDetailsProps = {
  auth: Auth;
  onEditModeToggle: () => void;
};

export function ViewAuthDetails({ auth, onEditModeToggle }: ViewAuthDetailsProps) {
  // Format date to a readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={onEditModeToggle}>
          Edit Details
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-500">Email</h3>
            <p className="text-gray-900">{auth.email}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-500">Role</h3>
            <p className="text-gray-900 capitalize">{auth.userRole}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-500">Status</h3>
            <p className="text-gray-900 capitalize">
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${auth.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {auth.status}
              </span>
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-500">User ID</h3>
            <p className="text-gray-900 text-sm font-mono">{auth.userId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-500">Created At</h3>
            <p className="text-gray-900">{formatDate(auth.createdAt)}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-500">Last Updated</h3>
            <p className="text-gray-900">{formatDate(auth.updatedAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
}