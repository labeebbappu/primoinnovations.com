import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/auth";

import { LoginForm } from "./LoginForm";

export default async function Login() {
  const authUser = await getAuthUser();

  if (authUser) {
    redirect("/admin/dashboard");
  }

  return (
    <div className=" ">
      <div className="">
      <LoginForm />
      </div>
    </div>
  );
}
