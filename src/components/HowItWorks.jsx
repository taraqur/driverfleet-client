import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center bg-[#110e07]">
      <h2 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-[#e6e6e6] mb-16 tracking-tight">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
        {/* Connector Line (Desktop Only) */}
        <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[1px] bg-[#332f26] z-0"></div>
        
        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border border-[#f2ca50] flex items-center justify-center mb-6 bg-[#110e07]">
            <span className="font-[family-name:var(--font-body)] text-[22px] text-[#f2ca50] font-normal">1</span>
          </div>
          <h3 className="font-[family-name:var(--font-body)] text-[18px] font-bold text-white mb-3">Choose</h3>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 max-w-[260px] leading-relaxed">
            Select from our elite collection of luxury vehicles tailored to your taste.
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border border-[#f2ca50] flex items-center justify-center mb-6 bg-[#110e07]">
            <span className="font-[family-name:var(--font-body)] text-[22px] text-[#f2ca50] font-normal">2</span>
          </div>
          <h3 className="font-[family-name:var(--font-body)] text-[18px] font-bold text-white mb-3">Book</h3>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 max-w-[260px] leading-relaxed">
            Complete your reservation in seconds with our seamless digital checkout.
          </p>
        </div>
        
        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border border-[#f2ca50] flex items-center justify-center mb-6 bg-[#110e07]">
            <span className="font-[family-name:var(--font-body)] text-[22px] text-[#f2ca50] font-normal">3</span>
          </div>
          <h3 className="font-[family-name:var(--font-body)] text-[18px] font-bold text-white mb-3">Drive</h3>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 max-w-[260px] leading-relaxed">
            Pick up your keys or have the car delivered. Experience pure driving bliss.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
