import TopMenu from "@/app/admin/TopMenu";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/app/lib/auth";
import Link from "next/link";
import PostManage from "./PostManage";
import { getPosts } from "./actions";

export default async function PostPage() {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  const [posts, postError] = await getPosts();

  const error = postError;

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Posts </h1>
        </div>
        <div className="flex mb-4">
          <Link href="/admin/posts/new" 
          className="btn btn-primary btn-outline">
            Create Posts
          </Link>

          <Link
            href="/admin/post-category"
            className="btn btn-primary btn-outline ml-2">
          
            Posts Categories
          </Link>
        </div>

        {error && <div className="text-red-500">{error?.message || " "}</div>}

        <PostManage posts={posts || []} />
      </div>
    </div>
  );
}
