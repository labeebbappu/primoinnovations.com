import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET ?? "fallback_secret_key_for_development";
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string, fullName: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt, fullName });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

// updated session
export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // expires in 7 days
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type SessionPayload = {
  fullName: string;
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("Failed to verify session");
    return null;
  }
}

export async function getAuthUser() {
  // const cookie = (await cookies()).get("session")?.value;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session");

  if (!sessionToken || !sessionToken.value) {
    return null;
  }

  const session = await decrypt(sessionToken?.value);

  const userId = session?.userId;
  if (!userId || typeof userId !== "string") {
    return null;
  }

  const fullName = session?.fullName;
  if (fullName || typeof fullName !== "string") {
    return null;
  }


  return {
    userId,
    fullName: fullName ?? "",
    expiresAt: session.expiresAt,
  }
}
