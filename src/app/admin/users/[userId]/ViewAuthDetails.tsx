"use client";

import { Auth } from "../types";

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
        <button className="btn btn-outline" onClick={onEditModeToggle}>
          Edit Details
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-sm font-medium text-base-content/70">Email</h3>
              <p className="text-base-content">{auth.email}</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-sm font-medium text-base-content/70">Role</h3>
              <p className="text-base-content capitalize">{auth.userRole}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-sm font-medium text-base-content/70">Status</h3>
              <p className="text-base-content capitalize">
                <span className={`badge ${auth.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                  {auth.status}
                </span>
              </p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-sm font-medium text-base-content/70">User ID</h3>
              <p className="text-base-content text-sm font-mono">{auth.userId}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-sm font-medium text-base-content/70">Created At</h3>
              <p className="text-base-content">{formatDate(auth.createdAt)}</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-sm font-medium text-base-content/70">Last Updated</h3>
              <p className="text-base-content">{formatDate(auth.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}