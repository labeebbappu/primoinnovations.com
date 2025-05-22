'use server';

import prisma from "@/lib/prisma";

// READ actions
export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        _count: {
          select: { comments: true, posts: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserOne(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          posts: true,
          comments: true,
        },
      },
    },
  });
  return user;
}
