"use client";
import React from "react";
import { Highlighter } from "@/components/ui/highlighter";
import Xarrow from "react-xarrows";

const customStrokeArrow = {
  svgElem: <path d="M 0 0 L 1 0.5 L 0 1" fill="none" stroke="#ffffff" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" />,
  offsetForward: 1,
};

export default function Manifesto() {
  return (
    <section className="py-32 px-6 md:px-20 text-center relative">
      <div className="max-w-3xl mx-auto">
        <div className="font-marker text-[var(--tuf-pink)] text-xl md:text-2xl mb-6 transform -rotate-2 inline-block">
          "FRONTEND ENGINEERING{" "}
          <span className="inline-block mx-1">
            <Highlighter action="circle" color="var(--tuf-pink)" padding={8} strokeWidth={2}>
              CHALLENGE
            </Highlighter>
          </span>
          "
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mb-4 mt-8">
          <span className="font-condensed text-gray-300 max-w-2xl text-lg md:text-2xl tracking-wide">
            Rehan Suman — Not just building... arriving.<br/>
            <strong className="text-[var(--tuf-pink)] mt-2 block font-bebas text-3xl">TUF INTERN IS COMING. WAIT FOR ME.</strong>
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bebas uppercase text-gray-100 leading-none mb-4">
          <div className="hidden md:block">
            Wall Calendar <span className="text-[var(--tuf-pink)] inline">Aesthetic</span>
            <br />
            <span className="text-gray-500">Day Range </span>Selector
            <br />
            Integrated <span className="text-[var(--tuf-pink)]">Notes Section</span>
            <br />
            <span className="text-gray-400">Fully Responsive </span>Design
          </div>

          <div className="flex flex-col md:hidden gap-1 text-2xl">
            <span className="text-gray-200">Wall Calendar</span>
            <span className="text-[var(--tuf-pink)]">Aesthetic</span>
            <span className="text-gray-500">Day Range Selector</span>
            <span className="text-gray-400">Notes & Responsive</span>
          </div>
        </h2>

        <div className="mt-8 flex justify-end transform -rotate-6">
          <span className="font-marker text-[var(--tuf-pink)] text-xl">
            ✨ CREATIVE LIBERTY (STAND OUT!)
          </span>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <div id="manifesto-btn-container" className="relative group cursor-pointer inline-block">
            <span id="manifesto-btn-anchor" className="absolute top-[100%] left-[9%] w-1 h-1 pointer-events-none hidden md:block" />
            <div className="absolute inset-0 bg-neon blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <button 
              id="manifesto-btn"
              onClick={() => document.getElementById("gameplan")?.scrollIntoView({ behavior: "smooth" })}
              className="relative px-8 py-3 bg-neon text-black font-bebas text-xl tracking-wide rounded-sm hover:scale-105 transition-transform w-full"
            >
              FIND OUT HOW IT STARTS
            </button>
          </div>

          <div className="mt-16 opacity-100 relative inline-block">
            <span id="manifesto-logo-anchor" className="absolute top-[50%] left-[-10%] w-1 h-1 pointer-events-none hidden md:block" />
            <img src="/logo.avif" alt="Logo" className="w-28 h-auto mx-auto" />
          </div>
        </div>
      </div>

      <div className="hidden md:block z-50">
        <Xarrow
          start="manifesto-logo-anchor"
          end="manifesto-btn-anchor"
          startAnchor="left"
          endAnchor="bottom"
          strokeWidth={2}
          color="#ffffff"
          headSize={6}
          headShape={customStrokeArrow}
          path="smooth"
          curveness={1}
        />
      </div>
    </section>
  );
}

