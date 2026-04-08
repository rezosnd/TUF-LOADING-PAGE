"use client";
import React from "react";
import { ArrowRight, Ticket, Zap } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import Xarrow from "react-xarrows";

const customStrokeArrow = {
  svgElem: <path d="M 0 0 L 1 0.5 L 0 1" fill="none" stroke="var(--tuf-pink)" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" />,
  offsetForward: 1,
};

export default function CallToAction() {
  return (
    <section className="py-32 px-6 md:px-20 relative bg-[var(--background)] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24">
          <div className="font-marker text-[var(--tuf-pink)] text-xl mb-4 inline-block transform -rotate-2">
            ✨ CREATIVE EDGE
          </div>
          <p className="font-condensed text-gray-400 max-w-2xl text-lg md:text-xl">
            Didn’t stop at basics. Added smooth interactions, clean UI detailing, thoughtful spacing.
            Because good developers build features. <strong className="text-white">Great developers build experiences.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-12 items-center relative">
          
          <div className="relative">
            <h2 className="text-7xl md:text-8xl font-bebas text-white leading-[0.9]">
              HOW I
              <br />
              <span className="text-gray-500">BUILT IT &</span>
              <br />
              <Highlighter action="highlight" color="rgba(var(--tuf-pink-rgb), 0.2)" padding={4}>
                <span className="relative z-10 text-white px-1 inline-block mt-2">
                  <span id="contact-title-anchor" className="absolute top-[50%] right-[-5%] w-1 h-1 pointer-events-none hidden md:block" />
                  THINK
                </span>
              </Highlighter>
            </h2>

            <div className="hidden md:block z-50">
              <Xarrow
                start="contact-title-anchor"
                end="contact-btn-anchor"
                startAnchor="right"
                endAnchor="left"
                strokeWidth={3}
                color="var(--tuf-pink)"
                headSize={6}
                headShape={customStrokeArrow}
                path="smooth"
                curveness={0.8}
              />
            </div>
          </div>

          <div className="relative flex flex-col justify-center w-full max-w-sm mx-auto md:max-w-none md:ml-auto">
            <div className="font-marker text-[var(--tuf-pink)] text-center md:text-right mb-8 leading-relaxed transform rotate-1">
              THIS ISN'T JUST SUBMISSION. <br />
              <Highlighter action="underline" color="white" strokeWidth={2} padding={2}>
                <span className="text-white px-2">THIS IS ENTRY.</span>
              </Highlighter>
            </div>

            <div className="bg-[var(--tuf-black-light)] p-8 rounded-xl border border-gray-800 shadow-2xl flex flex-col gap-6 relative overflow-hidden group">
              <span id="contact-btn-anchor" className="absolute top-[30%] left-[0%] w-1 h-1 pointer-events-none hidden md:block z-10" />
              <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <button 
                onClick={() => window.location.href = '#'}
                className="w-full bg-[var(--tuf-pink)] text-black font-bebas px-8 py-4 text-2xl hover:bg-white transition-all duration-300 flex items-center justify-between group/btn shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
              >
                <span className="flex items-center gap-3">
                  <Ticket size={28} className="transform group-hover/btn:-rotate-12 transition-transform" />
                  VIEW GITHUB
                </span>
                <ArrowRight size={28} className="transform group-hover/btn:translate-x-2 transition-transform" />
              </button>

              <button 
                onClick={() => window.location.href = '#'}
                className="w-full bg-transparent border-2 border-gray-700 text-white font-bebas px-8 py-4 text-2xl hover:border-[var(--tuf-pink)] hover:text-[var(--tuf-pink)] transition-all duration-300 flex items-center justify-between group/btn2"
              >
                <span className="flex items-center gap-3">
                  <Zap size={28} className="opacity-50 group-hover/btn2:opacity-100 transition-opacity" />
                  VIEW DEMO
                </span>
              </button>

              <p className="text-center font-condensed text-gray-500 text-sm mt-2">
                I cant wait to join TUF and share the journey behind building this project. <br />
                It’s not just about the code, it’s about the passion, creativity, and problem-solving that went into it. <br />
                Let’s connect and talk about all things frontend!
              </p>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
