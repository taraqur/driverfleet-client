"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const CarDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Booking modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        const [carRes, allCarsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/cars/${id}`),
          axios.get(`http://localhost:5000/api/cars`)
        ]);
        
        setCar(carRes.data);
        
        // Get 3 similar cars
        const others = allCarsRes.data.filter(c => c._id !== id);
        setSimilarCars(others.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch car details:', error);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchCarData();
    }
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("You must be logged in to book a vehicle.");
      router.push('/login');
      return;
    }
    
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates.");
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      toast.error("End date cannot be before start date.");
      return;
    }
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = diffDays * car.price;

    setBookingLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        carId: car._id,
        carName: car.name,
        image: car.imageUrl,
        userEmail: session.user.email,
        startDate,
        endDate,
        totalPrice,
        status: 'Pending'
      }, { withCredentials: true });
      
      if (response.data.success) {
        toast.success("Vehicle booked successfully!");
        setIsModalOpen(false);
        router.push('/my-bookings');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to book vehicle.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#110e07] flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-[#f2ca50]/30 border-t-[#f2ca50] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#110e07] flex flex-col items-center justify-center pt-20 text-white">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] mb-4">Car Not Found</h1>
        <Link href="/cars" className="text-[#f2ca50] hover:underline font-[family-name:var(--font-inter)]">Return to Explore</Link>
      </div>
    );
  }

  // Generate mock stats based on price to keep them consistent
  const mockMaxSpeed = 180 + Math.floor((car.price % 100) / 2);
  const mockHorsepower = 500 + (car.price % 300);

  return (
    <div className="min-h-screen bg-[#110e07] pt-20">
      
      {/* Main Split Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        
        {/* Left Side - Image & Stats */}
        <div className="w-full lg:w-[60%] relative min-h-[500px] lg:min-h-full">
          <img 
            src={car.imageUrl} 
            alt={car.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#110e07] via-transparent to-transparent lg:hidden"></div>
          
          {/* Stats Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 flex gap-4">
            {/* Speed Box */}
            <div className="bg-[#1a1814]/90 backdrop-blur-md border border-white/10 rounded-xl p-5 w-48">
              <div className="text-white/50 text-[10px] font-bold tracking-[0.2em] mb-1 font-[family-name:var(--font-inter)] uppercase">
                Max Speed
              </div>
              <div className="text-[#f2ca50] font-bold font-[family-name:var(--font-montserrat)] flex items-baseline gap-1">
                <span className="text-4xl">{mockMaxSpeed}</span>
                <span className="text-sm">mph</span>
              </div>
            </div>
            
            {/* Horsepower Box */}
            <div className="bg-[#1a1814]/90 backdrop-blur-md border border-white/10 rounded-xl p-5 w-48">
              <div className="text-white/50 text-[10px] font-bold tracking-[0.2em] mb-1 font-[family-name:var(--font-inter)] uppercase">
                Horsepower
              </div>
              <div className="text-[#f2ca50] font-bold font-[family-name:var(--font-montserrat)] flex items-baseline gap-1">
                <span className="text-4xl">{mockHorsepower}</span>
                <span className="text-sm">hp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-full lg:w-[40%] bg-[#1a1814] p-8 lg:p-16 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full uppercase">
                {car.availability || "Available"}
              </div>
              <div className="text-right">
                <div className="text-[#f2ca50] font-bold font-[family-name:var(--font-montserrat)] text-4xl leading-none">
                  ${car.price}
                </div>
                <div className="text-white/50 text-[12px] font-[family-name:var(--font-inter)]">
                  per day
                </div>
              </div>
            </div>
            
            <h1 className="text-white font-bold font-[family-name:var(--font-montserrat)] text-4xl mb-4 leading-tight">
              {car.name}
            </h1>
            
            <div className="flex items-center gap-2 text-white/60 text-sm font-[family-name:var(--font-inter)] mb-8">
              <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">location_on</span>
              {car.location || "Beverly Hills, Los Angeles"}
            </div>
            
            <p className="text-white/80 font-[family-name:var(--font-inter)] text-[15px] leading-relaxed mb-10">
              {car.description || `Experience the pinnacle of automotive engineering with the ${car.name}. This ${car.type} provides unparalleled performance for the open road, delivering an intoxicating experience that redefines premium mobility.`}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <span className="material-symbols-outlined text-white/70">local_gas_station</span>
                </div>
                <div>
                  <div className="text-white/50 text-[10px] font-bold tracking-wider font-[family-name:var(--font-inter)] uppercase">Fuel</div>
                  <div className="text-white font-medium font-[family-name:var(--font-inter)]">Premium</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <span className="material-symbols-outlined text-white/70">chair</span>
                </div>
                <div>
                  <div className="text-white/50 text-[10px] font-bold tracking-wider font-[family-name:var(--font-inter)] uppercase">Seats</div>
                  <div className="text-white font-medium font-[family-name:var(--font-inter)]">{car.capacity} Adults</div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#f2ca50] text-black py-4 rounded-lg font-bold font-[family-name:var(--font-inter)] tracking-wide hover:bg-white transition-colors uppercase text-sm mt-auto"
          >
            Book This Vehicle
          </button>
        </div>
      </div>

      {/* Similar Luxury Rentals */}
      {similarCars.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <h2 className="text-white font-bold font-[family-name:var(--font-montserrat)] text-3xl mb-10">
            Similar Luxury Rentals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarCars.map((similarCar) => (
              <div key={similarCar._id} className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    alt={similarCar.name} 
                    src={similarCar.imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 right-4 text-[#f2ca50] text-[15px] font-bold font-[family-name:var(--font-inter)] drop-shadow-md">
                    ${similarCar.price}/day
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center">
                  <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-bold text-white">
                    {similarCar.name}
                  </h3>
                  <Link 
                    href={`/cars/${similarCar._id}`} 
                    className="flex gap-2"
                  >
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70 text-[11px] font-medium font-[family-name:var(--font-inter)]">
                      Automatic
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1814] border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-white mb-2">Book {car.name}</h3>
            <p className="text-white/60 font-[family-name:var(--font-inter)] text-sm mb-6">Select your rental dates to proceed.</p>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">End Date</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50"
                  required
                />
              </div>
              
              {startDate && endDate && (
                <div className="pt-4 pb-2 border-t border-white/10 mt-6 flex justify-between items-center">
                  <span className="text-white/70 font-[family-name:var(--font-inter)] text-sm">Total Estimated:</span>
                  <span className="text-[#f2ca50] font-bold font-[family-name:var(--font-montserrat)] text-xl">
                    ${(Math.ceil(Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) || 1) * car.price}
                  </span>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={bookingLoading}
                className="w-full bg-[#f2ca50] text-black py-3 rounded-lg font-bold font-[family-name:var(--font-inter)] hover:bg-white transition-colors mt-4 disabled:opacity-50"
              >
                {bookingLoading ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CarDetails;
