import React from 'react';
import Link from 'next/link';

const MyBookings = () => {
  // Mock data
  const bookings = [
    {
      id: 1,
      carName: "Mercedes-Benz S-Class",
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop",
      startDate: "2026-06-01",
      endDate: "2026-06-05",
      totalPrice: 1200,
      status: "Confirmed"
    },
    {
      id: 2,
      carName: "Porsche 911 GT3",
      image: "https://images.unsplash.com/photo-1503376710926-259168923a1a?q=80&w=2070&auto=format&fit=crop",
      startDate: "2026-06-15",
      endDate: "2026-06-17",
      totalPrice: 950,
      status: "Pending"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)] text-white mb-2">My Bookings</h1>
          <p className="text-white/60 font-[family-name:var(--font-inter)] text-lg">Manage and view your upcoming and past luxury rentals.</p>
        </div>
        <Link href="/cars" className="bg-[#f2ca50] text-black px-6 py-3 rounded-full font-semibold font-[family-name:var(--font-inter)] hover:bg-white transition-colors">
          Book Another Car
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:border-[#f2ca50]/50 transition-all duration-300 group shadow-xl">
            <div className="h-56 overflow-hidden relative">
              <img src={booking.image} alt={booking.carName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <span className={`text-xs font-semibold uppercase tracking-wider ${booking.status === 'Confirmed' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {booking.status}
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-montserrat)]">{booking.carName}</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-white/70 text-sm font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[20px] mr-3 text-[#f2ca50]">calendar_month</span>
                  {booking.startDate} to {booking.endDate}
                </div>
                <div className="flex items-center text-white/70 text-sm font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[20px] mr-3 text-[#f2ca50]">payments</span>
                  ${booking.totalPrice} Total
                </div>
              </div>
              <div className="flex gap-4">
                 <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-medium transition-colors border border-white/5">
                   View Details
                 </button>
                 <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl text-sm font-medium transition-colors border border-red-500/20">
                   Cancel
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
