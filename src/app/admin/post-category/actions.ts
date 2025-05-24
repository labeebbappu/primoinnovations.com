'use server';

import { revalidatePath } from 'next/cache';
import prisma from "@/lib/prisma";
import { PostCategory } from '@prisma/client';
import { ActionResponse } from '@/app/types/server-action-types';

export async function getCategories(): ActionResponse<PostCategory[]> {
  try {
    const categories = await prisma.postCategory.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return [categories, null];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [null, error instanceof Error ? error : new Error('Failed to fetch categories')];
  }
}


export async function createCategory(name: string): ActionResponse<PostCategory> {
  try {
    // Check if category with same name exists
    const existingCategory = await prisma.postCategory.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    });

    if (existingCategory) {
      return [null, new Error('A category with this name already exists')];
    }

    const category = await prisma.postCategory.create({
      data: { name },
    });
    revalidatePath('/admin/post-category');
    return [category, null];
  } catch (error) {
    console.error('Error creating category:', error);
    return [null, error instanceof Error ? error : new Error('Failed to create category')];
  }
}

export async function deleteCategory(id: string): ActionResponse<PostCategory> {
  try {
    const category = await prisma.postCategory.delete({
      where: { id },
    });
    revalidatePath('/admin/post-category');
    return [category, null];
  } catch (error) {
    console.error('Error deleting category:', error);
    return [null, error instanceof Error ? error : new Error('Failed to delete category')];
  }
}
