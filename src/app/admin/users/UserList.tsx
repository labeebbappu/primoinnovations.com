"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { updateUser } from "./actions";

type UserWithCounts = User & {
  _count: {
    comments: number;
    posts: number;
  };
};

interface UserListProps {
  initialUsers: UserWithCounts[];
}

export default function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<UserWithCounts[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserWithCounts | null>(null);
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
    <Card className="shadow-sm bg-white overflow-hidden border-0 pt-0">
      <CardHeader className="bg-blue-50 border-b px-6 py-5 rounded-none">
        <CardTitle className="text-xl text-blue-900">Users</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {initialUsers.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic">No users found. Create your first user!</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-blue-50 transition-colors cursor-pointer">
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {user.name || "No name"}
                    </Link>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Dialog.Root open={isEditDialogOpen && selectedUser?.id === user.id} onOpenChange={(open: boolean) => {
                      setIsEditDialogOpen(open);
                      if (!open) setSelectedUser(null);
                    }}>
                      <Dialog.Trigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          Edit
                        </Button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <Dialog.Title className="text-[17px] font-medium mb-4">Edit User</Dialog.Title>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleUpdateUser(user.id, {
                              name: formData.get('name') as string,
                              email: formData.get('email') as string,
                            });
                          }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input
                              id="name"
                              name="name"
                              defaultValue={user.name || ''}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              defaultValue={user.email}
                              required
                            />
                          </div>
                          <div className="mt-6 flex justify-end gap-4">
                            <Dialog.Close asChild>
                              <Button type="button" variant="outline">Cancel</Button>
                            </Dialog.Close>
                            <Button type="submit" disabled={isUpdating}>
                              {isUpdating ? 'Updating...' : 'Update User'}
                            </Button>
                          </div>
                        </form>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
