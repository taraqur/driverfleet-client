"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const MyBookings = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session?.user?.email]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-bookings?email=${session.user.email}`, {
        withCredentials: true
      });
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`, {
        withCredentials: true
      });
      toast.success("Booking canceled successfully");
      setBookings(bookings.filter(b => b._id !== id));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#f2ca50]/30 border-t-[#f2ca50] rounded-full animate-spin"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-28">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-black dark:text-white mb-2">My Bookings</h1>
          <p className="text-black/60 dark:text-white/60 font-[family-name:var(--font-body)] text-lg">Manage and view your upcoming and past luxury rentals.</p>
        </div>
        <Link href="/cars" className="bg-[#f2ca50] text-black px-6 py-3 rounded-full font-semibold font-[family-name:var(--font-body)] hover:bg-white transition-colors">
          Book Another Car
        </Link>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-[#1a1814] border border-black/10 dark:border-white/10 rounded-3xl p-16 text-center shadow-xl">
          <span className="material-symbols-outlined text-6xl text-black/20 dark:text-white/20 mb-4">event_busy</span>
          <h3 className="text-2xl font-bold text-black dark:text-white mb-2 font-[family-name:var(--font-heading)]">No bookings found</h3>
          <p className="text-black/60 dark:text-white/60 font-[family-name:var(--font-body)] mb-6">You haven't made any reservations yet.</p>
          <Link href="/cars" className="inline-block bg-[#f2ca50] text-black px-8 py-3 rounded-full hover:bg-white transition-colors font-bold font-[family-name:var(--font-body)]">
            Explore Fleet
          </Link>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bookings.map((booking) => (
            <motion.div variants={itemVariants} key={booking._id} className="bg-[#f8f9fa] dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden hover:border-black/20 dark:hover:border-[#f2ca50]/50 transition-all duration-300 group shadow-xl flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img src={booking.image} alt={booking.carName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
                    Confirmed
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4 font-[family-name:var(--font-heading)]">{booking.carName}</h3>
                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center text-black/70 dark:text-white/70 text-sm font-[family-name:var(--font-body)]">
                    <span className="material-symbols-outlined text-[20px] mr-3 text-[#f2ca50]">calendar_month</span>
                    {booking.startDate} to {booking.endDate}
                  </div>
                  <div className="flex items-center text-black/70 dark:text-white/70 text-sm font-[family-name:var(--font-body)]">
                    <span className="material-symbols-outlined text-[20px] mr-3 text-[#f2ca50]">payments</span>
                    ${booking.totalPrice} Total
                  </div>
                </div>
                <div className="flex gap-4 mt-auto">
                   <Link href={`/cars/${booking.carId}`} className="flex-1 text-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white py-3 rounded-xl text-sm font-medium transition-colors border border-black/10 dark:border-white/5">
                     View Details
                   </Link>
                   <button onClick={() => handleCancel(booking._id)} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 py-3 rounded-xl text-sm font-medium transition-colors border border-red-500/20">
                     Cancel
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyBookings;
