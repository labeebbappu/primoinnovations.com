"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@prisma/client";
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
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-base-200 transition-colors">
                    <td className="font-medium">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="link link-primary hover:link-primary-focus"
                      >
                        {user.name || "No name"}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
