import TopMenu from "@/app/admin/TopMenu";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/app/lib/auth";
import New from "../New";
import { getCategories } from "../../post-category/actions";

export default async function PostPage() {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  const [categories, categoryError] = await getCategories();

  const error = categoryError;

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">posts </h1>
        </div>

        {error && <div className="text-red-500">{error?.message || " "}</div>}

        <New categories={categories || []} currentId={authUser.userId || ""} editingPost={null} />
      </div>
    </div>
  );
}
