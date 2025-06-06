"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@/app/admin/users/types";
import { toast } from "sonner";
import { updateUser } from "./actions";

interface UserListProps {
  initialUsers: User[];
}

export default function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateUser = async (userId: string, updatedData: { name: string; email: string }) => {
    setIsUpdating(true);
    try {
      const updatedUser = await updateUser(userId, updatedData);
      setUsers(users.map(user => user.id === userId ? { ...user, ...updatedUser } : user));
      setIsEditDialogOpen(false);
      toast.success('User updated successfully');
    } catch (error: unknown) {
      console.error('Error updating user:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-header bg-primary/10 p-6">
        <h2 className="card-title text-xl">Users</h2>
      </div>
      <div className="card-body p-6">
        {initialUsers.length === 0 ? (
          <div className="text-center py-10 text-base-content/70 italic">No users found. Create your first user!</div>
        ) : (
          <div className="space-y-4">
            {initialUsers.map((user) => (
              <div key={user.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="link link-primary hover:link-primary-focus text-lg font-medium"
                      >
                        {user.name || "No name"}
                      </Link>
                      <p className="text-base-content/70 mt-1">{user.email}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        {user.auth ? (
                          <>
                            <span className="badge badge-sm capitalize">{user.auth.userRole}</span>
                            <span className={`badge badge-sm ${user.auth.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                              {user.auth.status}
                            </span>
                          </>
                        ) : (
                          <span className="badge badge-sm badge-ghost">No Auth</span>
                        )}
                      </div>
                      
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      <dialog className={`modal ${isEditDialogOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateUser(selectedUser!.id, {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
              });
            }}
            className="space-y-4"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={selectedUser?.name || ''}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={selectedUser?.email}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update User'}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => {
            setIsEditDialogOpen(false);
            setSelectedUser(null);
          }}>close</button>
        </form>
      </dialog>
    </div>
  );
}
