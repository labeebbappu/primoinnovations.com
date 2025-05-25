"use client";

import { Post } from "@prisma/client";
import Link from "next/link";

type ListProps = {
  posts: Post[];
};

export default function List({ posts }: ListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Link href={`/admin/posts/${post.id}`} className="text-indigo-600 hover:text-indigo-900">
                  {post.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.postCategory || "Uncategorized"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> Auther Name here </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.published ? "Published" : "Draft"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
