"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
export default function PrivateLayout({ children }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [session, isPending, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-[#f2ca50] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      {children}
    </div>
  );
}
