"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
        image: image || undefined
      });

      if (error) {
        toast.error(error.message || "Failed to register");
      } else {
        try {
          await axios.post('${process.env.NEXT_PUBLIC_SERVER_URL}/api/jwt', { email }, { withCredentials: true });
        } catch (jwtError) {
          console.error("Failed to set JWT:", jwtError);
        }
        toast.success("Successfully registered! Welcome to DriveFleet.");
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#110e07] pt-20">
      {/* Background - Very dark with subtle warm/purple glow on the right */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#16130b] via-[#16130b] to-[#3a1d1d]/30"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-[family-name:var(--font-montserrat)] text-[40px] font-bold text-[#f2ca50] tracking-tight mb-2">
            DriveFleet
          </Link>
          <p className="font-[family-name:var(--font-inter)] text-white/70 text-[16px] font-medium">
            Create your premium account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#14120e]/80 backdrop-blur-md border border-white/5 rounded-[12px] p-8 shadow-2xl w-full">

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="block text-white/70 text-[10px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1c1a17] text-white border border-white/10 px-4 py-3 rounded-md focus:outline-none focus:border-[#f2ca50]/50 placeholder:text-white/30 font-[family-name:var(--font-inter)] text-[14px]"
                placeholder="Alexander Pierce"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/70 text-[10px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1c1a17] text-white border border-white/10 px-4 py-3 rounded-md focus:outline-none focus:border-[#f2ca50]/50 placeholder:text-white/30 font-[family-name:var(--font-inter)] text-[14px]"
                placeholder="alex@drivefleet.com"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-white/70 text-[10px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">
                Photo URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-[#1c1a17] text-white border border-white/10 px-4 py-3 rounded-md focus:outline-none focus:border-[#f2ca50]/50 placeholder:text-white/30 font-[family-name:var(--font-inter)] text-[14px]"
                placeholder="https://image.path/profile.jpg"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-white/70 text-[10px] uppercase tracking-wider font-bold font-[family-name:var(--font-inter)]">
                  Password
                </label>
                <span className="text-white/40 text-[9px] uppercase tracking-wider font-[family-name:var(--font-inter)]">
                  Min 8 Chars
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1c1a17] text-white border border-white/10 px-4 py-3 rounded-md focus:outline-none focus:border-[#f2ca50]/50 placeholder:text-white/30 font-[family-name:var(--font-inter)] text-[14px] tracking-widest"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f2ca50] text-[#16130b] font-bold text-[16px] font-[family-name:var(--font-inter)] py-3.5 rounded-md hover:bg-[#ffe088] transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#16130b] border-t-transparent rounded-full animate-spin"></div>
                  Registering...
                </>
              ) : (
                <>
                  Register <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-[1px] bg-white/5"></div>
            <span className="px-4 text-white/50 text-[10px] font-bold uppercase tracking-wider font-[family-name:var(--font-inter)]">OR CONTINUE WITH</span>
            <div className="flex-1 h-[1px] bg-white/5"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-[#1e1c18] border border-white/10 text-white font-[family-name:var(--font-inter)] font-medium text-[14px] py-3 rounded-md hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>

          {/* Bottom Link */}
          <p className="text-center text-white/60 text-[14px] font-[family-name:var(--font-inter)] mt-8">
            Already have an account? <Link href="/login" className="text-[#f2ca50] font-bold hover:underline">Login here</Link>
          </p>

        </div>

        {/* Small footer below form */}
        <p className="text-center text-white/30 text-[13px] font-[family-name:var(--font-inter)] mt-8 pb-8">
          © 2024 DriveFleet Premium. All rights reserved.
        </p>
      </div>
    </div>
  );
}
