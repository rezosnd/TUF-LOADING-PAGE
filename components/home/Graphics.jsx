"use client";
import React from "react";


export const GrungeTexture = () => (
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  ></div>
);

export const TUFBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Abstract representation of TUF Globe/Arch */}
    <svg
      className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] opacity-20 text-tuf-green animate-pulse-slow"
      viewBox="0 0 500 500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="250" cy="250" r="200" />
      <circle cx="250" cy="250" r="150" strokeDasharray="10 20" />
      <path d="M50 250 H450" />
      <path d="M250 50 V450" />
      <circle
        cx="250"
        cy="250"
        r="50"
        fill="currentColor"
        className="opacity-10"
      />
    </svg>
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent"></div>
  </div>
);
