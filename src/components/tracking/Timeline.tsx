'use client';

import React, { useState } from 'react';
import { TimelineStep, CarrierEvent } from '@/types/order';
import {
  Check,
  Clock,
  Truck,
  Package,
  Home,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  steps: TimelineStep[];
  carrierEvents?: CarrierEvent[];
}

export function Timeline({ steps, carrierEvents = [] }: TimelineProps) {
  const [showFullHistory, setShowFullHistory] = useState(false);

  const getStepIcon = (key: TimelineStep['key'], status: TimelineStep['status']) => {
    if (status === 'completed') {
      return <Check className="w-3.5 h-3.5 text-white stroke-[3]" />;
    }
    if (status === 'delayed') {
      return <AlertTriangle className="w-3.5 h-3.5 text-white" />;
    }

    switch (key) {
      case 'processing':
        return <Package className="w-3.5 h-3.5" />;
      case 'shipped':
        return <Package className="w-3.5 h-3.5" />;
      case 'out_for_delivery':
        return <Truck className="w-3.5 h-3.5" />;
      case 'delivered':
        return <Home className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
          Delivery Journey
        </h3>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          4 Milestones
        </span>
      </div>

      {/* Stepper list */}
      <div className="relative pl-1">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isDelayed = step.status === 'delayed';
          const isUpcoming = step.status === 'upcoming';

          return (
            <div key={step.key} className="relative flex gap-3.5 pb-6 last:pb-1 group">
              {/* Connecting line */}
              {!isLast && (
                <div
                  className={cn(
                    'absolute left-[13px] top-7 w-[2px] h-[calc(100%-20px)] rounded-full transition-colors',
                    isCompleted
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : isDelayed
                      ? 'bg-amber-400 dark:bg-amber-600'
                      : 'bg-slate-200 dark:bg-slate-800'
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Step indicator node */}
              <div
                className={cn(
                  'relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all shadow-xs',
                  isCompleted && 'bg-blue-600 text-white dark:bg-blue-500',
                  isCurrent &&
                    'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950 animate-pulse shadow-md',
                  isDelayed &&
                    'bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950 shadow-md',
                  isUpcoming &&
                    'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700'
                )}
              >
                {getStepIcon(step.key, step.status)}
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={cn(
                      'text-xs font-bold tracking-tight',
                      isCompleted && 'text-slate-800 dark:text-slate-200',
                      isCurrent && 'text-blue-600 dark:text-blue-400',
                      isDelayed && 'text-amber-600 dark:text-amber-400',
                      isUpcoming && 'text-slate-400 dark:text-slate-500'
                    )}
                  >
                    {step.label}
                  </span>

                  {step.timestamp && (
                    <span
                      className={cn(
                        'text-[10px] shrink-0 font-medium',
                        isCurrent || isDelayed
                          ? 'font-bold text-slate-700 dark:text-slate-300'
                          : 'text-slate-400 dark:text-slate-500'
                      )}
                    >
                      {step.timestamp}
                    </span>
                  )}
                </div>

                {step.sublabel && (
                  <p
                    className={cn(
                      'text-[11px] mt-0.5 leading-snug',
                      isCurrent
                        ? 'text-slate-700 dark:text-slate-300 font-medium'
                        : isDelayed
                        ? 'text-amber-700 dark:text-amber-300 font-medium'
                        : 'text-slate-500 dark:text-slate-400'
                    )}
                  >
                    {step.sublabel}
                  </p>
                )}

                {/* Additional contextual note if current or delayed */}
                {(isCurrent || isDelayed) && step.description && (
                  <div
                    className={cn(
                      'mt-2 p-2 rounded-lg text-[11px] leading-relaxed border',
                      isDelayed
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
                        : 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-200'
                    )}
                  >
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Carrier Checkpoint History */}
      {carrierEvents.length > 0 && (
        <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setShowFullHistory(!showFullHistory)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 transition-colors"
            aria-expanded={showFullHistory}
          >
            <span>
              {showFullHistory ? 'Hide' : 'View'} Carrier Scan History ({carrierEvents.length} events)
            </span>
            {showFullHistory ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showFullHistory && (
            <div className="mt-3 space-y-3 pt-2 pl-2 border-l-2 border-slate-200 dark:border-slate-700 animate-in fade-in">
              {carrierEvents.map((event) => (
                <div key={event.id} className="text-xs pl-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {event.title}
                    </span>
                    <span className="text-[10px] text-slate-400">{event.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {event.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {event.location}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
