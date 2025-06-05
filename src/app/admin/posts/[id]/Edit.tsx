'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@prisma/client';
import { getPost, updatePost, deletePost } from '../actions';

export default function EditPost({ id }: { id: string }) {
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    blogUrl: '',
    content: '',
    postCategory: '',
    published: false
  });

  useEffect(() => {
    const fetchPost = async () => {
      const [fetchedPost, fetchError] = await getPost(id);
      if (fetchError) {
        setError(fetchError);
      } else if (fetchedPost) {
        setPost(fetchedPost);
        setFormData({
          title: fetchedPost.title,
          blogUrl: fetchedPost.blogUrl || '',
          content: fetchedPost.content || '',
          postCategory: fetchedPost.postCategory ?? '',
          published: fetchedPost.published
        });
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const [, updateError] = await updatePost(id, formData);
    
    if (updateError) {
      setError(updateError);
    } else {
      router.push('/admin/posts');
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsLoading(true);
      const [, deleteError] = await deletePost(id);
      
      if (deleteError) {
        setError(deleteError);
      } else {
        router.push('/admin/posts');
      }
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error: {error.message}</span>
      </div>
    );
  }

  if (!post) {
    return <div className="flex justify-center items-center min-h-[200px]">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Blog URL</span>
          </label>
          <input
            type="text"
            id="blogUrl"
            value={formData.blogUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, blogUrl: e.target.value }))}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Content (Markdown)</span>
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={10}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            id="category"
            value={formData.postCategory}
            onChange={(e) => setFormData(prev => ({ ...prev, postCategory: e.target.value }))}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Published</span>
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>

        <div className="flex justify-between pt-4 gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary flex-1"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="btn btn-outline flex-1"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Deleting...
              </>
            ) : (
              'Delete Post'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
