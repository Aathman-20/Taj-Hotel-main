'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function HydrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Manually trigger rehydration after React has finished hydrating the DOM,
    // preventing a mismatch between SSR-rendered and localStorage-persisted cart state.
    useCartStore.persist.rehydrate();
  }, []);
  return <>{children}</>;
}
