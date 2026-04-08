"use client";
import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";
import { motion, useScroll, useTransform } from "motion/react";

const customStrokeArrow = {
  svgElem: <path d="M 0 0 L 1 0.5 L 0 1" fill="none" stroke="var(--tuf-pink)" strokeWidth="0.15" strokeLinecap="round" strokeLinejoin="round" />,
  offsetForward: 1,
};

const steps = [
  {
    title: "AESTHETIC",
    subtitle: "STEP #1: Wall Calendar",
    content: "A UI that actually looks like a calendar you’d want to use. Balanced layout + hero section = clean & aesthetic.",
  },
  {
    title: "RANGE SELECT",
    subtitle: "STEP #2: Selector",
    content: "Select start → end dates smoothly. Clear highlights. No confusion. No chaos. Because users shouldn’t have to “figure it out.”",
  },
  {
    title: "NOTES",
    subtitle: "STEP #3: Notes Area",
    content: "Because memory is unreliable 😭. Add notes for the month or attach them to specific dates. Basically… your life, slightly more organized.",
  },
  {
    title: "RESPONSIVE",
    subtitle: "STEP #4: Mobile & Desktop",
    content: "Desktop → structured & clean. Mobile → smooth & touch-friendly. No broken layouts. No compromises.",
  },
];

const StepCard = ({ step, index, totalSteps, scrollYProgress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  const buffer = 0.1;
  const isFirst = index === 0;
  const isLast = index === totalSteps - 1;

  const opacity = useTransform(
    scrollYProgress,
    isFirst 
      ? [0, end - buffer, end] 
      : isLast 
        ? [start, start + buffer, 1] 
        : [start, start + buffer, end - buffer, end],
    isFirst 
      ? [1, 1, 0] 
      : isLast 
        ? [0, 1, 1] 
        : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    isFirst 
      ? [0, end] 
      : [start, end],
    isFirst 
      ? [1, 0.8] 
      : [0.8, 1]
  );
  const zIndex = useTransform(opacity, v => v > 0 ? 10 + index : index);
  const pointerEvents = useTransform(opacity, v => v > 0.5 ? "auto" : "none");

  return (
    <motion.div
      style={{ opacity, scale, zIndex }}
      className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none"
    >
      <motion.div 
        style={{ pointerEvents }}
        className="w-full max-w-lg border border-v5-sidebar/30 bg-[var(--tuf-black-light)] p-8 md:p-12 rounded-xl relative overflow-hidden group hover:border-v5-sidebar transition-colors shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 font-bebas text-9xl text-white select-none pointer-events-none">
          {index + 1}
        </div>
        
        <div className="font-marker text-neon mb-4 text-2xl transform -rotate-1 inline-block">
          {step.subtitle}
        </div>
        
        <h3 className="text-5xl md:text-7xl font-bebas text-white mb-6 leading-none">
          {step.title}
        </h3>
        
        <div className="mb-8">
          <p className={`font-condensed text-gray-400 text-lg md:text-xl max-w-md leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {step.content}
          </p>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-neon text-black px-6 py-2 font-condensed text-sm font-bold uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none w-max"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function GamePlan() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="gameplan" ref={containerRef} className="relative h-[400vh] bg-[var(--background)]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center md:items-start px-6 md:px-20 bg-[var(--background)] z-10 border-b md:border-b-0 md:border-r border-gray-800 relative">
           <div className="relative">
              <h2 className="text-5xl md:text-7xl font-bebas leading-[0.85] text-gray-200">
                NOT JUST
                <br />
                CODE THAT
                <br />
                RUNS. CODE
                <br />
                <span className="text-[var(--tuf-pink)]">THAT MAKES</span>
                <br />
                <span className="text-white relative inline-block">
                  <span id="gameplan-title-anchor" className="absolute top-[50%] right-[-5%] w-1 h-1 pointer-events-none hidden md:block" />
                  SENSE.
                </span>
              </h2>
              <div className="hidden md:block z-50">
                <Xarrow
                  start="gameplan-title-anchor"
                  end="gameplan-cards-container"
                  startAnchor="right"
                  endAnchor="left"
                  strokeWidth={3}
                  color="var(--tuf-pink)"
                  headSize={6}
                  headShape={customStrokeArrow}
                  path="smooth"
                  curveness={0.5}
                />
              </div>
           </div>
        </div>

        <div id="gameplan-cards-container" className="md:w-1/2 h-1/2 md:h-full bg-[var(--background)] relative flex items-center justify-center p-6 md:p-20">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              step={step} 
              index={index} 
              totalSteps={steps.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
