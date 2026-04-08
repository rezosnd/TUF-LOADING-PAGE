"use client";
import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import VelocityScroll from "@/components/VelocityScroll";
import { GrungeTexture, TUFBackground } from "@/components/home/Graphics";
import Sidebar from "@/components/home/Sidebar";
import MobileHeader from "@/components/home/MobileHeader";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Manifesto from "@/components/home/Manifesto";
import GamePlan from "@/components/home/GamePlan";
import Contact from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Preloader from "@/components/Preloader";
import Xarrow, { Xwrapper } from "react-xarrows";

const customStrokeArrow = {
  svgElem: (
    <path
      d="M 0 0 L 1 0.5 L 0 1"
      fill="none"
      stroke="var(--tuf-pink)"
      strokeWidth="0.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  offsetForward: 1,
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-tuf-neon selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <GrungeTexture />
      <TUFBackground />

      <Sidebar mobileMenuOpen={mobileMenuOpen} />
      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Xwrapper>
        <main className="md:ml-80 pt-20 md:pt-0 relative z-10">
          <Hero />
          <Stats />

          <div className="hidden md:block">
            <Xarrow
              start="hero-scroll-down-text"
              end="stats-scroll-target"
              startAnchor="bottom"
              endAnchor="top"
              strokeWidth={5}
              color="var(--tuf-pink)"
              headSize={3.5}
              headShape={customStrokeArrow}
              path="smooth"
              curveness={0.3}
            />
          </div>

          <Manifesto />
          <GamePlan />

          <div className="overflow-hidden relative z-20 mt-16 text-(--tuf-pink) font-marker">
            <VelocityScroll defaultVelocity={2} />
          </div>

          <Contact />
          <Footer />
        </main>
      </Xwrapper>
    </div>
  );
}
