import React from "react";
import TopMenu from "@/app/intro/TopMenu";
import FootBar from "@/app/intro/FootBar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ url: string }>;
}

const BlogPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  // If you need searchParams, you can also await it:
  // const resolvedSearchParams = await searchParams;

  // Check if the URL parameter is a valid MongoDB ObjectId (24 character hex string)
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(resolvedParams.url);

  const post = await prisma.post.findFirst({
    where: {
      OR: [
        { blogUrl: resolvedParams.url },
        ...(isObjectId ? [{ id: resolvedParams.url }] : [])
      ],
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  if (!post.published) {
    return (
      <div className=" bg-gray-50">
        <TopMenu />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-semibold text-gray-700 mb-2">Working on it!</h1>
              <p className="text-gray-600">This post is currently being prepared. Please check back later.</p>
            </div>
          </div>
        </main>
        <FootBar />
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      <TopMenu />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <span>By {post.author.name}</span>
              {post.category && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.category.name}</span>
                </>
              )}
              <span className="mx-2">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none">
              {post.content}
            </div>
          </article>
        </div>
      </main>
      <FootBar />
    </div>
  );
};

export default BlogPage;
