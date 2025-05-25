
import TopMenu from "@/app/admin/TopMenu";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/app/lib/auth";
import NewCategory from "./New";
import ListCategories from "./List";
import { getCategories } from "./actions";
import { PostCategory } from '@prisma/client';

export default async function PostCategoryPage() {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  const [categoriesData, error] = await getCategories();

  const categories: PostCategory[] = categoriesData || [];

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Post Category</h1>
        </div>

        <NewCategory />

        {error ? (
          <div key="error" className="text-red-500 mb-4">Error loading categories: {error.message}</div>
        ): null}

        <ListCategories categories={categories} />
      </div>
    </div>
  );
}
