import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/auth";

import { LoginForm } from "./LoginForm";

export default function Login() {

  const authUser = getAuthUser();
  
  if (!authUser) {
    redirect("/login");
  }


  return (
    <div className="min-h-screen flex items-center justify-center " >
      <LoginForm />
    </div>
  );
}
