import React from 'react';
import { Sparkles, X, ChevronRight, UserCheck, HelpCircle, BookOpen, LogIn } from 'lucide-react';

interface AnnouncementBarProps {
  onClaimDiscount: () => void;
  onBecomeTutor: () => void;
  onOpenLogin: () => void;
  onOpenHelp: () => void;
  onOpenResources: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onClaimDiscount,
  onBecomeTutor,
  onOpenLogin,
  onOpenHelp,
  onOpenResources,
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#0B132B] text-slate-100 text-xs py-2 px-4 border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Promo Message */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Limited Offer
          </span>
          <span className="text-slate-200 hidden sm:inline">
            Get 20% Off Your First Month of Tutoring!
          </span>
          <span className="text-slate-200 sm:hidden">
            20% Off First Month!
          </span>
          <button
            onClick={onClaimDiscount}
            className="text-amber-300 hover:text-amber-200 underline font-medium inline-flex items-center gap-0.5 ml-1 transition-colors cursor-pointer"
          >
            Claim Now
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right Utility Navigation */}
        <div className="flex items-center gap-4 text-slate-300 text-xs">
          <button
            onClick={onBecomeTutor}
            className="hover:text-white transition-colors hidden md:inline-flex items-center gap-1 cursor-pointer"
          >
            <UserCheck className="w-3 h-3 text-slate-400" />
            Become a Tutor
          </button>
          <span className="text-slate-700 hidden md:inline">|</span>
          <button
            onClick={onOpenResources}
            className="hover:text-white transition-colors hidden lg:inline-flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3 h-3 text-slate-400" />
            Resources
          </button>
          <span className="text-slate-700 hidden lg:inline">|</span>
          <button
            onClick={onOpenHelp}
            className="hover:text-white transition-colors hidden sm:inline-flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-slate-400" />
            Help Center
          </button>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <button
            onClick={onOpenLogin}
            className="hover:text-white font-medium inline-flex items-center gap-1 text-slate-200 cursor-pointer"
          >
            <LogIn className="w-3 h-3 text-indigo-400" />
            Login
          </button>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="text-slate-400 hover:text-white ml-1 p-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
