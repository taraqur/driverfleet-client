"use client";

import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PremiumFleet from '@/components/PremiumFleet';
import HowItWorks from '@/components/HowItWorks';
import CustomerReviews from '@/components/CustomerReviews';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PremiumFleet />
      <HowItWorks />
      <CustomerReviews />
    </>
  );
}
