"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 600); 

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative flex flex-col items-center">
        <motion.h1
          className="text-[25vw] leading-none font-bebas text-[var(--tuf-pink)] select-none tracking-[0.1em]"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {count}%
        </motion.h1>

        <motion.div
          className="absolute -bottom-10 md:-bottom-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="font-marker text-white/50 text-sm md:text-3xl tracking-widest md:tracking-[0.3em] animate-pulse whitespace-nowrap">
            .....TUF I AM COMING.........
          </span>
          <div className="w-48 md:w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-[var(--tuf-pink)]"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      </div>

      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-[-1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
};

export default Preloader;
