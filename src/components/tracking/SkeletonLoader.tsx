'use client';

import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading order details..." role="status">
      {/* Header skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <div className="space-y-1.5">
            <div className="h-5 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      </div>

      {/* ETA Card Skeleton */}
      <div className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 space-y-4">
        <div className="flex justify-between">
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-7 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="pt-2 flex justify-between">
          <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="space-y-5 pl-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="flex gap-3 items-center">
          <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-44 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
