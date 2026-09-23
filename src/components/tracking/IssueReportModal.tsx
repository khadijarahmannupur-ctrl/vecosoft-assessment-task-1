'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ISSUE_OPTIONS } from '@/data/mockOrders';
import { IssueCategory } from '@/types/issue';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Send,
  Loader2,
  FileCheck,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface IssueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  initialCategory?: IssueCategory;
}

export function IssueReportModal({
  isOpen,
  onClose,
  orderNumber,
  initialCategory = 'not_received',
}: IssueReportModalProps) {
  const [category, setCategory] = useState<IssueCategory>(initialCategory);
  const [note, setNote] = useState('');
  const [contactPref, setContactPref] = useState<'email' | 'sms'>('email');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
      showToast(`Support Ticket ${ticketId} created!`, 'success');
    }, 1200);
  };

  const handleResetAndClose = () => {
    setSubmittedTicket(null);
    setNote('');
    setHasPhoto(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={submittedTicket ? 'Report Submitted' : 'Report a Delivery Issue'}
      description={
        submittedTicket
          ? `Reference #${submittedTicket}`
          : `Order #${orderNumber} • Priority Resolution Team`
      }
      maxWidth="max-w-md"
    >
      {submittedTicket ? (
        /* Success State */
        <div className="text-center py-2 space-y-4 animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Your claim has been logged
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ticket <span className="font-mono font-bold text-slate-700 dark:text-slate-200">#{submittedTicket}</span> has been dispatched to our carrier operations team.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-left text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Expected Resolution:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Within 2 Hours
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Updates sent via:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">
                {contactPref}
              </span>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs active:scale-98 transition-all"
          >
            Done
          </button>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Issue Category Dropdown / Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Select Issue Type
            </label>
            <div className="grid grid-cols-1 gap-1.5 max-h-44 overflow-y-auto pr-1">
              {ISSUE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setCategory(opt.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                    category === opt.id
                      ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="leading-tight">{opt.label}</span>
                  {category === opt.id && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Issue Details Textarea */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="issue-note"
                className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Describe the problem
              </label>
              <span className="text-[10px] text-slate-400">{note.length}/300</span>
            </div>
            <textarea
              id="issue-note"
              rows={3}
              maxLength={300}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Please provide details (e.g. checked with leasing office, package box was torn open, etc.)..."
              required
              className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          {/* Photo Attachment (Mock) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Add Photo Evidence (Optional)
            </label>
            {!hasPhoto ? (
              <button
                type="button"
                onClick={() => setHasPhoto(true)}
                className="w-full py-3 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 text-xs transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Attach photo of damaged box or doorstep</span>
              </button>
            ) : (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">photo_evidence_01.jpg (1.8 MB)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasPhoto(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Contact Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Preferred Contact Channel
            </label>
            <div className="flex gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="radio"
                  name="contact"
                  checked={contactPref === 'email'}
                  onChange={() => setContactPref('email')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Email Updates</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="radio"
                  name="contact"
                  checked={contactPref === 'sms'}
                  onChange={() => setContactPref('sms')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>SMS Notifications</span>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !note.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting claim...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Delivery Issue Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
