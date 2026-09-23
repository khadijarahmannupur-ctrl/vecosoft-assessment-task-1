'use client';

import React, { useState } from 'react';
import { ProofOfDelivery } from '@/types/order';
import { MapPin, Camera, AlertCircle, Eye, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import Image from 'next/image';

interface DeliveryProofCardProps {
  proof: ProofOfDelivery;
  onOpenMissingFlow: () => void;
}

export function DeliveryProofCard({ proof, onOpenMissingFlow }: DeliveryProofCardProps) {
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-2xs">
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/70 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Proof of Delivery
          </h3>
        </div>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {proof.timestamp}
        </span>
      </div>

      <div className="flex gap-3 items-center">
        {/* Drop-off Photo Thumbnail with Preview Modal */}
        {proof.photoUrl ? (
          <div
            onClick={() => setShowPhotoModal(true)}
            className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 border border-slate-300 dark:border-slate-700 cursor-pointer group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proof.photoUrl}
              alt="Proof of Delivery drop-off"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1 text-[9px] text-white flex items-center gap-0.5">
              <Camera className="w-2.5 h-2.5" />
              Photo
            </div>
          </div>
        ) : null}

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                Drop-off location note:
              </span>
              <p className="text-slate-600 dark:text-slate-400 italic text-[11px] mt-0.5">
                "{proof.locationNote}"
              </p>
            </div>
          </div>

          {proof.signedBy && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 pl-5">
              Verification: {proof.signedBy}
            </p>
          )}
        </div>
      </div>

      {/* Prominent 'I didn't receive it' Button */}
      <div className="mt-3.5 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          Can't locate your parcel?
        </div>

        <button
          onClick={onOpenMissingFlow}
          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold text-xs active:scale-95 transition-all shadow-2xs"
        >
          I didn't receive it
        </button>
      </div>

      {/* Full Photo Modal */}
      <Modal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        title="Delivery Drop-Off Photo"
        description={`Captured at ${proof.timestamp}`}
      >
        <div className="flex flex-col gap-3">
          <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proof.photoUrl}
              alt="Full size delivery proof"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">
              Courier drop note:
            </span>
            {proof.locationNote}
          </div>
        </div>
      </Modal>
    </div>
  );
}
