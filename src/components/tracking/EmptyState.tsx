'use client';

import React, { useState } from 'react';
import { PackageSearch, Search, ArrowRight, Sparkles } from 'lucide-react';
import { ScenarioId } from '@/types/order';

interface EmptyStateProps {
  onSelectScenario: (scenario: ScenarioId) => void;
}

export function EmptyState({ onSelectScenario }: EmptyStateProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Route to normal scenario for demo
    onSelectScenario('normal');
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 text-center space-y-5 shadow-xs">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">
        <PackageSearch className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Order Not Found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
          We couldn't find tracking records matching this order ID. Please verify your order number or select a demo order below.
        </p>
      </div>

      {/* Lookup search bar */}
      <form onSubmit={handleSearch} className="max-w-xs mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. ORD-89421"
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs active:scale-95 transition-all"
          aria-label="Search order"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick click demo samples */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Try Quick Demo Orders:
        </span>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => onSelectScenario('normal')}
            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-800 transition-colors"
          >
            #ORD-89421 (Active)
          </button>
          <button
            onClick={() => onSelectScenario('delayed')}
            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-medium border border-amber-200 dark:border-amber-800 transition-colors"
          >
            #ORD-74219 (Delayed)
          </button>
          <button
            onClick={() => onSelectScenario('delivered_not_received')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800 transition-colors"
          >
            #ORD-61205 (Delivered)
          </button>
        </div>
      </div>
    </div>
  );
}
