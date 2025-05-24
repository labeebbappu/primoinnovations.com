import TopMenu from "@/app/admin/TopMenu";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/app/lib/auth";
import Link from "next/link";

export default async function PostPage() {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">posts </h1>
        </div>
        <div className="">
          <Link
            href="/admin/posts/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Post
          </Link>
          <Link
            href="/admin/post-category"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Posts Categories
          </Link>
        </div>

        {/*  PostManage here  */}
      </div>
    </div>
  );
}
