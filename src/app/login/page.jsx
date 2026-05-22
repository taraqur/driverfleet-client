"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to login");
      } else {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jwt`, { email }, { withCredentials: true });
        } catch (jwtError) {
          console.error("Failed to set JWT:", jwtError);
        }
        toast.success("Successfully logged in!");
        router.push("/");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (err) {
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-[#110e07] pt-20 transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Background"
          className="w-full h-full object-cover opacity-30 blur-[2px]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkDMxKGktfUETX4bnp4FPhlVMdrklsFcluIjpBpwlJ1zqKuAcUVwGqwzIl27BpHMzTKdLNH_KTj7HggS-84D1hcEGnVQbaswhy38SpIrgyciuRy5Ovshb36oJT7YBHpUcOSWpsyjBHCk1XpX6Y02HcE_dACd3vc0BO9oNoqqSqtiHshW40kPBx1j6N_eWALkCrrDMCVPTCNGPSVj8CWtx2Bx2oXt0Huy15cHZTmVH9C-09SESzm80Ri3ehZLABaioxjDhFKYGCsizo"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/90 dark:from-[#16130b] via-white/80 dark:via-[#16130b]/90 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block font-[family-name:var(--font-heading)] text-[40px] font-bold text-[#f2ca50] tracking-tight mb-2">
            DriveFleet
          </Link>
          <p className="font-[family-name:var(--font-body)] text-black/70 dark:text-white/70 text-[15px]">
            Premium Mobility Redefined
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 dark:bg-[#1a1814]/95 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-2xl w-full">

          {/* Tabs */}
          <div className="flex border-b border-black/10 dark:border-white/10 mb-8">
            <Link href="/login" className="flex-1 text-center pb-4 border-b-2 border-[#f2ca50] text-[#f2ca50] font-[family-name:var(--font-body)] font-medium text-[15px]">
              Login
            </Link>
            <Link href="/register" className="flex-1 text-center pb-4 text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80 transition-colors font-[family-name:var(--font-body)] font-medium text-[15px]">
              Register
            </Link>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="block text-black/80 dark:text-white/80 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-body)]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f8f9fa] dark:bg-white text-black px-4 py-3 rounded-md border border-black/10 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-[#f2ca50] font-[family-name:var(--font-body)]"
                placeholder="executive@drivefleet.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-black/80 dark:text-white/80 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-body)]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f8f9fa] dark:bg-white text-black px-4 py-3 rounded-md border border-black/10 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-[#f2ca50] font-[family-name:var(--font-body)] tracking-widest"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mt-[-8px]">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-black/20 dark:border-white/20 bg-transparent text-[#f2ca50] focus:ring-[#f2ca50] focus:ring-offset-white dark:focus:ring-offset-[#1a1814] accent-[#f2ca50]" />
                <span className="text-black/70 dark:text-white/70 text-[13px] font-[family-name:var(--font-body)] group-hover:text-black dark:group-hover:text-white transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-[#f2ca50] text-[13px] font-[family-name:var(--font-body)] hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f2ca50] text-[#16130b] font-bold text-[15px] font-[family-name:var(--font-body)] py-3.5 rounded-md hover:bg-[#ffe088] transition-colors mt-2 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#16130b] border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10"></div>
            <span className="px-4 text-black/40 dark:text-white/40 text-[11px] font-bold uppercase tracking-wider font-[family-name:var(--font-body)]">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-[#f8f9fa] dark:bg-[#1e1c18] border border-black/10 dark:border-white/10 text-black dark:text-white font-[family-name:var(--font-body)] font-medium text-[15px] py-3 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>

          {/* Bottom Link */}
          <p className="text-center text-black/60 dark:text-white/60 text-[14px] font-[family-name:var(--font-body)] mt-8">
            Don't have an account? <Link href="/register" className="text-[#f2ca50] font-bold hover:underline">Register now</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
