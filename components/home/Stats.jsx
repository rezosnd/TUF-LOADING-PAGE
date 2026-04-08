"use client";
import React from "react";
import { Highlighter } from "@/components/ui/highlighter";
import Xarrow from "react-xarrows";

const customStrokeArrow = {
  svgElem: <path d="M 0 0 L 1 0.5 L 0 1" fill="none" stroke="var(--tuf-pink)" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" />,
  offsetForward: 1,
};

export default function Stats() {
  return (
    <section className="py-24 px-6 md:px-20 bg-[var(--background)] relative overflow-hidden">
      <div id="stats-scroll-target" className="absolute top-32 right-16 w-1 h-1" />

      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="text-[150px] md:text-[200px] leading-none font-bebas text-gray-200 flex items-baseline gap-1">
            <span>4</span>
            <span className="font-bebas text-8xl text-[var(--tuf-pink)] font-bold ml-2 leading-none">+</span>
            <span className="relative z-10 flex items-center">
              <span id="stats-plus" className="absolute top-[18%] left-[50%] w-1 h-1 pointer-events-none hidden md:block" />
            </span>
          </div>
          <div className="flex flex-col relative">
            <div className="absolute -left-16 top-2 opacity-80 hidden md:block z-10">
              <Xarrow
                start="stats-plus"
                end="stats-event-e"
                startAnchor="top"
                endAnchor="left"
                strokeWidth={3}
                color="var(--tuf-pink)"
                headSize={6}
                headShape={customStrokeArrow}
                path="smooth"
                curveness={0.8}
              />
            </div>
            <h2 className="text-5xl md:text-1xl font-bebas uppercase leading-[0.9] mt-4 md:mt-0">
              <span className="relative">
                <span id="stats-event-e">C</span>ore
              </span>
              <br />
              Requirement
              <br />
              Features
            </h2>
            <div className="self-end mt-4 transform -rotate-3 relative z-10">
              <Highlighter action="underline" color="var(--tuf-pink)" strokeWidth={3} padding={5}>
                <span className="font-marker text-[var(--tuf-pink)] text-3xl px-2">
                  INTERACTIVE!
                </span>
              </Highlighter>
            </div>
          </div>
        </div>

        <p className="mt-12 text-gray-400 font-condensed max-w-lg mx-auto text-center border-t border-gray-100 pt-6 text-lg">
          “This isn’t just a calendar component.<br/><br/>
          It’s a mix of: Clean UI, Smart logic, Late-night debugging, and that one moment when everything finally works 😮‍💨<br/><br/>
          I didn’t just follow instructions…<br/>
          I turned a static idea into a <strong className="text-white">real, usable experience.</strong>
        </p>
      </div>
    </section>
  );
}


