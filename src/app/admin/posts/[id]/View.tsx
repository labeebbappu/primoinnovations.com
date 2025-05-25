'use client';

import { useEffect, useState } from 'react';
import { Post } from '@prisma/client';
import { getPost } from '../actions';
import ReactMarkdown from 'react-markdown';

export default function ViewPost({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const [fetchedPost, fetchError] = await getPost(id);
      if (fetchError) {
        setError(fetchError);
      } else {
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading post: {error.message}
      </div>
    );
  }

  if (!post) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <div className="text-sm text-gray-500">
        <p>Category: {post.postCategory || 'Uncategorized'}</p>
        <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
        <p>Status: {post.published ? 'Published' : 'Draft'}</p>
      </div>
    </div>
  );
}
