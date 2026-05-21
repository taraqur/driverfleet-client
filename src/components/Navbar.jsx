"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  // Sync JWT for social logins (like Google) where login page logic might be bypassed
  React.useEffect(() => {
    if (user?.email) {
      axios.post('${process.env.NEXT_PUBLIC_SERVER_URL}/api/jwt', { email: user.email }, { withCredentials: true })
        .catch(err => console.error("Failed to sync JWT:", err));
    }
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await axios.post('${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error("Failed to clear JWT:", err);
    }
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#16130b]/50 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="font-[family-name:var(--font-montserrat)] text-[28px] font-bold text-[#f2ca50] tracking-tight">
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
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>

          {user ? (
            <div className="relative group hidden md:block">
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
            <div className="hidden md:flex items-center gap-6">
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
    </nav>
  );
};

export default Navbar;
