"use server";
import { cookies } from "next/headers";
import * as jose from "jose";

const authTokenName = "next-auth.session-token";

export const checkCookie = async () => {
  const authCookie = cookies().get(authTokenName);
  if (!authCookie) return false;

  // Validation of the cookie
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
  const jwt = authCookie.value;

  try {
    await jose.jwtVerify(jwt, secret, {});
    return true;
  } catch (err) {
    return false;
  }
};
