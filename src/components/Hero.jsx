"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <header className="relative min-h-[90vh] flex flex-col justify-center pt-24 overflow-hidden bg-[#110e07]">
      {/* Background Image & Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Luxury Car"
          className="w-full h-full object-cover opacity-100 contrast-[1.15] saturate-[1.3]"
          src="/luxury_hero_car.png"
        />
        {/* Unique Color Grading Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#f2ca50]/10 via-transparent to-[#16130b]/20 mix-blend-overlay"></div>
        {/* Dark gradient from left to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#110e07] via-[#110e07]/50 to-transparent"></div>
        {/* Dark gradient from bottom to blend with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#110e07] via-[#110e07]/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="font-[family-name:var(--font-heading)] text-[56px] md:text-[72px] font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Drive Your <span className="text-[#f2ca50]">Dream</span><br />Today
          </h1>
          <p className="font-[family-name:var(--font-body)] text-white/80 text-[16px] md:text-[17px] mb-10 leading-relaxed max-w-lg">
            Experience the pinnacle of automotive engineering. From high-performance supercars to executive luxury sedans, our curated fleet is ready for your next journey.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/cars" className="bg-[#f2ca50] text-[#16130b] font-[family-name:var(--font-body)] font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#ffe088] transition-colors inline-block">
              Explore Cars
            </Link>
            <Link href="/cars" className="bg-transparent border border-white/20 text-white font-[family-name:var(--font-body)] font-medium text-[15px] px-8 py-3 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm inline-block">
              View Fleet
            </Link>
          </div>
        </motion.div>

        {/* Search Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[850px] bg-[#1a1814]/90 backdrop-blur-md border border-white/10 rounded-[40px] p-2 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex-1 w-full flex flex-col md:flex-row">
            {/* Pick-up */}
            <div className="flex-1 px-8 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider mb-1 font-[family-name:var(--font-body)]">Pick-Up</div>
              <div className="text-white text-[15px] font-semibold font-[family-name:var(--font-body)]">Los Angeles, CA</div>
            </div>

            {/* Drop-off */}
            <div className="flex-1 px-8 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider mb-1 font-[family-name:var(--font-body)]">Drop-Off</div>
              <div className="text-white text-[15px] font-semibold font-[family-name:var(--font-body)]">Oct 24 - Oct 28</div>
            </div>

            {/* Car Type */}
            <div className="flex-1 px-8 py-3">
              <div className="text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider mb-1 font-[family-name:var(--font-body)]">Car Type</div>
              <div className="text-white text-[15px] font-semibold font-[family-name:var(--font-body)]">Luxury Sports</div>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-14 h-14 shrink-0 bg-[#f2ca50] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform mr-1 mt-4 md:mt-0">
            <span className="material-symbols-outlined text-[#16130b] font-bold text-[24px]">search</span>
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
