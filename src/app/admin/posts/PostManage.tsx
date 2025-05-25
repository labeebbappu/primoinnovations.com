"use client";

import { Post } from "@prisma/client";
import List from "./List";

type PostManageProps = {
  posts: Post[];
  
};

export default function PostManage({ posts }: PostManageProps) {
   

  return (
    <div className="space-y-8">
      

      <List posts={posts} />
    </div>
  );
}
