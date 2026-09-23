'use client';

import React from 'react';
import { WifiOff, RotateCcw, HelpCircle, MessageSquare } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
  onOpenSupport: () => void;
}

export function ErrorState({ onRetry, onOpenSupport }: ErrorStateProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center space-y-4 shadow-xs">
      <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
        <WifiOff className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Unable to Load Tracking Details
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
          We encountered a temporary network glitch while communicating with carrier logistics servers.
        </p>
      </div>

      <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto">
        <button
          onClick={onRetry}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Loading Status</span>
        </button>

        <button
          onClick={onOpenSupport}
          className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          <span>Need help? Contact Support</span>
        </button>
      </div>
    </div>
  );
}
