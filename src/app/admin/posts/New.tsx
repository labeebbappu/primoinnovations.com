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
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 space-y-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Post Title</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Blog URL</span>
        </label>
        <input
          type="text"
          value={blogUrl}
          onChange={(e) => setBlogUrl(e.target.value)}
          placeholder="Enter blog URL"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control w-full" data-color-mode="light">
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <MDEditor
          value={content}
          onChange={(val: string | undefined) => setContent(val || "")}
          preview="edit"
          height={400}
        />
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              Saving...
            </>
          ) : editingPost ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </button>
      </div>
    </form>
  );
}
