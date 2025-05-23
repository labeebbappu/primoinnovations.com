'use server';

import { revalidatePath } from 'next/cache';
import prisma from "@/lib/prisma";

// CREATE actions
export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!email) {
    throw new Error('Email is required');
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

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

// UPDATE actions
export async function updateUser(userId: string, data: { name: string; email: string }) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
      },
      include: {
        _count: {
          select: {
            comments: true,
            posts: true,
          },
        },
      },
    });

    revalidatePath('/admin/users');
    revalidatePath(`/admin/users/${userId}`);
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}
