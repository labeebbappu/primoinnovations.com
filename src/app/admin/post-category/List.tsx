"use client";

import { PostCategory } from "@prisma/client";
import { deleteCategory } from "./actions";
import { toast } from "sonner";

type ListCategoriesProps = {
  categories: PostCategory[];
};

export default function ListCategories({ categories }: ListCategoriesProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const [categoryData, error] = await deleteCategory(id);
    if (error || !categoryData) {
      toast.error(error?.message || "Failed to delete category");
      return;
    }
    toast.success("Category deleted successfully");
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{new Date(category.createdAt).toLocaleDateString()}</td>
              <td>
                <button 
                  onClick={() => handleDelete(category.id)} 
                  className="btn btn-outline btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
