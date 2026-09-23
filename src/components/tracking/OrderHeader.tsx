'use client';

import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Share2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { DeliveryStatus } from '@/types/order';
import { useToast } from '@/components/ui/Toast';

interface OrderHeaderProps {
  orderNumber: string;
  orderDate: string;
  status: DeliveryStatus;
  onOpenSupport?: () => void;
}

export function OrderHeader({
  orderNumber,
  orderDate,
  status,
  onOpenSupport,
}: OrderHeaderProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    showToast(`Copied ${orderNumber} to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Order Tracking ${orderNumber}`,
          text: `Tracking status for order ${orderNumber}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Top action bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => {
            showToast('Back to orders list', 'info');
          }}
          className="p-2 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Go back to orders"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
            Order Tracking
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Share tracking link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order info and status strip */}
      <div className="px-4 pb-3.5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {orderNumber}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Copy Order ID"
              aria-label="Copy order number"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Placed on {orderDate}
          </p>
        </div>

        <div>
          <StatusBadge status={status} size="md" />
        </div>
      </div>
    </header>
  );
}
