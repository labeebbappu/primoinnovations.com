import { redirect } from "next/navigation";
import { getAuthUser } from "@/app/lib/auth";

// import SessionUpdater from "../login/SessionUpdater";
import TopMenu from "@/app/admin/TopMenu";
import SessionCountDownTimer from "./SessionCountDownTimer";

export default async function Dashboard() {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  // await updateSessionAction();

  const authUserName = authUser?.fullName || "No Name";

  // Convert expiresAt to a string if it exists
  const expiresAtString = authUser.expiresAt ? authUser.expiresAt.toString() : "";

  return (
    <div className="pt-20">
      <TopMenu />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {expiresAtString && (
            <div className="min-w-60">
              <SessionCountDownTimer expiresAt={expiresAtString} />
            </div>
          )}
        </div>

        <p>Welcome {authUserName}</p>

        <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
          <code>{JSON.stringify(authUser, null, 2)}</code>
        </pre>
        {/* <SessionUpdater /> */}
      </div>
    </div>
  );
}
