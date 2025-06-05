"use client";

import { useEffect, useState } from "react";
import { Post, PostCategory } from "@prisma/client";
import { createPost, updatePost } from "./actions";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import type { MDEditorProps } from "@uiw/react-md-editor";
import { titleToUrl } from "./helps";


const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), { ssr: false });

type NewProps = {
  categories: PostCategory[];
  currentId: string;
  editingPost?: Post | null;
  onCancel?: () => void | null;
};

export default function New({ categories, currentId, editingPost, onCancel }: NewProps) {

  const [title, setTitle] = useState(editingPost?.title || "");
  const [content, setContent] = useState(editingPost?.content || "");
  const [category, setCategory] = useState(editingPost?.postCategory || "");
  const [blogUrl, setBlogUrl] = useState(editingPost?.blogUrl || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingPost) {
        const [post, error] = await updatePost(editingPost.id, {
          title,
          content,
          postCategory: category || undefined,
        });

        if (error || !post) {
          toast.error(error?.message || "Failed to update post");
          return;
        }

        toast.success("Post updated successfully");
      } else {
        const [post, error] = await createPost({
          title,
          content,
          postCategory: category || undefined,
          authorId: currentId,
        });

        if (error || !post) {
          toast.error(error?.message || "Failed to create post");
          return;
        }
        toast.success("Post created successfully");
      }

      if (onCancel) {
        onCancel();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (title) {
      setBlogUrl(titleToUrl(title));
    }
  }, [title]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={blogUrl}
        onChange={(e) => setBlogUrl(e.target.value)}
        placeholder="blog url"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <div data-color-mode="light">
        <MDEditor
          value={content}
          onChange={(val: string | undefined) => setContent(val || "")}
          preview="edit"
          height={400}
        />
      </div>
      <div className="space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
