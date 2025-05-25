"use client";

import { Post } from "@prisma/client";
import Link from "next/link";

type ListProps = {
  posts: Post[];
};

export default function List({ posts }: ListProps) {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200"
                >
                  {post.title}
                </Link>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span> {post.postCategory || "Uncategorized"}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Author:</span> Author Name here
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
