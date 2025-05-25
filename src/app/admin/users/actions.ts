'use server';

import { revalidatePath } from 'next/cache';
import prisma from "@/lib/prisma";
import { User } from './types';

// CREATE actions
export async function createUser(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!email) {
      return [null, new Error('Email is required')];
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return [user, null];
  } catch (error) {
    console.error('Error creating user:', error);
    return [null, new Error('Failed to create user')];
  }
}

// READ actions
export async function getUsers() : Promise<[User[] | null, Error | null]> {
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

    return [users, null];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [null, new Error("Failed to fetch users")];
  }
}

export async function getUserOne(userId: string) : Promise<[User | null, Error | null]>
{
  try {
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

    return [user as User, null];
  } catch (error) {
    console.error("Error fetching user:", error);
    return [null, new Error("Failed to fetch user")];
  }
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
    
    return [updatedUser, null];
  } catch (error) {
    console.error('Error updating user:', error);
    return [null, new Error('Failed to update user')];
  }
}
