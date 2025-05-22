"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { User } from "@prisma/client";

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
                <TableHead>Posts</TableHead>
                <TableHead>Comments</TableHead>
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
                  <TableCell>{user._count?.posts || 0}</TableCell>
                  <TableCell>{user._count?.comments || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
