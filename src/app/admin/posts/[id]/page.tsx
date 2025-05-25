import { redirect } from "next/navigation";
import TopMenu from "@/app/admin/TopMenu";
import { getAuthUser } from "@/app/lib/auth";
import PostPageClient from "./PostPageClient";
import Link from "next/link";

export default async function UserPage(props: { params: Promise<{ id: string }> }) {
  const authUser = await getAuthUser();

  if (!authUser) {
    redirect("/login");
  }

  const params = await props.params;
  const { id } = params;

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Posts </h1>
        </div>
        <div className="flex mb-4">
          <Link
            href="/admin/posts"
            className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
             Posts
          </Link>

          <Link
            href="/admin/post-category"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Posts Categories
          </Link>
        </div>

        <PostPageClient id={id} />
      </div>
    </div>
  );
}
