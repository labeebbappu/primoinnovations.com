import TopMenu from "@/app/admin/TopMenu";
import UserDetails from "./UserDetails";
import { AuthManage } from "./AuthManage";

export default async function UserPage(props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const { userId } = params;

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        {/* user list here  */}
        <UserDetails userId={userId} />
        <AuthManage userId={userId} />

        <div className="h-64" >
    
        </div>
      </div>
    </div>
  );
}
