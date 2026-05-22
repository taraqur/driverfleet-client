"use client";
import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddCar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: 'SUV',
    imageUrl: '',
    capacity: '',
    location: '',
    description: '',
    availability: 'Available'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error('You must be logged in to add a car.');
      return;
    }

    setLoading(true);
    try {
      const carData = {
        ...formData,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        userEmail: session.user.email,
        userName: session.user.name,
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`, carData, {
        withCredentials: true
      });

      const data = response.data;
      if (data.success) {
        toast.success('Car added successfully!');
        router.push('/my-added-cars');
      } else {
        toast.error('Failed to add car.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-black dark:text-white mb-4">List Your Vehicle</h1>
        <p className="text-black/60 dark:text-white/60 font-[family-name:var(--font-body)] text-lg">Join our premium fleet and start earning today.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f2ca50]/10 rounded-full blur-3xl pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)]"
                placeholder="e.g. Porsche 911 GT3"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Daily Rent Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)]"
                placeholder="e.g. 500"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Car Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)]"
                required
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Seat Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)]"
                placeholder="e.g. 4"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Pickup Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)]"
                placeholder="e.g. Los Angeles, CA"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Availability Status</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)]"
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)]"
              placeholder="https://example.com/car-image.jpg"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-black/80 dark:text-white/80 font-[family-name:var(--font-body)]">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-[#f2ca50]/50 focus:ring-1 focus:ring-[#f2ca50]/50 transition-all font-[family-name:var(--font-body)] resize-none"
              placeholder="Describe your vehicle's condition, performance, and any special rules..."
              required
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f2ca50] disabled:opacity-50 hover:bg-[#ffe088] text-black font-semibold py-4 rounded-2xl transition-all duration-300 font-[family-name:var(--font-body)] text-lg flex items-center justify-center gap-2 group"
            >
              {loading ? "Listing..." : "List Vehicle"}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCar;
