"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');

  // Available categories based on the add-car form
  const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Sports'];

  const fetchCars = async (search = '', type = 'All') => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`;
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (type && type !== 'All') params.append('type', type);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url);
      setCars(response.data);
    } catch (error) {
      console.error('Failed to fetch cars:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    fetchCars(searchInput, category);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    fetchCars(searchTerm, newCategory);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#110e07] pt-20 transition-colors duration-300">

      {/* Hero Section */}
      <div className="relative h-[400px] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background image from the screenshot (similar concept) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop"
            alt="Fleet Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110e07]/60 via-[#110e07]/40 to-[#110e07]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Explore Our Fleet
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-inter)] text-lg text-white/90 max-w-2xl mx-auto"
          >
            Precision engineering meets unparalleled luxury. Select your next drive from our curated collection of elite vehicles.
          </motion.p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-8 relative z-20 mb-16">
        <div className="bg-white dark:bg-[#1a1814] border border-black/10 dark:border-white/10 rounded-[30px] md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2 shadow-2xl">
          
          {/* Search Input */}
          <div className="flex-1 relative w-full h-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Search by car name..."
              className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none font-[family-name:var(--font-inter)] text-[15px]"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-black/10 dark:bg-white/10"></div>

          {/* Category Dropdown */}
          <div className="w-full md:w-56 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-black/40 dark:text-white/40 text-[18px]">tune</span>
            </div>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full appearance-none bg-transparent border-none py-3 pl-12 pr-10 text-black/80 dark:text-white/80 focus:outline-none font-[family-name:var(--font-inter)] text-[14px] cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-white dark:bg-[#1a1814] text-black dark:text-white">{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-black/40 dark:text-white/40 text-[18px]">expand_more</span>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-[#f2ca50] text-black px-8 py-3 md:rounded-full rounded-2xl font-bold font-[family-name:var(--font-inter)] text-[14px] hover:bg-[#ffe088] transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Cars Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#f2ca50]/30 border-t-[#f2ca50] rounded-full animate-spin"></div>
          </div>
        ) : cars.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white dark:bg-[#1a1814] border border-black/10 dark:border-white/10 rounded-3xl p-16 text-center"
          >
            <span className="material-symbols-outlined text-6xl text-black/20 dark:text-white/20 mb-4">directions_car</span>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2 font-[family-name:var(--font-montserrat)]">No vehicles found</h3>
            <p className="text-black/60 dark:text-white/60 font-[family-name:var(--font-inter)]">Try adjusting your search criteria or category filter.</p>
            <button
              onClick={() => {
                setSearchInput('');
                setSearchTerm('');
                setCategory('All');
                fetchCars('', 'All');
              }}
              className="mt-6 text-[#f2ca50] border border-[#f2ca50]/50 px-6 py-2 rounded-full hover:bg-[#f2ca50]/10 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cars.map((car) => (
                <motion.div variants={cardVariants} key={car._id} className="group rounded-2xl overflow-hidden bg-white dark:bg-[#1a1814] border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 shadow-lg dark:shadow-none transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      alt={car.name}
                      src={car.imageUrl}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Price Tag */}
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#f2ca50] rounded-bl-xl text-black text-[13px] font-bold">
                      ${car.price}/day
                    </div>
                  </div>
                  <div className="p-6 pb-5">
                    <div className="mb-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-[family-name:var(--font-inter)] text-[22px] font-bold text-black dark:text-white mb-0.5">{car.name}</h3>
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-black/50 dark:text-white/50">{car.type}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">bolt</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#2a261c] text-black/60 dark:text-white/60 text-[11px] font-medium font-[family-name:var(--font-inter)]">
                        Automatic
                      </div>
                      <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#2a261c] text-black/60 dark:text-white/60 text-[11px] font-medium font-[family-name:var(--font-inter)]">
                        {car.capacity} Seats
                      </div>
                      <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#2a261c] text-black/60 dark:text-white/60 text-[11px] font-medium font-[family-name:var(--font-inter)]">
                        Gasoline
                      </div>
                    </div>

                    <Link href={`/cars/${car._id}`} className="w-full block text-center py-2.5 bg-transparent rounded-lg border border-black/10 dark:border-white/10 font-[family-name:var(--font-inter)] text-[13px] font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>


          </>
        )}
      </div>
    </div>
  );
};

export default ExploreCars;
