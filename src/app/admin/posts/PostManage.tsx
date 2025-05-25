"use client";

import { Post } from "@prisma/client";
import List from "./List";

type PostManageProps = {
  posts: Post[];
  
};

export default function PostManage({ posts }: PostManageProps) {
   

  return (
    <div className="">
      

      <List posts={posts} />
    </div>
  );
}
