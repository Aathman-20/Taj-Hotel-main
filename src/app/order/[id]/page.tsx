'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { CheckCircle2, ChefHat, Package, Truck } from 'lucide-react';

const STATUSES = [
  { key: 'placed', label: 'Order Placed', icon: CheckCircle2, desc: 'We have received your order' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, desc: 'Our chefs are at work' },
  { key: 'ready', label: 'Ready', icon: Package, desc: 'Your order is ready' },
  { key: 'delivered', label: 'Delivered', icon: Truck, desc: 'Enjoy your meal' },
];

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/orders?id=${id}`)
      .then((r) => r.json())
      .then((data) => { setOrder(data); setLoading(false); });
  }, [id]);

  useEffect(() => {
    if (!order || !progressRef.current) return;
    const statusIndex = STATUSES.findIndex((s) => s.key === order.status);
    const progress = ((statusIndex + 1) / STATUSES.length) * 100;
    gsap.to(progressRef.current, { width: `${progress}%`, duration: 1.2, ease: 'power2.out', delay: 0.3 });
  }, [order]);

  if (loading) {
    return (
      <main className="min-h-screen bg-taj-dark flex items-center justify-center">
        <p className="font-cormorant italic text-taj-offwhite/50 text-xl animate-pulse">Retrieving your order...</p>
      </main>
    );
  }

  const currentStatusIndex = STATUSES.findIndex((s) => s.key === order?.status);

  return (
    <main className="min-h-screen bg-taj-dark pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase mb-3">Order Confirmation</p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-taj-cream mb-2">Thank you, {order?.customerName}</h1>
          <p className="font-garamond italic text-taj-offwhite/50 text-sm">Order #{id?.slice(-8).toUpperCase()}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="h-px bg-taj-gold/20 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-taj-gold rounded-full" style={{ width: '0%' }} />
          </div>
        </div>

        {/* Status steps */}
        <div className="space-y-6 mb-12">
          {STATUSES.map((status, i) => {
            const isComplete = i <= currentStatusIndex;
            const Icon = status.icon;
            return (
              <div key={status.key} className={`flex items-center gap-5 transition-opacity duration-500 ${isComplete ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-500 ${
                  isComplete ? 'bg-taj-gold border-taj-gold text-taj-dark' : 'border-taj-gold/30 text-taj-offwhite/30'
                }`}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-cinzel text-xs tracking-[0.15em] uppercase text-taj-offwhite">{status.label}</p>
                  <p className="font-garamond italic text-taj-offwhite/50 text-sm">{status.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="border border-taj-gold/20 rounded-lg p-6">
          <p className="font-cinzel text-xs tracking-widest text-taj-gold uppercase mb-4">Order Summary</p>
          <div className="space-y-3">
            {order?.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="font-garamond text-taj-offwhite/80">{item.name} × {item.quantity}</span>
                <span className="font-cinzel text-taj-gold text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-taj-gold/20 mt-4 pt-4 flex justify-between">
            <span className="font-cinzel text-xs tracking-widest text-taj-offwhite/60 uppercase">Total</span>
            <span className="font-cormorant text-2xl text-taj-gold">₹{order?.totalAmount?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
