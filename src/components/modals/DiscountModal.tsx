import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, ArrowRight, Tag } from 'lucide-react';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAndBook: () => void;
}

export const DiscountModal: React.FC<DiscountModalProps> = ({
  isOpen,
  onClose,
  onApplyAndBook,
}) => {
  const [copied, setCopied] = useState(false);
  const couponCode = 'BRIGHTER20';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in text-center p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Sparkles className="w-7 h-7 text-amber-600" />
        </div>

        <h3 className="text-2xl font-bold font-serif text-slate-900">
          20% Off Your First Month!
        </h3>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Use the exclusive promotional code below during your first tutoring month or subscription to unlock 20% off all 1-on-1 sessions.
        </p>

        {/* Voucher Box */}
        <div className="my-6 p-4 bg-indigo-50/80 rounded-xl border border-dashed border-indigo-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-700" />
            <span className="font-mono text-xl font-extrabold text-indigo-950 tracking-wider">
              {couponCode}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-indigo-900 text-xs font-semibold rounded-lg border border-indigo-200 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => {
              onClose();
              onApplyAndBook();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply Coupon & Book Free Session</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Maybe Later
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-4">
          *Applicable to new student accounts. Discount automatically attached to your free trial diagnostic booking.
        </p>
      </div>
    </div>
  );
};
