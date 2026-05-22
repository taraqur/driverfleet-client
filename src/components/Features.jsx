import React from 'react';

const Features = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-[#110e07]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Support Card */}
        <div className="flex flex-col items-center text-center p-10 rounded-2xl bg-[#16130b] border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-[#f2ca50]/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[#f2ca50] text-[32px]">support_agent</span>
          </div>
          <h3 className="font-[family-name:var(--font-body)] text-[18px] font-bold text-white mb-3">24/7 Support</h3>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-relaxed">
            Round-the-clock concierge service to assist you with every detail of your journey.
          </p>
        </div>
        
        {/* Insurance Card */}
        <div className="flex flex-col items-center text-center p-10 rounded-2xl bg-[#16130b] border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-[#4b8eff]/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[#4b8eff] text-[32px]">verified_user</span>
          </div>
          <h3 className="font-[family-name:var(--font-body)] text-[18px] font-bold text-white mb-3">Premium Insurance</h3>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-relaxed">
            Full coverage protection designed for high-value vehicles and peace of mind.
          </p>
        </div>
        
        {/* Luxury Card */}
        <div className="flex flex-col items-center text-center p-10 rounded-2xl bg-[#16130b] border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-[#f2ca50]/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[#f2ca50] text-[32px]">vpn_key</span>
          </div>
          <h3 className="font-[family-name:var(--font-body)] text-[18px] font-bold text-white mb-3">Luxury Collection</h3>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-relaxed">
            Exclusive access to the world's most prestigious automotive brands and latest models.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;
