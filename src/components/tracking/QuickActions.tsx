'use client';

import React from 'react';
import { Headphones, AlertCircle, ReceiptText, ChevronRight } from 'lucide-react';

interface QuickActionsProps {
  onOpenSupport: () => void;
  onOpenIssueForm: () => void;
  onOpenDetails: () => void;
}

export function QuickActions({
  onOpenSupport,
  onOpenIssueForm,
  onOpenDetails,
}: QuickActionsProps) {
  return (
    <div className="space-y-2.5">
      {/* Primary Support Button */}
      <button
        onClick={onOpenSupport}
        className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs flex items-center justify-between shadow-xs transition-all group"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/80 text-white">
            <Headphones className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block leading-tight">Need Help With This Order?</span>
            <span className="text-[10px] font-normal text-blue-100">
              Live Chat • Call Courier • Email Support
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenIssueForm}
          className="p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 active:scale-98 transition-all text-left group"
        >
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Report an Issue
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Damaged, wrong, or late items
          </p>
        </button>

        <button
          onClick={onOpenDetails}
          className="p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 active:scale-98 transition-all text-left group"
        >
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 mb-1">
            <ReceiptText className="w-3.5 h-3.5" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Order Receipt
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Invoice, payment, and tax breakdown
          </p>
        </button>
      </div>
    </div>
  );
}
