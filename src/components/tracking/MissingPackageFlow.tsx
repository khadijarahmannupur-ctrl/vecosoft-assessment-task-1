'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import {
  HelpCircle,
  CheckSquare,
  Square,
  ArrowRight,
  PackageX,
  MessageSquare,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface MissingPackageFlowProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  onProceedToReport: () => void;
  onOpenSupport: () => void;
}

export function MissingPackageFlow({
  isOpen,
  onClose,
  orderNumber,
  onProceedToReport,
  onOpenSupport,
}: MissingPackageFlowProps) {
  const [step, setStep] = useState<'checklist' | 'options'>('checklist');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    spots: false,
    neighbors: false,
    lockers: false,
  });
  const { showToast } = useToast();

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = checkedItems.spots && checkedItems.neighbors && checkedItems.lockers;

  const handleResetAndClose = () => {
    setStep('checklist');
    setCheckedItems({ spots: false, neighbors: false, lockers: false });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={
        step === 'checklist'
          ? 'Missing Package Assistance'
          : 'Package Resolution Options'
      }
      description={
        step === 'checklist'
          ? `Let's help you locate order ${orderNumber}`
          : 'Choose how you would like us to resolve this for you'
      }
      maxWidth="max-w-md"
    >
      {step === 'checklist' ? (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Carriers often place parcels in concealed spots to prevent theft, or scan deliveries 15-30 minutes prior to final drop-off.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Quick 3-Point Checklist:
            </h4>

            {/* Check item 1 */}
            <div
              onClick={() => toggleCheck('spots')}
              className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <button className="mt-0.5 text-blue-600 dark:text-blue-400" aria-label="Toggle check">
                {checkedItems.spots ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="text-xs">
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                  1. Check hidden drop-off areas
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Behind porch planters, side garage doors, back patios, or underneath stairs.
                </span>
              </div>
            </div>

            {/* Check item 2 */}
            <div
              onClick={() => toggleCheck('lockers')}
              className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <button className="mt-0.5 text-blue-600 dark:text-blue-400" aria-label="Toggle check">
                {checkedItems.lockers ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="text-xs">
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                  2. Building mailroom or parcel locker
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Check front desk concierge, package room, or cluster mailbox.
                </span>
              </div>
            </div>

            {/* Check item 3 */}
            <div
              onClick={() => toggleCheck('neighbors')}
              className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <button className="mt-0.5 text-blue-600 dark:text-blue-400" aria-label="Toggle check">
                {checkedItems.neighbors ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="text-xs">
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                  3. Check with household / neighbors
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Confirm if a family member, roommate, or neighbor accepted it.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setStep('options')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>Still Can't Find It — Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              I found it, cancel
            </button>
          </div>
        </div>
      ) : (
        /* Step 2: Action Options */
        <div className="space-y-3">
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl p-3 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">100% Buyer Protection Guarantee</span>
              <span>If your package is lost or misdelivered, we will replace it or issue a full refund immediately.</span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            {/* Action 1: File formal claim */}
            <button
              onClick={() => {
                handleResetAndClose();
                onProceedToReport();
              }}
              className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-600 bg-white dark:bg-slate-800 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  <PackageX className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">
                    Report Missing Package & File Claim
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Fast-track replacement or refund ticket (2-hour SLA)
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
            </button>

            {/* Action 2: Chat live */}
            <button
              onClick={() => {
                handleResetAndClose();
                onOpenSupport();
              }}
              className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-slate-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">
                    Contact Support / Carrier Dispatch
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Ping delivery courier GPS coordinates directly
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep('checklist')}
              className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Back to Checklist
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
