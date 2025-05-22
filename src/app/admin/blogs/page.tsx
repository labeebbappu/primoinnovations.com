import TopMenu from "@/app/admin/TopMenu";

export default async function BlogPage() {
  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blogs</h1>
        </div>

        {/* blog list here  */}
      </div>
    </div>
  );
}
