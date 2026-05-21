"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <header className="relative min-h-[90vh] flex flex-col justify-center pt-24 overflow-hidden bg-[#110e07]">
      {/* Background Image & Gradients */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Porsche 911" 
          className="w-full h-full object-cover opacity-80" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkDMxKGktfUETX4bnp4FPhlVMdrklsFcluIjpBpwlJ1zqKuAcUVwGqwzIl27BpHMzTKdLNH_KTj7HggS-84D1hcEGnVQbaswhy38SpIrgyciuRy5Ovshb36oJT7YBHpUcOSWpsyjBHCk1XpX6Y02HcE_dACd3vc0BO9oNoqqSqtiHshW40kPBx1j6N_eWALkCrrDMCVPTCNGPSVj8CWtx2Bx2oXt0Huy15cHZTmVH9C-09SESzm80Ri3ehZLABaioxjDhFKYGCsizo"
        />
        {/* Dark gradient from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#16130b] via-[#16130b]/80 to-transparent"></div>
        {/* Dark gradient from bottom to blend with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16130b] via-[#16130b]/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="font-[family-name:var(--font-montserrat)] text-[56px] md:text-[72px] font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Drive Your <span className="text-[#f2ca50]">Dream</span><br/>Today
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-white/80 text-[16px] md:text-[17px] mb-10 leading-relaxed max-w-lg">
            Experience the pinnacle of automotive engineering. From high-performance supercars to executive luxury sedans, our curated fleet is ready for your next journey.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="bg-[#f2ca50] text-[#16130b] font-[family-name:var(--font-inter)] font-semibold text-[15px] px-8 py-3 rounded-lg hover:bg-[#ffe088] transition-colors">
              Explore Cars
            </button>
            <button className="bg-transparent border border-white/20 text-white font-[family-name:var(--font-inter)] font-medium text-[15px] px-8 py-3 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
              View Fleet
            </button>
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
              <div className="text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider mb-1 font-[family-name:var(--font-inter)]">Pick-Up</div>
              <div className="text-white text-[15px] font-semibold font-[family-name:var(--font-inter)]">Los Angeles, CA</div>
            </div>
            
            {/* Drop-off */}
            <div className="flex-1 px-8 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider mb-1 font-[family-name:var(--font-inter)]">Drop-Off</div>
              <div className="text-white text-[15px] font-semibold font-[family-name:var(--font-inter)]">Oct 24 - Oct 28</div>
            </div>
            
            {/* Car Type */}
            <div className="flex-1 px-8 py-3">
              <div className="text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider mb-1 font-[family-name:var(--font-inter)]">Car Type</div>
              <div className="text-white text-[15px] font-semibold font-[family-name:var(--font-inter)]">Luxury Sports</div>
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
