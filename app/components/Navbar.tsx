"use client";

import Link from "next/link";
import { useState } from "react";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">NoteApp</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <LoginButton />
        </div>

        {/* Mobile Toggle */}
        <button
            className="md:hidden text-2xl transition"
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <LoginButton />
        </div>
      )}
    </nav>
  );
}