'use client';
import { motion } from 'motion/react';
import { CheckCircle, Clock, ChefHat, Package, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  orderType: string;
  status: string;
  totalAmount: number;
  notes?: string | null;
  items: OrderItem[];
  createdAt: string;
}

const STATUS_STEPS = [
  { key: 'placed',    label: 'Order Placed',     icon: CheckCircle, description: 'We have received your order' },
  { key: 'preparing', label: 'Preparing',         icon: ChefHat,    description: 'Our chefs are crafting your meal' },
  { key: 'ready',     label: 'Ready',             icon: Package,    description: 'Your order is ready' },
  { key: 'delivered', label: 'Delivered',         icon: MapPin,     description: 'Enjoy your meal!' },
] as const;

const STATUS_ORDER = ['placed', 'preparing', 'ready', 'delivered'];

export default function OrderTrackingClient({ order }: { order: Order }) {
  const currentStep = STATUS_ORDER.indexOf(order.status);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <main className="min-h-screen bg-taj-dark pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-taj-gold/30 bg-taj-gold/10 mb-6">
            <CheckCircle size={28} className="text-taj-gold" strokeWidth={1.5} />
          </div>
          <p className="font-cinzel text-xs tracking-[0.3em] text-taj-gold/60 uppercase mb-2">
            Shamiana · The Taj Mahal Palace
          </p>
          <h1 className="font-cinzel text-2xl md:text-3xl text-taj-offwhite tracking-wide mb-2">
            Order Confirmed
          </h1>
          <p className="font-garamond italic text-taj-offwhite/50">
            Thank you, {order.customerName}
          </p>
          <p className="font-cinzel text-[10px] tracking-widest text-taj-offwhite/30 uppercase mt-3">
            Order #{order.id.slice(-8).toUpperCase()}
          </p>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-[#1F1710] border border-taj-gold/15 p-8 mb-6"
        >
          <h2 className="font-cinzel text-xs tracking-[0.2em] text-taj-offwhite/60 uppercase mb-8">
            Order Status
          </h2>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-5 top-5 bottom-5 w-px bg-taj-gold/10" />
            <div
              className="absolute left-5 top-5 w-px bg-taj-gold/60 transition-all duration-1000"
              style={{ height: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
            />

            <div className="space-y-8">
              {STATUS_STEPS.map((step, index) => {
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex gap-6 items-start relative z-10"
                  >
                    {/* Step circle */}
                    <div
                      className={`w-10 h-10 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-500 ${
                        isCompleted
                          ? 'border-taj-gold bg-taj-gold/20 text-taj-gold'
                          : 'border-taj-gold/15 bg-taj-dark text-taj-offwhite/20'
                      } ${isCurrent ? 'shadow-[0_0_16px_rgba(201,162,75,0.3)]' : ''}`}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </div>

                    <div className="pt-1.5">
                      <p className={`font-cinzel text-sm tracking-wide ${isCompleted ? 'text-taj-offwhite' : 'text-taj-offwhite/30'}`}>
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 font-garamond text-xs text-taj-gold italic normal-case tracking-normal">
                            — current
                          </span>
                        )}
                      </p>
                      <p className={`font-garamond text-sm mt-0.5 ${isCompleted ? 'text-taj-offwhite/50' : 'text-taj-offwhite/20'}`}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#1F1710] border border-taj-gold/15 p-8 mb-6"
        >
          <h2 className="font-cinzel text-xs tracking-[0.2em] text-taj-offwhite/60 uppercase mb-6">
            Order Details
          </h2>

          {/* Items */}
          <div className="space-y-3 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-taj-gold/8">
                <div>
                  <p className="font-marcellus text-taj-cream text-sm">{item.name}</p>
                  <p className="font-garamond text-taj-offwhite/40 text-xs">×{item.quantity}</p>
                </div>
                <p className="font-cinzel text-taj-gold text-sm">₹{(item.price * item.quantity).toFixed(0)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="font-cinzel text-xs tracking-widest text-taj-offwhite/60 uppercase">Total Paid</span>
            <span className="font-cormorant text-3xl text-taj-gold">₹{order.totalAmount.toFixed(2)}</span>
          </div>
        </motion.div>

        {/* Customer Info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#1F1710] border border-taj-gold/15 p-8 mb-10"
        >
          <h2 className="font-cinzel text-xs tracking-[0.2em] text-taj-offwhite/60 uppercase mb-6">
            Delivery Information
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <User size={14} className="text-taj-gold/60 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-cinzel text-[10px] tracking-widest text-taj-offwhite/40 uppercase">Name</p>
                <p className="font-garamond text-taj-offwhite">{order.customerName}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Phone size={14} className="text-taj-gold/60 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-cinzel text-[10px] tracking-widest text-taj-offwhite/40 uppercase">Phone</p>
                <p className="font-garamond text-taj-offwhite">{order.phone}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin size={14} className="text-taj-gold/60 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-cinzel text-[10px] tracking-widest text-taj-offwhite/40 uppercase">
                  {order.orderType === 'delivery' ? 'Address' : 'Pickup Point'}
                </p>
                <p className="font-garamond text-taj-offwhite">{order.address}</p>
              </div>
            </div>
            {order.notes && (
              <div className="flex gap-3 items-start">
                <Clock size={14} className="text-taj-gold/60 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-cinzel text-[10px] tracking-widest text-taj-offwhite/40 uppercase">Special Instructions</p>
                  <p className="font-garamond italic text-taj-offwhite/70">{order.notes}</p>
                </div>
              </div>
            )}
            <div className="flex gap-3 items-start pt-2 border-t border-taj-gold/10 mt-4">
              <Clock size={14} className="text-taj-gold/60 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-cinzel text-[10px] tracking-widest text-taj-offwhite/40 uppercase">Placed At</p>
                <p className="font-garamond text-taj-offwhite/60">{formatDate(order.createdAt)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="font-cinzel text-xs tracking-[0.2em] uppercase border border-taj-gold/40 text-taj-gold px-10 py-4 hover:bg-taj-gold hover:text-taj-dark transition-all duration-300 text-center"
          >
            Order More
          </Link>
          <Link
            href="/"
            className="font-cinzel text-xs tracking-[0.2em] uppercase border border-taj-gold/15 text-taj-offwhite/50 px-10 py-4 hover:border-taj-gold/40 hover:text-taj-offwhite transition-all duration-300 text-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
