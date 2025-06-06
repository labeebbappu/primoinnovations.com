import { Post, User } from '@prisma/client';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

type PostWithAuthor = Post & {
  author: User;
};

interface RecentPostsProps {
  posts: PostWithAuthor[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Recent Blog Posts</h2>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                {!post.published && (
                  <span className="px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    Draft
                  </span>
                )}
              </div>
              
              <div className="prose prose-sm text-gray-600 mb-4">
                {post.content?.slice(0, 200)}
                {post.content && post.content.length > 200 ? '...' : ''}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span>By {post.author.name || post.author.email}</span>
                  <span>•</span>
                  <time dateTime={post.createdAt.toISOString()}>
                    {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
                  </time>
                </div>
                <Link 
                  href={`/blog/${post.blogUrl || post.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 