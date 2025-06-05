"use client";

import { Post } from "@prisma/client";
import Link from "next/link";

type ListProps = {
  posts: Post[];
};

export default function List({ posts }: ListProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="card-title text-primary hover:text-primary-focus transition-colors duration-200"
                >
                  {post.title}
                </Link>
                <div className="badge badge-lg" data-theme={post.published ? "success" : "warning"}>
                  {post.published ? "Published" : "Draft"}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-base-content/70">
                  <span className="font-medium">Category:</span> {post.postCategory || "Uncategorized"}
                </div>
                <div className="text-base-content/70">
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
