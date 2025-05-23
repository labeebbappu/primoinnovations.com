"use server";

import { z } from "zod";
import { createSession, deleteSession, updateSession } from "../lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const auth = await prisma.auth.findUnique({
    where: { email },
    include: { user: true }
  });

  if (!auth || auth.password !== password || auth.status !== "active") {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(auth.userId);

  redirect("/admin/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function updateSessionAction() {
  await updateSession();
}
