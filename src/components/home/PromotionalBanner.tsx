import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';

interface PromotionalBannerProps {
  onClaimDiscount: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onClaimDiscount }) => {
  // Countdown timer for offer (e.g. 48 hours rolling window)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="offer" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Lilac/Indigo Banner Box */}
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-100/90 via-purple-100/70 to-indigo-50 border border-indigo-200/70 overflow-hidden shadow-lg">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-5">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-900 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
                <span>Limited Time Offer</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Get 20% Off Your First Month!
              </h2>

              <p className="text-base text-slate-700 max-w-lg leading-relaxed">
                Start your journey toward academic success today. Pair with an expert instructor who fits your learning style, schedule, and goals.
              </p>

              {/* Countdown Timer Display */}
              <div className="flex items-center gap-2 pt-2">
                <div className="flex items-center gap-1 text-xs text-indigo-950 font-semibold mr-2">
                  <Clock className="w-4 h-4 text-indigo-700" />
                  <span>Offer expires in:</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                  <span className="bg-white/80 px-2.5 py-1 rounded-md border border-indigo-200 text-slate-900 shadow-xs">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span>:</span>
                  <span className="bg-white/80 px-2.5 py-1 rounded-md border border-indigo-200 text-slate-900 shadow-xs">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="bg-white/80 px-2.5 py-1 rounded-md border border-indigo-200 text-slate-900 shadow-xs">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onClaimDiscount}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#0B132B] hover:bg-indigo-950 text-white font-semibold text-sm shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                >
                  <span>Claim Your Discount</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Use code <span className="font-mono font-bold text-indigo-900 bg-white/70 px-1.5 py-0.5 rounded border border-indigo-200">BRIGHTER20</span> at checkout. Valid for all new student registrations.
              </p>

            </div>

            {/* Right Column Tutor Photo (online headset tutoring session) */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[340px]">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=700"
                alt="Friendly female online tutor smiling and waving with headset on video conference"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-indigo-100/90 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
