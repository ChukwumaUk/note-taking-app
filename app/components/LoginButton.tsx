"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p className="font-bold">Welcome, {session.user?.name}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-blue-600 hover:text-gray-200 transition-colors"
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <Link
      href="/login"
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
    >
      Login
    </Link>
  );
}