import TopMenu from "@/app/admin/TopMenu";
import { getUsers } from "./actions";
import UserList from "./UserList";
import CreateUserForm from "./CreateUserForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="grid gap-6">
          <Card className="shadow-sm bg-white overflow-hidden border-0">
            <CardHeader className="bg-blue-50 border-b px-6 py-5">
              <CardTitle className="text-xl text-blue-900">Create New User</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CreateUserForm />
            </CardContent>
          </Card>

          <UserList initialUsers={users} />
        </div>
      </div>
    </div>
  );
}
