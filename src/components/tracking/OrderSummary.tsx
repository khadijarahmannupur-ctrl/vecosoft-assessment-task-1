'use client';

import React from 'react';
import { OrderItem, ShippingAddress } from '@/types/order';
import { formatCurrency } from '@/lib/formatters';
import { MapPin, Phone, Package, ChevronRight, FileText } from 'lucide-react';

interface OrderSummaryProps {
  items: OrderItem[];
  address: ShippingAddress;
  total: number;
  onViewOrderDetails: () => void;
}

export function OrderSummary({
  items,
  address,
  total,
  onViewOrderDetails,
}: OrderSummaryProps) {
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-slate-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Package Items ({totalItemCount})
          </h3>
        </div>

        <button
          onClick={onViewOrderDetails}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-0 right-0 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-md">
                x{item.quantity}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {item.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {item.variant}
              </p>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                {formatCurrency(item.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address & Delivery Notes */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-start gap-2.5 text-xs">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Delivery Address
              </span>
              <span className="text-[11px] text-slate-500">{address.fullName}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
              {address.street} {address.apt && `, ${address.apt}`}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              {address.city}, {address.state} {address.zip}
            </p>

            {address.deliveryNotes && (
              <div className="mt-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Driver Instructions:{' '}
                </span>
                {address.deliveryNotes}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
