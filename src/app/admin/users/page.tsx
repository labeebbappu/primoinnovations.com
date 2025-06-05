import TopMenu from "@/app/admin/TopMenu";
import { getAuthUser } from "@/app/lib/auth";
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
            <div className="alert alert-error">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          )}

          <div className="card bg-base-100 shadow-sm">
            <div className="card-header border-b px-6 py-5">
              <h3 className="card-title text-xl ">Create New User</h3>
            </div>
            <div className="card-body p-6">
              <CreateUserForm />
            </div>
          </div>

          <UserList initialUsers={users || []} />
        </div>
      </div>
    </div>
  );
}
