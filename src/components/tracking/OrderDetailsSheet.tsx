'use client';

import React from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { OrderData } from '@/types/order';
import { formatCurrency } from '@/lib/formatters';
import { CreditCard, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface OrderDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData;
}

export function OrderDetailsSheet({ isOpen, onClose, order }: OrderDetailsSheetProps) {
  const { items, pricing, address, orderNumber, orderDate } = order;
  const { showToast } = useToast();

  const handleDownloadInvoice = () => {
    showToast(`Invoice for ${orderNumber} downloaded successfully (PDF)`, 'success');
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Order Details & Receipt"
      description={`Invoice #${orderNumber} • Placed on ${orderDate}`}
    >
      <div className="space-y-4">
        {/* Items Breakdown */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Purchased Items ({items.length})
          </h4>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/40 dark:bg-slate-800/30">
            {items.map((item) => (
              <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                <div className="flex-1 pr-3">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Qty: {item.quantity} • {item.variant}
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50/40 dark:bg-slate-800/30 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Items Subtotal</span>
            <span>{formatCurrency(pricing.subtotal)}</span>
          </div>

          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Shipping & Handling</span>
            <span>
              {pricing.shipping === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  FREE Express
                </span>
              ) : (
                formatCurrency(pricing.shipping)
              )}
            </span>
          </div>

          {pricing.discount > 0 && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <span>Promotional Discount</span>
              <span>-{formatCurrency(pricing.discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Estimated Sales Tax</span>
            <span>{formatCurrency(pricing.tax)}</span>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-bold text-slate-900 dark:text-slate-100">
            <span>Total Paid</span>
            <span>{formatCurrency(pricing.total)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/40 dark:bg-slate-800/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                {pricing.paymentMethod}
              </span>
              <span className="text-[11px] text-slate-500">
                Card ending in •••• {pricing.paymentLast4}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </span>
        </div>

        {/* Download Invoice Action */}
        <div className="pt-2">
          <button
            onClick={handleDownloadInvoice}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Download className="w-4 h-4" />
            Download Official Invoice (PDF)
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
