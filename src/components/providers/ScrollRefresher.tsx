'use client';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * Calls ScrollTrigger.refresh() after a short delay once the page has fully mounted.
 * Fixes pinning offset issues caused by dynamic content (fonts, images) loading
 * after the initial ScrollTrigger setup.
 */
export default function ScrollRefresher() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return null;
}
