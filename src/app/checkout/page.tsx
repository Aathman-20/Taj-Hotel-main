'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

const schema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  address: z.string().min(5, 'Enter a valid address'),
  orderType: z.enum(['delivery', 'pickup']),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { orderType: 'delivery' },
  });

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          orderType,
          items: items.map((i) => ({ menuItemId: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        }),
      });
      const json = await res.json();
      if (json.success) {
        clearCart();
        router.push(`/order/${json.orderId}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full bg-transparent border border-taj-gold/30 px-4 py-3 font-garamond text-taj-offwhite placeholder:text-taj-offwhite/30 focus:outline-none focus:border-taj-gold transition-colors duration-300 rounded-sm";
  const errorClass = "font-garamond text-red-400/80 text-sm mt-1 italic";
  const labelClass = "font-cinzel text-[10px] tracking-[0.15em] text-taj-gold uppercase mb-2 block";

  return (
    <main className="min-h-screen bg-taj-dark pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase mb-3">Shamiana</p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-taj-cream">Complete Your Order</h1>
          <p className="font-garamond italic text-taj-offwhite/60 mt-2">
            {items.length} {items.length === 1 ? 'dish' : 'dishes'} — ₹{totalPrice().toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className={labelClass}>Full Name</label>
            <input {...register('customerName')} className={inputClass} placeholder="Your name" />
            {errors.customerName && <p className={errorClass}>{errors.customerName.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input {...register('phone')} className={inputClass} placeholder="+91 00000 00000" />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>

          {/* Delivery / Pickup toggle */}
          <div>
            <label className={labelClass}>Order Type</label>
            <div className="relative flex bg-[#1F1710] rounded-full p-1 border border-taj-gold/20 w-fit">
              <div
                className="absolute top-1 left-1 h-[calc(100%-8px)] w-[120px] rounded-full bg-taj-gold transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ transform: orderType === 'pickup' ? 'translateX(120px)' : 'translateX(0)' }}
              />
              {(['delivery', 'pickup'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setOrderType(t)}
                  className={`relative z-10 w-[120px] py-2 font-cinzel text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                    orderType === t ? 'text-taj-dark' : 'text-taj-offwhite/60'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {orderType === 'delivery' && (
            <div>
              <label className={labelClass}>Delivery Address</label>
              <input {...register('address')} className={inputClass} placeholder="Full address" />
              {errors.address && <p className={errorClass}>{errors.address.message}</p>}
            </div>
          )}

          <div>
            <label className={labelClass}>Special Notes (optional)</label>
            <textarea {...register('notes')} className={`${inputClass} min-h-[100px] resize-none`} placeholder="Allergies, preferences..." />
          </div>

          <button
            type="submit"
            disabled={submitting || items.length === 0}
            className="w-full font-cinzel text-xs tracking-[0.2em] uppercase bg-taj-gold text-taj-dark 
                       py-4 hover:bg-taj-cream transition-colors duration-300 disabled:opacity-50 
                       disabled:cursor-not-allowed"
          >
            {submitting ? 'Placing Order...' : `Place Order — ₹${totalPrice().toFixed(2)}`}
          </button>
        </form>
      </div>
    </main>
  );
}
