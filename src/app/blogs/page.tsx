import React from "react";
import TopMenu from "@/app/intro/TopMenu";
import FootBar from "@/app/intro/FootBar";
import RecentPosts from "./RecentPosts";
import prisma from "@/lib/prisma";

const BlogPage = async () => {
  const posts = await prisma.post.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopMenu />
      <main className="pt-20 pb-12">
        <RecentPosts posts={posts} />
      </main>
      <FootBar />
    </div>
  );
};

export default BlogPage;
