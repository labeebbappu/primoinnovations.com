import { redirect } from "next/navigation";
import { getAuthUser } from "@/app/lib/auth";
import TopMenu from "@/app/admin/TopMenu";
import UserDetails from "./UserDetails";
import { AuthManage } from "./AuthManage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UserPage(props: { params: Promise<{ userId: string }> }) {

  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  const params = await props.params;
  const { userId } = params;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopMenu />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>

            <Button asChild variant="outline">
              <Link href="/admin/users">Back to Users</Link>
            </Button>
          </div>

          <div className="grid gap-6">
            <section className="">
              <UserDetails userId={userId} />
            </section>

            <section className="">
              <AuthManage userId={userId} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
