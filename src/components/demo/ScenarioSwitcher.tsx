'use client';

import React, { useState } from 'react';
import { ScenarioId } from '@/types/order';
import {
  Sliders,
  CheckCircle2,
  ClockAlert,
  HelpCircle,
  Sparkles,
  Loader2,
  AlertTriangle,
  PackageSearch,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScenarioSwitcherProps {
  currentScenario: ScenarioId;
  onSelectScenario: (scenario: ScenarioId) => void;
}

interface ScenarioOption {
  id: ScenarioId;
  label: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const SCENARIOS: ScenarioOption[] = [
  {
    id: 'normal',
    label: 'Normal / Active',
    badge: 'Out for Delivery',
    description: 'On-track delivery with active courier route, ETA window, and carrier timeline.',
    icon: CheckCircle2,
    color: 'text-blue-500',
  },
  {
    id: 'delayed',
    label: 'Delayed Order',
    badge: 'Running Late by 2d',
    description: 'Notice banner, revised ETA, apology note, and $10 credit claim action.',
    icon: ClockAlert,
    color: 'text-amber-500',
  },
  {
    id: 'delivered_not_received',
    label: 'Delivered (Not Received)',
    badge: 'Proof & Guided Flow',
    description: 'Proof photo & note, plus guided checklist wizard to find package or report claim.',
    icon: HelpCircle,
    color: 'text-emerald-500',
  },
  {
    id: 'untracked',
    label: 'No Tracking Yet',
    badge: 'Warehouse Stage',
    description: 'Friendly preparation stage with fulfillment timeline and SMS/Email alert toggle.',
    icon: Sparkles,
    color: 'text-purple-500',
  },
  {
    id: 'loading',
    label: 'Loading State',
    badge: 'Skeleton UI',
    description: 'Animated shimmer placeholders matching screen layout.',
    icon: Loader2,
    color: 'text-slate-400',
  },
  {
    id: 'error',
    label: 'Error State',
    badge: 'Network Failure',
    description: 'Failure screen with retry button and direct support trigger.',
    icon: AlertTriangle,
    color: 'text-rose-500',
  },
  {
    id: 'empty',
    label: 'Empty / Not Found',
    badge: 'Search Order',
    description: 'Missing order state with interactive ID search input.',
    icon: PackageSearch,
    color: 'text-slate-500',
  },
];

export function ScenarioSwitcher({
  currentScenario,
  onSelectScenario,
}: ScenarioSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption =
    SCENARIOS.find((s) => s.id === currentScenario) || SCENARIOS[0];

  return (
    <>
      {/* Floating Pill Trigger (Fixed at Bottom-Right or Top-Right) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 dark:bg-white/90 hover:bg-slate-900 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-xl backdrop-blur-md border border-slate-700/50 dark:border-slate-300/50 active:scale-95 transition-all group"
          aria-label="Toggle demo scenario switcher"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600 group-hover:rotate-45 transition-transform" />
          <span>Demo Scenario:</span>
          <span className="font-semibold text-blue-300 dark:text-blue-700 max-w-[120px] truncate">
            {activeOption.label}
          </span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 opacity-70" />
          )}
        </button>
      </div>

      {/* Expanded Scenario Switcher Panel / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-3 animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Scenario Switcher
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Switch between review scenarios & edge cases
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scenario Options List */}
            <div className="space-y-2">
              {SCENARIOS.map((scenario) => {
                const Icon = scenario.icon;
                const isSelected = currentScenario === scenario.id;

                return (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      onSelectScenario(scenario.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 group',
                      isSelected
                        ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-500 dark:border-blue-500 shadow-xs'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', scenario.color)} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              'text-xs font-bold',
                              isSelected
                                ? 'text-blue-900 dark:text-blue-100'
                                : 'text-slate-800 dark:text-slate-200'
                            )}
                          >
                            {scenario.label}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                            {scenario.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                          {scenario.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5 ring-4 ring-blue-100 dark:ring-blue-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
