import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-[#110e07] pt-12 pb-6 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-7xl mx-auto mb-16">

        <div className="col-span-1">
          <div className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-[#f2ca50] mb-6 tracking-tight">
            DriveFleet
          </div>
          <p className="font-[family-name:var(--font-body)] text-[14px] text-white/60 leading-relaxed max-w-xs">
            The world's premier platform for high-end automotive experiences and luxury rentals.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-[15px] font-[family-name:var(--font-body)] mb-2">Quick Links</h4>
          <Link className="text-white/60 hover:text-[#f2ca50] transition-colors font-[family-name:var(--font-body)] text-[14px]" href="/">Home</Link>
          <Link className="text-white/60 hover:text-[#f2ca50] transition-colors font-[family-name:var(--font-body)] text-[14px]" href="/cars">Explore Cars</Link>
          <Link className="text-white/60 hover:text-[#f2ca50] transition-colors font-[family-name:var(--font-body)] text-[14px]" href="/my-bookings">My Bookings</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-[15px] font-[family-name:var(--font-body)] mb-2">Support</h4>
          <Link className="text-white/60 hover:text-[#f2ca50] transition-colors font-[family-name:var(--font-body)] text-[14px]" href="/contact">Contact</Link>
          <Link className="text-white/60 hover:text-[#f2ca50] transition-colors font-[family-name:var(--font-body)] text-[14px]" href="/privacy">Privacy Policy</Link>
          <Link className="text-white/60 hover:text-[#f2ca50] transition-colors font-[family-name:var(--font-body)] text-[14px]" href="/terms">Terms of Service</Link>
          <Link className="text-white/60 hover:text-[#f2ca50] transition-colors font-[family-name:var(--font-body)] text-[14px]" href="/help">Help Center</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-[15px] font-[family-name:var(--font-body)] mb-2">Newsletter</h4>
          <p className="text-white/60 text-[14px] font-[family-name:var(--font-body)] mb-2">Stay updated with our latest luxury additions.</p>
          <div className="flex gap-2 w-full max-w-xs">
            <input
              className="bg-[#23201a] border border-white/5 rounded-md px-4 py-2.5 text-white text-[14px] w-full focus:outline-none focus:border-[#f2ca50]/50 font-[family-name:var(--font-body)]"
              placeholder="Email"
              type="email"
            />
            <button className="bg-[#f2ca50] text-[#16130b] px-3 rounded-md hover:bg-[#ffe088] transition-colors flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 text-center px-6">
        <p className="text-white/40 font-[family-name:var(--font-body)] text-[13px]">
          © 2026 DriveFleet Premium. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
