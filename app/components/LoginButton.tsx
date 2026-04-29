"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <p className="font-bold">Welcome, {session.user?.name}</p>
                <button onClick={() => signOut()} className="bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-blue-600 hover:text-gray-200 transition-colors">Logout</button>
            </>
        );
    }

    return (
        <button onClick={() => signIn('github')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Login In with GitHub
        </button>
    );
}