'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  PackageCheck,
  CheckCircle2,
  Bell,
  Clock,
  MessageSquare,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface UntrackedStateProps {
  orderNumber: string;
  estimatedTrackingDate: string;
  warehouseCity: string;
  onOpenSupport: () => void;
}

export function UntrackedState({
  orderNumber,
  estimatedTrackingDate,
  warehouseCity,
  onOpenSupport,
}: UntrackedStateProps) {
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleToggleAlerts = () => {
    setSubscribed(!subscribed);
    showToast(
      !subscribed
        ? 'Real-time SMS & Email tracking alerts enabled!'
        : 'Tracking alerts disabled',
      !subscribed ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-4">
      {/* Friendly Informative Card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200 dark:border-indigo-800/60 p-5 shadow-2xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Order Confirmed & Preparing to Ship
              </h3>
              <span className="text-[10px] font-bold uppercase bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                In Warehouse
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400" />
              {warehouseCity}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Your order is confirmed and currently being hand-picked and carefully packed by our logistics team.
          Live courier tracking will activate automatically as soon as the carrier scans your package during daily pickup.
        </p>

        {/* Expected tracking arrival timestamp */}
        <div className="mt-3.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Tracking Info Available By:
            </span>
          </div>
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/60">
            {estimatedTrackingDate}
          </span>
        </div>

        {/* What happens next mini roadmap */}
        <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            What Happens Next?
          </h4>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs">
              <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">1. Order Placed & Payment Verified</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Inventory secured for this order.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-[10px] mt-0.5 font-bold animate-pulse">
                2
              </div>
              <div>
                <span className="font-semibold text-indigo-700 dark:text-indigo-300">2. Picking & Quality Check (Now)</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Items inspected and packaged in protective boxing.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 text-[10px] mt-0.5 font-bold">
                3
              </div>
              <div>
                <span className="font-semibold text-slate-600 dark:text-slate-400">3. Handed to Courier & Tracking Activated</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">FedEx / UPS scan generates live GPS route tracking.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time alerts opt-in button */}
        <div className="mt-4 pt-3 flex flex-col gap-2 border-t border-slate-200/70 dark:border-slate-800/80">
          <button
            onClick={handleToggleAlerts}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <Bell className="w-3.5 h-3.5" />
            {subscribed ? 'Tracking Notifications Active' : 'Notify Me When Tracking Goes Live'}
          </button>

          <button
            onClick={onOpenSupport}
            className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            Have questions about this shipment? Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
