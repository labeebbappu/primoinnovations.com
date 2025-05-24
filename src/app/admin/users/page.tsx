import TopMenu from "@/app/admin/TopMenu";
import { getAuthUser } from "@/app/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "./actions";
import UserList from "./UserList";
import CreateUserForm from "./CreateUserForm";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  const [users, error] = await getUsers();

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="grid gap-6 mb-20">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          )}

          <Card className="shadow-sm bg-white overflow-hidden border-0">
            <CardHeader className="bg-blue-50 border-b px-6 py-5">
              <CardTitle className="text-xl text-blue-900">Create New User</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CreateUserForm />
            </CardContent>
          </Card>

          <UserList initialUsers={users || []} />
        </div>
      </div>
    </div>
  );
}
