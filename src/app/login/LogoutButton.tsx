"use client";

import { logout } from "./actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <Button variant="outline" className={"cursor-pointer " + className} onClick={() => logout()}>
      Logout
    </Button>
  );
}
