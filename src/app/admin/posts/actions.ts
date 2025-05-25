"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

import { ActionResponse } from "@/app/types/server-action-types";
import { Post } from "@prisma/client";

export async function createPost(data: {
  title: string;
  content: string;
  postCategory?: string;
  authorId: string;
}): ActionResponse<Post> {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        postCategory: data.postCategory,
        authorId: data.authorId,
      },
    });
    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${post.id}`);
    return [post, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error("Failed to create category")];
  }
}

export async function updatePost(
  id: string,
  data: {
    title?: string;
    content?: string;
    postCategory?: string;
    published?: boolean;
  }
): ActionResponse<Post> {
  try {
    const post = await prisma.post.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${id}`);
    return [post, null] as const;
  } catch (error) {
    return [null, error instanceof Error ? error : new Error("Failed to create category")];
  }
}

export async function deletePost(id: string): ActionResponse<Post> {
  try {
    // First delete all comments associated with the post
    await prisma.comment.deleteMany({
      where: { postId: id },
    });
    
    // Then delete the post
    const post = await prisma.post.delete({
      where: { id },
    });
    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${id}`);
    return [post, null] as const;
  } catch (error) {
    return [null, error instanceof Error ? error : new Error("Failed to delete post")];
  }
}

export async function getPost(id: string): ActionResponse<Post> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    return [post, null] as const;
  } catch (error) {
    return [null, error instanceof Error ? error : new Error("Failed to create category")];
  }
}

export async function getPosts(): ActionResponse<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return [posts, null] as const;
  } catch (error) {
    return [null, error instanceof Error ? error : new Error("Failed to create category")];
  }
}
