"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

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
      let url = 'http://localhost:5000/api/cars';
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

  return (
    <div className="min-h-screen bg-[#110e07] pt-20">
      
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
          <h1 className="font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Explore Our Fleet
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-lg text-white/80 max-w-2xl mx-auto">
            Precision engineering meets unparalleled luxury. Select your next drive from our curated collection of elite vehicles.
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 relative z-20 mb-16">
        <div className="bg-[#1a1814] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-2xl">
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#f2ca50]">search</span>
            </div>
            <input 
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Search by car name..."
              className="w-full bg-[#110e07] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#f2ca50]/50 font-[family-name:var(--font-inter)]"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-64 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-white/60">tune</span>
            </div>
            <select 
              value={category}
              onChange={handleCategoryChange}
              className="w-full appearance-none bg-[#110e07] border border-white/5 rounded-xl py-3 pl-12 pr-10 text-white/90 focus:outline-none focus:border-[#f2ca50]/50 font-[family-name:var(--font-inter)] cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-white/60">keyboard_arrow_down</span>
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-[#f2ca50] text-black px-8 py-3 rounded-xl font-bold font-[family-name:var(--font-inter)] hover:bg-white hover:shadow-[0_0_15px_rgba(242,202,80,0.5)] transition-all duration-300"
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
          <div className="bg-[#1a1814] border border-white/10 rounded-3xl p-16 text-center">
            <span className="material-symbols-outlined text-6xl text-white/20 mb-4">directions_car</span>
            <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-montserrat)]">No vehicles found</h3>
            <p className="text-white/60 font-[family-name:var(--font-inter)]">Try adjusting your search criteria or category filter.</p>
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
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      alt={car.name} 
                      src={car.imageUrl} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#f2ca50] rounded-md text-black text-[13px] font-bold">
                      ${car.price} <span className="text-black/70 text-[11px] font-medium">/ day</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-5 flex justify-between items-start">
                      <div>
                        <h3 className="font-[family-name:var(--font-inter)] text-[19px] font-bold text-white mb-1">{car.name}</h3>
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">{car.type}</p>
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                        <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">speed</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] border border-white/5 text-white/70 text-[11px] font-medium font-[family-name:var(--font-inter)]">
                        Automatic
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] border border-white/5 text-white/70 text-[11px] font-medium font-[family-name:var(--font-inter)]">
                        {car.capacity} Seats
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] border border-white/5 text-white/70 text-[11px] font-medium font-[family-name:var(--font-inter)]">
                        Gasoline
                      </div>
                    </div>
                    
                    <Link href={`/cars/${car._id}`} className="w-full block text-center py-3 bg-[#23201a] rounded-lg border border-white/5 font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:bg-white hover:text-black transition-colors duration-300">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-16 flex flex-col items-center">
              <button className="bg-[#1a1814] border border-white/10 text-white px-8 py-3 rounded-lg font-medium font-[family-name:var(--font-inter)] hover:bg-white/5 transition-colors mb-8 flex flex-col items-center">
                <span>Load More</span>
                <span className="text-white/40 text-[11px]">Vehicles</span>
              </button>
              
              <div className="flex items-center gap-4 text-white/60 font-[family-name:var(--font-inter)] text-[14px]">
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#f2ca50] text-black font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:text-white transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:text-white transition-colors">3</button>
                <span>...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:text-white transition-colors">12</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreCars;
