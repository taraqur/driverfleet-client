"use client";

import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PremiumFleet from '@/components/PremiumFleet';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PremiumFleet />
      <HowItWorks />
    </>
  );
}
