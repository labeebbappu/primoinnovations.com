'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Get user with auth information
export async function getUserWithAuth(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { auth: true }
    });
    return user;
  } catch (error) {
    console.error('Error fetching user with auth:', error);
    throw new Error('Failed to fetch user data');
  }
}

// Create auth for a user
export async function createAuth(userId: string, email: string, password: string, userRole: string) {
  try {
    // Create auth data with type safety
    const authData: Prisma.AuthCreateInput = {
      user: { connect: { id: userId } },
      email,
      password,
      // Only set userRole if it's different from the default
      ...(userRole !== 'user' && { userRole }),
      status: 'active'
    };

    const auth = await prisma.auth.create({
      data: authData
    });
    
    // Revalidate the user page
    revalidatePath(`/admin/users/${userId}`);
    
    return { success: true, auth };
  } catch (error) {
    console.error('Error creating auth:', error);
    return { success: false, error: 'Failed to create authentication' };
  }
}

// Update auth
export async function updateAuth(authId: string, data: { email?: string; password?: string; userRole?: string; status?: string }) {
  try {
    // Create update data with type safety
    const updateData: Prisma.AuthUpdateInput = {};
    
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = data.password;
    if (data.userRole) updateData.userRole = data.userRole;
    if (data.status) updateData.status = data.status;
    
    const auth = await prisma.auth.update({
      where: { id: authId },
      data: updateData
    });
    
    // Get the userId to revalidate the correct path
    const userAuth = await prisma.auth.findUnique({
      where: { id: authId },
      select: { userId: true }
    });
    
    if (userAuth) {
      revalidatePath(`/admin/users/${userAuth.userId}`);
    }
    
    return { success: true, auth };
  } catch (error) {
    console.error('Error updating auth:', error);
    return { success: false, error: 'Failed to update authentication' };
  }
}

// Delete auth
export async function deleteAuth(authId: string) {
  try {
    // Get the userId before deleting to revalidate the correct path
    const userAuth = await prisma.auth.findUnique({
      where: { id: authId },
      select: { userId: true }
    });
    
    await prisma.auth.delete({
      where: { id: authId }
    });
    
    if (userAuth) {
      revalidatePath(`/admin/users/${userAuth.userId}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting auth:', error);
    return { success: false, error: 'Failed to delete authentication' };
  }
}