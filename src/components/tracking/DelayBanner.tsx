'use client';

import React, { useState } from 'react';
import { AlertTriangle, Sparkles, MessageSquare, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface DelayBannerProps {
  delayDays?: number;
  delayReason?: string;
  revisedEta: string;
  onOpenSupport: () => void;
  onReportIssue: () => void;
}

export function DelayBanner({
  delayDays = 2,
  delayReason = 'Transportation delay en route',
  revisedEta,
  onOpenSupport,
  onReportIssue,
}: DelayBannerProps) {
  const [creditClaimed, setCreditClaimed] = useState(false);
  const [updateRequested, setUpdateRequested] = useState(false);
  const { showToast } = useToast();

  const handleClaimCredit = () => {
    setCreditClaimed(true);
    showToast('$10 Delivery Guarantee Credit added to your account wallet!', 'success');
  };

  const handleRequestUpdate = () => {
    setUpdateRequested(true);
    showToast('Carrier dispatch pinged! SMS update will arrive within 60 mins.', 'info');
  };

  return (
    <section
      aria-label="Delivery Delay Notice"
      className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 p-4 shadow-xs"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-100">
              Running late by {delayDays} {delayDays === 1 ? 'day' : 'days'}
            </h3>
            <span className="text-[10px] font-bold uppercase bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full">
              Delay Alert
            </span>
          </div>

          <p className="text-xs text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
            We are deeply sorry for the delay! Your shipment encountered an unexpected delay:{' '}
            <span className="font-semibold italic">"{delayReason}"</span>.
          </p>

          <div className="mt-2.5 p-2 rounded-lg bg-amber-100/70 dark:bg-amber-900/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-between text-xs">
            <span className="text-amber-900 dark:text-amber-200 font-medium">
              New Expected Delivery:
            </span>
            <span className="font-bold text-amber-950 dark:text-amber-100">
              {revisedEta}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            {!creditClaimed ? (
              <button
                onClick={handleClaimCredit}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-medium text-xs shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Claim $10 Guarantee Credit
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                $10 Credit Claimed
              </span>
            )}

            {!updateRequested ? (
              <button
                onClick={handleRequestUpdate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-medium text-xs transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Request Driver Update
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                Update Requested
              </span>
            )}

            <button
              onClick={onOpenSupport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-medium text-xs transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
