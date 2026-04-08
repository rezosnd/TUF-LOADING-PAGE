"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

function isServer() {
  return typeof window === "undefined";
}

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function VelocityScroll({ defaultVelocity = 3, className }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * defaultVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap items-center bg-white py-4 border-y-4 border-black transform -rotate-1 scale-100">
      <motion.div
        className="font-bebas text-[8vw] leading-none font-black text-black flex whitespace-nowrap uppercase tracking-widest"
        style={{ x }}
      >
        <span className="block mr-16">TUF I AM COMMING✌️</span>
        <span className="block mr-16">TUF I AM COMMING✌️</span>
        <span className="block mr-16">TUF I AM COMMING✌️</span>
        <span className="block mr-16">TUF I AM COMMING✌️</span>
        <span className="block mr-16">TUF I AM COMMING✌️</span>
        <span className="block mr-16">TUF I AM COMMING✌️</span>
      </motion.div>
    </div>
  );
}
