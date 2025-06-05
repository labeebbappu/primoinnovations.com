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
          className="input input-bordered flex-1"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary "
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              Adding...
            </>
          ) : (
            "Add Category"
          )}
        </button>
      </div>
    </form>
  );
}
