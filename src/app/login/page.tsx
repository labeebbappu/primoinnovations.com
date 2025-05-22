import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/auth";

import { LoginForm } from "./LoginForm";

export default async function Login() {
  const authUser = await getAuthUser();

  if (authUser) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen ">
      <div className=" mt-48">
      <LoginForm />
      </div>
    </div>
  );
}
