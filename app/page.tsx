'use client';

import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import MicrostepsSection from '@/components/MicrostepsSection';
import OutcomesSection from '@/components/OutcomesSection';
import PopulationSection from '@/components/PopulationSection';
import CustomizationSection from '@/components/CustomizationSection';
import ComprehensiveCareSection from '@/components/ComprehensiveCareSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll as any);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll as any);
      });
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <MicrostepsSection />
      <OutcomesSection />
      <PopulationSection />
      <CustomizationSection />
      <ComprehensiveCareSection />
      <TestimonialsSection />
    </main>
  );
}
