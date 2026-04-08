"use client";
import React from "react";
import { Menu, X } from "lucide-react";

export default function MobileHeader({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="md:hidden fixed top-0 w-full bg-[var(--background)] z-40 p-4 flex justify-between items-center border-b border-gray-800 mobile-header-animate mobile-header-breathe">
      <img
        src="/logo.avif"
        alt="TUF Logo"
        className="h-[2rem] w-auto object-contain drop-shadow-md"
      />
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  );
}


