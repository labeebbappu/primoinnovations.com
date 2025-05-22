"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AuthCardProps = {
  title?: string;
  children: ReactNode;
};

export function AuthCard({ title = "Authentication Management", children }: AuthCardProps) {
  return (
    <Card className="mt-4 shadow-sm bg-white border-0">
      <CardHeader className="bg-blue-50 border-b px-6 py-5">
        <CardTitle className="text-xl text-blue-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">{children}</CardContent>
    </Card>
  );
}

export function LoadingState() {
  return (
    <AuthCard>
      <p>Loading...</p>
    </AuthCard>
  );
}

export function ErrorState() {
  return (
    <AuthCard>
      <p>User not found</p>
    </AuthCard>
  );
}