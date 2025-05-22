import TopMenu from "@/app/admin/TopMenu";
import { getUsers } from "./actions";
import UserList from "./UserList";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        {/* user list here  */}
        <UserList initialUsers={users} />
      </div>
    </div>
  );
}
