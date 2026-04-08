"use client";
import React from "react";
import Link from "next/link";
import { GrungeTexture } from "@/components/home/Graphics";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[var(--tuf-pink)] selection:text-black relative overflow-hidden flex flex-col items-center justify-center p-6">
      <GrungeTexture />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, var(--tuf-pink) 1px, var(--tuf-pink) 2px)",
        }}
      />

      <div className="relative z-10 text-center">
        <h1 className="text-[20vw] leading-none font-bebas text-[var(--tuf-pink)] opacity-90 select-none mix-blend-screen relative">
          404
          <span
            className="absolute top-0 left-1 text-[var(--tuf-red-dark)] opacity-50 mix-blend-multiply animate-pulse"
            style={{ animationDuration: "0.2s" }}
          >
            404
          </span>
          <span
            className="absolute top-0 -left-1 text-white opacity-50 mix-blend-color-dodge animate-pulse"
            style={{ animationDuration: "0.3s" }}
          >
            404
          </span>
        </h1>

        <div className="relative inline-block mt-[-2vw]">
          <div className="bg-[var(--tuf-pink)] text-black font-marker text-xl md:text-3xl px-4 py-1 transform -rotate-2">
            LOST IN THE HYPE?
          </div>
        </div>

        <p className="font-condensed text-gray-400 mt-8 max-w-md mx-auto text-lg uppercase tracking-wider">
          The page you are looking for does not exist or has been moved to
          another dimension.
        </p>

        <div className="mt-12">
          <Link href="/">
            <button className="bg-transparent border-2 border-[var(--tuf-pink)] text-[var(--tuf-pink)] hover:bg-[var(--tuf-pink)] hover:text-black px-8 py-3 font-bebas text-2xl transition-all duration-300 hover:scale-105 active:scale-95">
              RETURN HOME
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}
