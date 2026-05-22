"use client";
import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: "Alexander Pierce",
    role: "CEO, TechVentures",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "An absolute phenomenal experience. The vehicle was in pristine condition, and the concierge service was impeccable. DriveFleet has redefined luxury rentals for me."
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "Creative Director",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "From the seamless booking process to the moment I returned the keys, everything was flawless. The attention to detail and customer care is truly unmatched."
  },
  {
    id: 3,
    name: "James Sterling",
    role: "Private Investor",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    rating: 5,
    text: "I travel frequently and have used many premium rental services globally. DriveFleet stands out with their exclusive collection and exceptional VIP treatment."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const CustomerReviews = () => {
  return (
    <section className="py-20 md:py-28 bg-[#f8f9fa] dark:bg-[#110e07] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-[#f2ca50]/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#f2ca50] font-[family-name:var(--font-heading)] font-bold tracking-widest uppercase text-sm mb-3 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white font-[family-name:var(--font-heading)] mb-4">
            Hear From Our <span className="text-[#f2ca50]">Clients</span>
          </h2>
          <p className="text-black/60 dark:text-white/60 font-[family-name:var(--font-body)] max-w-2xl mx-auto text-lg">
            Discover why industry leaders and luxury enthusiasts choose DriveFleet for their premium automotive experiences.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              variants={cardVariants}
              className="bg-white dark:bg-[#1a1814] p-8 rounded-3xl border border-black/5 dark:border-white/5 hover:border-[#f2ca50]/30 dark:hover:border-[#f2ca50]/30 transition-colors duration-300 shadow-lg hover:shadow-xl group relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-[#f2ca50]/20 group-hover:text-[#f2ca50]/40 transition-colors duration-300">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 text-[#f2ca50]">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-black/80 dark:text-white/80 font-[family-name:var(--font-body)] text-[15px] leading-relaxed mb-8 relative z-10 italic">
                "{review.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#f2ca50]/50"
                />
                <div>
                  <h4 className="text-black dark:text-white font-bold font-[family-name:var(--font-heading)] text-[16px]">{review.name}</h4>
                  <p className="text-black/50 dark:text-white/50 font-[family-name:var(--font-body)] text-[13px]">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
