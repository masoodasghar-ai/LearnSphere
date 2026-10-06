import React from 'react';
import { 
  Search, 
  Calendar, 
  Laptop, 
  Trophy, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';

interface HowItWorksProps {
  onGetStarted: () => void;
  onOpenClassroom?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onGetStarted, onOpenClassroom }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'search':
        return <Search className="w-5 h-5 text-white" />;
      case 'calendar':
        return <Calendar className="w-5 h-5 text-white" />;
      case 'laptop':
        return <Laptop className="w-5 h-5 text-white" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 text-white" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/80 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout: Left Heading + CTA, Right Step Process Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
              How It Works
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
              Simple Steps to Academic Success
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              We make tutoring easy, effective, and personalized for every student. Whether you need ongoing weekly subject coaching or last-minute exam prep, getting started takes less than 2 minutes.
            </p>

            <div className="pt-2">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Tutor Match Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Process Timeline */}
          <div className="lg:col-span-7">
            <div className="relative">
              
              {/* Connecting Desktop Horizontal Line */}
              <div 
                className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 -z-0" 
                aria-hidden="true" 
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                {HOW_IT_WORKS_STEPS.map((step, idx) => (
                  <div key={step.number} className="flex flex-col items-start md:items-center text-left md:text-center group">
                    
                    {/* Circle Step Number & Icon */}
                    <div className="relative mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-navy-950 flex items-center justify-center text-white shadow-md shadow-indigo-950/20 group-hover:scale-105 group-hover:from-indigo-700 transition-all duration-300">
                        {getStepIcon(step.icon)}
                      </div>
                      <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Interactive Whiteboard Demo Button on Step 3 */}
                    {(idx === 2 || step.number === '03' || step.number === '3') && onOpenClassroom && (
                      <button
                        onClick={onOpenClassroom}
                        className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 shadow-2xs transition-all flex items-center gap-1 cursor-pointer hover:scale-105"
                      >
                        <span>Try Whiteboard Demo</span>
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                      </button>
                    )}

                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
