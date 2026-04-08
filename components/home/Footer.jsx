"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <Link
        href="/developers"
        className="block bg-background py-4 text-center border-b border-white/5 group/excellence cursor-pointer"
      >
        <p className="font-marker text-gray-500 group-hover/excellence:text-white transition-all text-xl md:text-2xl transform -rotate-1 tracking-wider">
          *Frontend Engineering Challenge, Component Excellence.
        </p>
      </Link>

      <footer className="bg-(--tuf-red-dark) text-white pt-20 pb-8 px-6 md:px-20 overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-bebas text-3xl mb-6">THANKYOU ❤️</h3>
            <div className="font-marker text-white text-2xl mb-4 transform -rotate-1 text-[var(--tuf-pink)]">
              Rehan Suman isn’t coming quietly.<br/>He’s coming prepared.
            </div>
            <div className="font-marker text-white text-xl mb-4 mt-6 transform -rotate-2">
              DEFY THE SYSTEM. MAKE YOUR MARK.
            </div>
            <p className="font-condensed max-w-sm mb-8 text-gray-300">
              Built with passion, energy, and a mindset to stand out.
            </p>

            <div className="flex gap-8 mt-12 mb-12 md:mb-0 items-center">
              <Link
                href="https://www.instagram.com/r_e_z_o_s_nd"
                target="_blank"
                rel="noopener noreferrer"
                className="font-marker text-3xl hover:text-[var(--tuf-pink)] transition-colors transform -rotate-2"
                aria-label="Instagram"
              >
                IG
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-8 text-sm font-condensed text-gray-200">
              <div>
                <h4 className="font-bold mb-2 uppercase text-white">UPCOMING TUF INTERN</h4>
                <p>REHAN SUMAN</p>
                <p>TUF</p>
                <p>BBSR</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 uppercase text-white">Contact</h4>
                <p>Phone: 8709442363</p>
                <p>Email: rehansuman41008@gmail.com</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-8 justify-center items-center mt-12 pt-0 w-full col-span-2">
              <Link
                href="https://takeuforward.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/logo.avif"
                  alt="Take You Forward Logo"
                  className="h-16 md:h-20 w-auto object-contain transform -rotate-2 hover:scale-105 transition-transform"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/logo.avif'; }}
                />
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-black border-opacity-20 flex justify-between font-condensed text-xs uppercase w-full">
              <Link
                href="/privacy"
                className="hover:text-[#a3b3c3] transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#a3b3c3] transition-colors cursor-pointer"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/coming-soon"
                className="hover:text-[#a3b3c3] transition-colors cursor-pointer"
              >
                2026 Rehan Suman
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}


