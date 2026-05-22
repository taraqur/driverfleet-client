import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fleetCars = [
  {
    id: 1,
    name: "Ferrari 488 GTB",
    type: "Luxury Sports",
    price: 800,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOnMjq3QLtPPJcp7m3-yEmjv2hoEljmWPTycl0zOTWVQS96QnWOQzZseVRv0AYda41e-VCpgVYRwL6m4znVKd7i3pvv0t5jeskW3dMSDxEDkHEI8I8tSzbS4TCi9gunJL4721Plb1VMBSMVuYifNP4rc1YhcrRmT46W_7M-aXavV_aL1zSjHtTBqtXo0kphIc2e48carY9COonuC-P8hyyJpwDFQg9uF0xANs0uDPNNHb-F4bQVpYpa0H3XBde4a1oejs7xwPDIIKP",
    features: [
      { icon: "event_seat", text: "2 Seats" },
      { icon: "settings", text: "Automatic" }
    ]
  },
  {
    id: 2,
    name: "BMW M4 Competition",
    type: "Performance Coupe",
    price: 350,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTzNvdgFbLHdPaH_3yuKsXv3mjmHk-LXKfR9VQwvluwEVCdZATNB2I96ryHpkLfKeweKwtv1RKbfQHpwp_c3ikoRh36SdncYHPX4lg4FCYBaRspP7EBKzavFXfo-3RRzVcQeifZCYhJY4_KOEgDpG2OOVxD0GViOA-_WY8MhJuhGrADJ7xuc4vIF89n2BvP03EXdP1ePch5_1wd_QY64-EXBE9Qoi-9SEaHptw6Tz5KwRZndynLVuKXfH1yCq1RBpWCY-c2Sue8mXr",
    features: [
      { icon: "event_seat", text: "4 Seats" },
      { icon: "bolt", text: "Electric Blue" }
    ]
  },
  {
    id: 3,
    name: "Tesla Model S Plaid",
    type: "Luxury Electric",
    price: 280,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEcMQ790A96VtYpmjJxMjCrGGSv-IciLhx8lTl5KZKI-Yt0EB6Jke8QDavlbQfXTrar0PIWrvgcwKZjIVS9lUik7Da9VfSWGu_wUrRwd8BiTyiYayuFsmxSsyCuMtcrhiHtAz5YzPcZAlJq5CRb-FnCDCOhDEzhN1vH5c1pu3QOoGXgRtG9BSlD4KjYLKTxfc_soj0Nwg_WeCviRDGw0A-kiygWTMbcoJzuoNY3n7HismWLl0WNzylyd1zycMHIORohfgyoaHAxSGU",
    features: [
      { icon: "event_seat", text: "5 Seats" },
      { icon: "battery_charging_full", text: "Electric" }
    ]
  },
  {
    id: 4,
    name: "Mercedes-AMG G 63",
    type: "Luxury SUV",
    price: 650,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-9_RVjkJX58TWl7tQxHPTn8CltkUwdla6G8elQBJn2RuT8NitVs4-zcMTPMyQAQt3jD8C9bajabQHilTAm4g6FrH2fj-IWUWZ-oVp30nDlaoDqxujuKQSTjp2JDYD3NLjjZBQGYfAcifx0DJJUVgszG-nwdWUHpaaibWF8iY5P7h9fEuSOhkfdi68LzDFastlRC_Pir73D5Umtiz5lCkuVwVbLSnf76dl0AQxgwam5Tn_FUOqUmC1UFGP5ObdpdRCMj7QyWZr0_Ae",
    features: [
      { icon: "event_seat", text: "5 Seats" },
      { icon: "terrain", text: "AWD" }
    ]
  },
  {
    id: 5,
    name: "Range Rover SV",
    type: "Executive Luxury",
    price: 420,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFWXyFPMAO6AqJSVnWmZawzxvqSZjrWEVwrhsJ4dMRFqelR-SpOU4aE2lr1h1aoIpdA038kv6E3Jm37dPOEoyEJStIJZEof2M-MJ3LTJCWR9Xhvr0pxZNR4dHiWAuvWsDr6WUXflvEWckY7RrtWo8d5zpTKSn_tkvWKdm1ZkbIc6C1WD2BnChOUg3XM6yNCKGTyV42URSuzYnEC6MIEGDaQz57RXV_VhifMVj4RX5sRkfjSRWx7YUWXINLKAoheRnqgzpeJMAjWeYH",
    features: [
      { icon: "event_seat", text: "7 Seats" },
      { icon: "chair", text: "Executive" }
    ]
  },
  {
    id: 6,
    name: "Porsche Taycan Turbo S",
    type: "Electric Performance",
    price: 400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfJyiVgSbW-_cHyboSBjdnLa4hc26ZNIShL3GhIg2ki5LZ8Wj3bxP9a_kK1khVeLJupyn3WEUOOhUwvO6yxPBSfTBBDebHWqgCDtysdVoKPFBXIxhCCjCNGwJTR7fZvWw49jqJRbamjG9dNx0x7JeiWMzCEMb5xuZuhCr9Gq5AepPCvbNrU95_aF4LVt4moezL1oAuyWaJCavjMaP5ZwVSR1fwwDrWMs56BvNlOHZDKKDgQjZC3OxHLE4WLWQlozLM5V8Dd3a_P1nb",
    features: [
      { icon: "event_seat", text: "4 Seats" },
      { icon: "electric_car", text: "Full EV" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const PremiumFleet = () => {
  return (
    <section className="py-24 bg-[#f5f5f5] dark:bg-[#16130b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-black dark:text-[#e6e6e6] mb-2 tracking-tight">Premium Fleet</h2>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-black/60 dark:text-white/60">Selected high-performance vehicles for the discerning driver.</p>
          </div>
          <Link href="/cars" className="flex items-center gap-2 text-[#f2ca50] font-[family-name:var(--font-body)] text-[15px] font-bold hover:gap-3 transition-all pb-1">
            View All <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>

        {/* Cars Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {fleetCars.map((car) => (
            <motion.div 
              key={car.id}
              variants={cardVariants}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-[#1a1814] border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 shadow-lg dark:shadow-none transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img alt={car.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={car.image}/>
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full shadow-md">Available</div>
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-md text-black dark:text-[#f2ca50] text-[13px] font-bold shadow-md">
                  ${car.price} <span className="text-black/60 dark:text-[#f2ca50]/70 text-[11px] font-medium">/ day</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-5">
                  <h3 className="font-[family-name:var(--font-body)] text-[17px] font-bold text-black dark:text-white mb-1">{car.name}</h3>
                  <p className="font-[family-name:var(--font-body)] text-[13px] text-black/50 dark:text-white/50">{car.type}</p>
                </div>
                <div className="flex gap-3 mb-6">
                  {car.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-[#23201a] text-black/70 dark:text-white/70 text-[12px] font-medium font-[family-name:var(--font-body)]">
                      <span className="material-symbols-outlined text-[16px]">{feature.icon}</span> {feature.text}
                    </div>
                  ))}
                </div>
                <Link href="/cars" className="block text-center w-full py-3 bg-gray-100 dark:bg-[#23201a] rounded-lg font-[family-name:var(--font-body)] text-[14px] font-medium text-black hover:bg-gray-200 dark:text-white dark:hover:bg-[#332f26] transition-colors">
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default PremiumFleet;
