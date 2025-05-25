"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createCategory } from "./actions";

export default function NewCategory() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const [categoryData, error] = await createCategory(name);
    if (error || !categoryData) {
      toast.error(error?.message || "Failed to create category");
      return;
    }
    setName("");
    toast.success("Category created successfully");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Adding..." : "Add Category"}
        </button>
      </div>
    </form>
  );
}
