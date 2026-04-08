"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Sidebar({ mobileMenuOpen }) {
  const navItems = [
    { label: "HOME", soon: false, path: "/" },
  ];
  return (
    <nav
      className={`fixed left-0 top-0 h-full w-80 bg-v5-sidebar z-50 transform transition-transform duration-300 border-r-4 border-black ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 flex flex-col overflow-y-auto`}
    >
      <div className="p-8 grow flex flex-col">
        {/* Logo / Header */}
        <Link
          href="/"
          className="mb-12 block group/logo transition-transform duration-500 hover:scale-105"
        >
          <img
            src="/logo.avif"
            alt="TUF Logo"
            className="w-full h-auto drop-shadow-[0_0_15px_rgba(219,48,99,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(219,48,99,0.5)] transition-all duration-500"
          />
        </Link>

        {/* Navigation Items */}
        <ul className="space-y-4 font-bebas text-4xl tracking-wide grow">
          {navItems.map((item, idx) => (
            <li key={item.label} className="group">
              <Link
                href={item.path}
                className={`block ${
                  item.soon
                    ? "cursor-not-allowed pointer-events-none opacity-60"
                    : "cursor-pointer"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="group-hover:translate-x-2 transition-transform duration-300 relative">
                    {item.label}
                    {item.soon && (
                      <span className="absolute -top-4 -left-4 text-xs font-marker -rotate-12 text-black bg-(--tuf-pink) px-2 py-0.5 rounded-sm leading-tight border border-black z-10">
                        COMING SOON
                      </span>
                    )}
                  </span>
                  <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-(--tuf-pink) transition-colors">
                    <ArrowRight
                      size={20}
                      className="transform -rotate-45 group-hover:rotate-0 transition-transform"
                    />
                  </div>
                </div>
              </Link>
              {/* Dashed Divider */}
              <div className="w-full h-1 border-b-2 border-dashed border-black/40"></div>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="mt-auto">
          {/* Auth Button */}
            <button
              onClick={() => (window.location.href = "/#")}
              className="w-full py-4 bg-(--tuf-pink) text-black font-marker text-2xl rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 border-2 border-black group cursor-pointer"
            >

              ENTER
            </button>
        </div>
      </div>
    </nav>
  );
}

