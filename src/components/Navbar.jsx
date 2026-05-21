"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync JWT for social logins (like Google) where login page logic might be bypassed
  React.useEffect(() => {
    if (user?.email) {
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jwt`, { email: user.email }, { withCredentials: true })
        .catch(err => console.error("Failed to sync JWT:", err));
    }
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Failed to clear JWT:", err);
    }
    await signOut();
    setIsMobileMenuOpen(false);
    router.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#16130b]/50 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" onClick={closeMobileMenu} className="font-[family-name:var(--font-montserrat)] text-[28px] font-bold text-[#f2ca50] tracking-tight">
          DriveFleet
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-inter)] text-[15px] font-medium">
          <Link className="text-[#f2ca50] border-b-[3px] border-[#f2ca50] pb-1" href="/">Home</Link>
          <Link className="text-white/80 hover:text-white transition-colors" href="/cars">Explore Cars</Link>
          <Link className="text-white/80 hover:text-white transition-colors" href="/add-car">Add Car</Link>
          <Link className="text-white/80 hover:text-white transition-colors" href="/my-bookings">My Bookings</Link>
        </div>

        {/* Profile Action */}
        <div className="flex items-center gap-4">
          {/* Mobile Login/Profile Quick Actions */}
          <div className="md:hidden flex items-center">
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-[#f2ca50] rounded-full animate-spin"></div>
            ) : user ? (
              <button onClick={handleLogout} className="flex items-center justify-center text-red-400 hover:text-red-300 transition-colors">
                <span className="material-symbols-outlined text-[24px]">logout</span>
              </button>
            ) : (
              <Link href="/login" className="flex items-center justify-center text-white hover:text-[#f2ca50] transition-colors">
                <span className="material-symbols-outlined text-[24px]">login</span>
              </Link>
            )}
          </div>

          {/* Hamburger Menu Toggle */}
          <button className="md:hidden text-white hover:text-[#f2ca50] transition-colors" onClick={toggleMobileMenu}>
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>

          {/* Desktop Profile / Login */}
          <div className="hidden md:block">
            {isPending ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-[#f2ca50] rounded-full animate-spin"></div>
            ) : user ? (
              <div className="relative group">
                <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#f2ca50]/50 hover:bg-[#f2ca50]/10 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">account_circle</span>
                  <span className="font-[family-name:var(--font-inter)] text-[15px] font-medium text-[#f2ca50]">Profile</span>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1814] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2 flex flex-col">
                    <Link href="/add-car" className="px-4 py-2 text-white/80 hover:text-[#f2ca50] hover:bg-white/5 font-[family-name:var(--font-inter)] text-[14px]">Add Car</Link>
                    <Link href="/my-bookings" className="px-4 py-2 text-white/80 hover:text-[#f2ca50] hover:bg-white/5 font-[family-name:var(--font-inter)] text-[14px]">My Bookings</Link>
                    <Link href="/my-added-cars" className="px-4 py-2 text-white/80 hover:text-[#f2ca50] hover:bg-white/5 font-[family-name:var(--font-inter)] text-[14px]">My Added Cars</Link>
                    <div className="h-px bg-white/10 my-1"></div>
                    <button onClick={handleLogout} className="text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/5 font-[family-name:var(--font-inter)] text-[14px]">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/login" className="font-[family-name:var(--font-inter)] text-[15px] font-semibold text-white/90 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f2ca50] text-black hover:bg-white hover:shadow-[0_0_15px_rgba(242,202,80,0.5)] transition-all duration-300 cursor-pointer font-[family-name:var(--font-inter)] text-[15px] font-bold">
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1a1814] border-b border-white/10 shadow-2xl py-4 px-6 flex flex-col gap-4 font-[family-name:var(--font-inter)]">
          <Link href="/" onClick={closeMobileMenu} className="text-white/80 hover:text-[#f2ca50] transition-colors py-2 text-[16px]">Home</Link>
          <Link href="/cars" onClick={closeMobileMenu} className="text-white/80 hover:text-[#f2ca50] transition-colors py-2 text-[16px]">Explore Cars</Link>
          <Link href="/add-car" onClick={closeMobileMenu} className="text-white/80 hover:text-[#f2ca50] transition-colors py-2 text-[16px]">Add Car</Link>
          <Link href="/my-bookings" onClick={closeMobileMenu} className="text-white/80 hover:text-[#f2ca50] transition-colors py-2 text-[16px]">My Bookings</Link>
          
          <div className="h-px bg-white/10 my-2"></div>
          
          {user ? (
            <>
              <Link href="/my-added-cars" onClick={closeMobileMenu} className="text-white/80 hover:text-[#f2ca50] transition-colors py-2 text-[16px]">My Added Cars</Link>
              <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300 transition-colors py-2 text-[16px]">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link href="/login" onClick={closeMobileMenu} className="text-center py-2.5 rounded-md border border-white/20 text-white/90 hover:bg-white/5 transition-colors font-medium text-[15px]">
                Login
              </Link>
              <Link href="/register" onClick={closeMobileMenu} className="text-center py-2.5 rounded-md bg-[#f2ca50] text-black hover:bg-white transition-colors font-bold text-[15px]">
                Join Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
