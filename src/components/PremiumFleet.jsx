import React from 'react';

const PremiumFleet = () => {
  return (
    <section className="py-24 bg-[#16130b]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-montserrat)] text-[32px] font-bold text-[#e6e6e6] mb-2 tracking-tight">Premium Fleet</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60">Selected high-performance vehicles for the discerning driver.</p>
          </div>
          <button className="flex items-center gap-2 text-[#f2ca50] font-[family-name:var(--font-inter)] text-[15px] font-bold hover:gap-3 transition-all pb-1">
            View All <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Car Card 1 */}
          <div className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img alt="Ferrari 488" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOnMjq3QLtPPJcp7m3-yEmjv2hoEljmWPTycl0zOTWVQS96QnWOQzZseVRv0AYda41e-VCpgVYRwL6m4znVKd7i3pvv0t5jeskW3dMSDxEDkHEI8I8tSzbS4TCi9gunJL4721Plb1VMBSMVuYifNP4rc1YhcrRmT46W_7M-aXavV_aL1zSjHtTBqtXo0kphIc2e48carY9COonuC-P8hyyJpwDFQg9uF0xANs0uDPNNHb-F4bQVpYpa0H3XBde4a1oejs7xwPDIIKP"/>
              {/* Available Tag */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full">Available</div>
              {/* Price Tag */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-md text-[#f2ca50] text-[13px] font-bold">
                $800 <span className="text-[#f2ca50]/70 text-[11px] font-medium">/ day</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <h3 className="font-[family-name:var(--font-inter)] text-[17px] font-bold text-white mb-1">Ferrari 488 GTB</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">Luxury Sports</p>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">event_seat</span> 2 Seats
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">settings</span> Automatic
                </div>
              </div>
              <button className="w-full py-3 bg-[#23201a] rounded-lg font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:bg-[#332f26] transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Car Card 2 */}
          <div className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img alt="BMW M4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTzNvdgFbLHdPaH_3yuKsXv3mjmHk-LXKfR9VQwvluwEVCdZATNB2I96ryHpkLfKeweKwtv1RKbfQHpwp_c3ikoRh36SdncYHPX4lg4FCYBaRspP7EBKzavFXfo-3RRzVcQeifZCYhJY4_KOEgDpG2OOVxD0GViOA-_WY8MhJuhGrADJ7xuc4vIF89n2BvP03EXdP1ePch5_1wd_QY64-EXBE9Qoi-9SEaHptw6Tz5KwRZndynLVuKXfH1yCq1RBpWCY-c2Sue8mXr"/>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full">Available</div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-md text-[#f2ca50] text-[13px] font-bold">
                $350 <span className="text-[#f2ca50]/70 text-[11px] font-medium">/ day</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <h3 className="font-[family-name:var(--font-inter)] text-[17px] font-bold text-white mb-1">BMW M4 Competition</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">Performance Coupe</p>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">event_seat</span> 4 Seats
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">bolt</span> Electric Blue
                </div>
              </div>
              <button className="w-full py-3 bg-[#23201a] rounded-lg font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:bg-[#332f26] transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Car Card 3 */}
          <div className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img alt="Tesla Model S" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEcMQ790A96VtYpmjJxMjCrGGSv-IciLhx8lTl5KZKI-Yt0EB6Jke8QDavlbQfXTrar0PIWrvgcwKZjIVS9lUik7Da9VfSWGu_wUrRwd8BiTyiYayuFsmxSsyCuMtcrhiHtAz5YzPcZAlJq5CRb-FnCDCOhDEzhN1vH5c1pu3QOoGXgRtG9BSlD4KjYLKTxfc_soj0Nwg_WeCviRDGw0A-kiygWTMbcoJzuoNY3n7HismWLl0WNzylyd1zycMHIORohfgyoaHAxSGU"/>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full">Available</div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-md text-[#f2ca50] text-[13px] font-bold">
                $280 <span className="text-[#f2ca50]/70 text-[11px] font-medium">/ day</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <h3 className="font-[family-name:var(--font-inter)] text-[17px] font-bold text-white mb-1">Tesla Model S Plaid</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">Luxury Electric</p>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">event_seat</span> 5 Seats
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">battery_charging_full</span> Electric
                </div>
              </div>
              <button className="w-full py-3 bg-[#23201a] rounded-lg font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:bg-[#332f26] transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Car Card 4 */}
          <div className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img alt="Mercedes G-Wagon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-9_RVjkJX58TWl7tQxHPTn8CltkUwdla6G8elQBJn2RuT8NitVs4-zcMTPMyQAQt3jD8C9bajabQHilTAm4g6FrH2fj-IWUWZ-oVp30nDlaoDqxujuKQSTjp2JDYD3NLjjZBQGYfAcifx0DJJUVgszG-nwdWUHpaaibWF8iY5P7h9fEuSOhkfdi68LzDFastlRC_Pir73D5Umtiz5lCkuVwVbLSnf76dl0AQxgwam5Tn_FUOqUmC1UFGP5ObdpdRCMj7QyWZr0_Ae"/>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full">Available</div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-md text-[#f2ca50] text-[13px] font-bold">
                $650 <span className="text-[#f2ca50]/70 text-[11px] font-medium">/ day</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <h3 className="font-[family-name:var(--font-inter)] text-[17px] font-bold text-white mb-1">Mercedes-AMG G 63</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">Luxury SUV</p>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">event_seat</span> 5 Seats
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">terrain</span> AWD
                </div>
              </div>
              <button className="w-full py-3 bg-[#23201a] rounded-lg font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:bg-[#332f26] transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Car Card 5 */}
          <div className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img alt="Range Rover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFWXyFPMAO6AqJSVnWmZawzxvqSZjrWEVwrhsJ4dMRFqelR-SpOU4aE2lr1h1aoIpdA038kv6E3Jm37dPOEoyEJStIJZEof2M-MJ3LTJCWR9Xhvr0pxZNR4dHiWAuvWsDr6WUXflvEWckY7RrtWo8d5zpTKSn_tkvWKdm1ZkbIc6C1WD2BnChOUg3XM6yNCKGTyV42URSuzYnEC6MIEGDaQz57RXV_VhifMVj4RX5sRkfjSRWx7YUWXINLKAoheRnqgzpeJMAjWeYH"/>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full">Available</div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-md text-[#f2ca50] text-[13px] font-bold">
                $420 <span className="text-[#f2ca50]/70 text-[11px] font-medium">/ day</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <h3 className="font-[family-name:var(--font-inter)] text-[17px] font-bold text-white mb-1">Range Rover SV</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">Executive Luxury</p>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">event_seat</span> 7 Seats
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">chair</span> Executive
                </div>
              </div>
              <button className="w-full py-3 bg-[#23201a] rounded-lg font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:bg-[#332f26] transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Car Card 6 */}
          <div className="group rounded-2xl overflow-hidden bg-[#1a1814] border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img alt="Porsche Taycan" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfJyiVgSbW-_cHyboSBjdnLa4hc26ZNIShL3GhIg2ki5LZ8Wj3bxP9a_kK1khVeLJupyn3WEUOOhUwvO6yxPBSfTBBDebHWqgCDtysdVoKPFBXIxhCCjCNGwJTR7fZvWw49jqJRbamjG9dNx0x7JeiWMzCEMb5xuZuhCr9Gq5AepPCvbNrU95_aF4LVt4moezL1oAuyWaJCavjMaP5ZwVSR1fwwDrWMs56BvNlOHZDKKDgQjZC3OxHLE4WLWQlozLM5V8Dd3a_P1nb"/>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#adc6ff] text-[#001a41] text-[11px] font-bold tracking-wide rounded-full">Available</div>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-md text-[#f2ca50] text-[13px] font-bold">
                $400 <span className="text-[#f2ca50]/70 text-[11px] font-medium">/ day</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-5">
                <h3 className="font-[family-name:var(--font-inter)] text-[17px] font-bold text-white mb-1">Porsche Taycan Turbo S</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">Electric Performance</p>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">event_seat</span> 4 Seats
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#23201a] text-white/70 text-[12px] font-medium font-[family-name:var(--font-inter)]">
                  <span className="material-symbols-outlined text-[16px]">electric_car</span> Full EV
                </div>
              </div>
              <button className="w-full py-3 bg-[#23201a] rounded-lg font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:bg-[#332f26] transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PremiumFleet;
