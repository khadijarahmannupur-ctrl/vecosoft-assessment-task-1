'use client';

import React from 'react';
import { DeliveryStatus } from '@/types/order';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertTriangle, Truck, Package, Sparkles } from 'lucide-react';

interface StatusBadgeProps {
  status: DeliveryStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  size = 'md',
  showIcon = true,
  className,
}: StatusBadgeProps) {
  const getBadgeConfig = (status: DeliveryStatus) => {
    switch (status) {
      case 'delivered':
        return {
          label: 'Delivered',
          bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          pulse: false,
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300',
          dot: 'bg-blue-500',
          icon: Truck,
          pulse: true,
        };
      case 'delayed':
        return {
          label: 'Delayed',
          bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-200',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
          pulse: true,
        };
      case 'shipped':
        return {
          label: 'In Transit',
          bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300',
          dot: 'bg-indigo-500',
          icon: Package,
          pulse: true,
        };
      case 'untracked':
        return {
          label: 'Preparing to Ship',
          bg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300',
          dot: 'bg-purple-500',
          icon: Sparkles,
          pulse: true,
        };
      case 'processing':
      default:
        return {
          label: 'Order Processing',
          bg: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
          dot: 'bg-slate-400',
          icon: Clock,
          pulse: false,
        };
    }
  };

  const config = getBadgeConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 gap-2 font-bold',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border shadow-xs transition-colors select-none',
        config.bg,
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={`Order status: ${config.label}`}
    >
      {/* Animated Pulse dot or Icon */}
      {showIcon ? (
        <Icon className={cn('shrink-0', iconSizes[size])} />
      ) : (
        <span className="relative flex h-2 w-2">
          {config.pulse && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                config.dot
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-2 w-2', config.dot)} />
        </span>
      )}
      <span>{config.label}</span>
    </span>
  );
}
