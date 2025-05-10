import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/auth";
// import { updateSessionAction } from "../login/actions";

import LogoutButton from "../login/LogoutButton";
import SessionUpdater from "../login/SessionUpdater";

export default async function Dashboard() {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  // await updateSessionAction();

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />

      <pre>
        <code>{JSON.stringify(authUser, null, 2)}</code>
      </pre>
      <SessionUpdater />
    </div>
  );
}
