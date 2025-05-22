"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { login } from "./actions";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" >
      Login
    </Button>
  );
}

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <Card className="mx-auto max-w-md ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginAction}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue="contact@cosdensolutions.io"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" defaultValue="12345678" required />
            </div>

            
            <SubmitButton />

            <Link
              href="/intro/home"
              className="relative text-gray-700 hover:text-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
          </div>
        </form>
        {state?.errors?.email && (
          <p key="email-error" className="text-red-500">
            Email: {state.errors.email}
          </p>
        )}
        {state?.errors?.password && (
          <p key="password-error" className="text-red-500">
            Password: {state.errors.password}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
