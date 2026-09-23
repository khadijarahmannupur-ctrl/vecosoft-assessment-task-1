'use client';

import React, { useState } from 'react';
import { OrderData } from '@/types/order';
import { Clock, Truck, ShieldCheck, Copy, Check, Navigation, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface EtaCardProps {
  order: OrderData;
}

export function EtaCard({ order }: { order: OrderData }) {
  const { eta, carrier, status } = order;
  const [copiedTrack, setCopiedTrack] = useState(false);
  const { showToast } = useToast();

  const handleCopyTracking = () => {
    if (!carrier.trackingNumber) return;
    navigator.clipboard.writeText(carrier.trackingNumber);
    setCopiedTrack(true);
    showToast(`Copied tracking number ${carrier.trackingNumber}`, 'success');
    setTimeout(() => setCopiedTrack(false), 2000);
  };

  const isDelivered = status === 'delivered';
  const isDelayed = status === 'delayed' || !!eta.isDelayed;
  const isUntracked = status === 'untracked';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-5 border shadow-sm transition-all',
        isDelayed
          ? 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-300 dark:border-amber-800/80'
          : isDelivered
          ? 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-300 dark:border-emerald-800/80'
          : 'bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent border-blue-200 dark:border-blue-800/70'
      )}
    >
      {/* Background soft glow accent */}
      <div
        className={cn(
          'absolute -right-12 -top-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none',
          isDelayed ? 'bg-amber-500' : isDelivered ? 'bg-emerald-500' : 'bg-blue-600'
        )}
      />

      {/* Top Tag */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          {isDelivered ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Delivery Completed
            </>
          ) : isDelayed ? (
            <>
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Updated Delivery Estimate
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Estimated Delivery
            </>
          )}
        </span>

        {eta.relativeCountdown && (
          <span
            className={cn(
              'text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-2xs',
              isDelayed
                ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700'
                : isDelivered
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700'
                : 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-700'
            )}
          >
            {eta.relativeCountdown}
          </span>
        )}
      </div>

      {/* Prominent Date / Time Window */}
      <div className="mt-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {eta.displayDate}
        </h2>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
          {isDelivered ? eta.timeWindow : `Expected window: ${eta.timeWindow}`}
        </p>

        {isDelayed && eta.originalDate && (
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 flex items-center gap-1">
            <span className="line-through opacity-75">Originally: {eta.originalDate}</span>
            <span className="font-semibold">(+{eta.delayDays || 2} days)</span>
          </p>
        )}
      </div>

      {/* Visual Progress Bar */}
      {!isUntracked && (
        <div className="mt-4">
          <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            <span>Progress</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {eta.progressPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-700 ease-out',
                isDelayed
                  ? 'bg-amber-500'
                  : isDelivered
                  ? 'bg-emerald-500'
                  : 'bg-blue-600'
              )}
              style={{ width: `${eta.progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Carrier & Driver Quick Details */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {carrier.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
              {carrier.service}
            </span>
          </div>

          {carrier.trackingNumber && !isUntracked && (
            <button
              onClick={handleCopyTracking}
              className="flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
              aria-label="Copy carrier tracking number"
            >
              <span>{carrier.trackingNumber.slice(0, 10)}...</span>
              {copiedTrack ? (
                <Check className="w-3 h-3 text-emerald-500" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>
          )}
        </div>

        {carrier.driverName && status === 'out_for_delivery' && (
          <div className="flex items-center justify-between bg-white/70 dark:bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-200/50 dark:border-slate-700/50 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px]">
                {carrier.driverName.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block leading-tight">
                  Driver: {carrier.driverName}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {carrier.driverVehicle}
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2 py-0.5 rounded-md border border-blue-200/50 dark:border-blue-800/50">
              <Navigation className="w-2.5 h-2.5 animate-pulse" />
              12 stops away
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
