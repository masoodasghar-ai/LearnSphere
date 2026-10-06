import React from 'react';
import { 
  ArrowRight, 
  PlayCircle, 
  Users, 
  Award, 
  Clock, 
  TrendingUp, 
  Star, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onFindTutor: () => void;
  onHowItWorks: () => void;
  onBookSession: () => void;
  onOpenClassroom?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onFindTutor,
  onHowItWorks,
  onBookSession,
  onOpenClassroom,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/20 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle background ambient glow */}
      <div 
        className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -z-10 pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-40 left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Personalized Tutoring. Proven Results.</span>
            </div>

            {/* Large Serif Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-bold text-slate-900 leading-[1.12] tracking-tight">
              Better Learning. <br className="hidden sm:inline" />
              <span className="text-[#3A0CA3] bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                Brighter Futures.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Expert tutors. Personalized support. Real progress. Helping students build lasting confidence, master challenging subjects, and achieve their highest academic potential.
            </p>

            {/* Action Buttons / Internal Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onFindTutor}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#0B132B] hover:bg-indigo-950 text-white font-semibold text-base shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <span>Find My Tutor</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={onHowItWorks}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs hover:border-indigo-300 hover:text-indigo-900 transition-all duration-200 active:scale-[0.99] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlayCircle className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                <span>How It Works</span>
              </button>

              {onOpenClassroom && (
                <button
                  onClick={onOpenClassroom}
                  className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-bold text-sm border border-indigo-200/90 shadow-xs hover:border-indigo-300 transition-all duration-200 active:scale-[0.99] cursor-pointer"
                  title="Demo Interactive Whiteboard Classroom"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Classroom Demo</span>
                </button>
              )}
            </div>

            {/* Trust / Value Indicators Row */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2">
                
                {/* 1-on-1 */}
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <Users className="w-4 h-4" />
                    <span>1-on-1</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Personalized Learning</span>
                </div>

                {/* Expert Tutors */}
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>Expert Tutors</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Top 1% Instructors</span>
                </div>

                {/* Flexible Schedule */}
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Flexible Schedule</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Learn on Your Time</span>
                </div>

                {/* Results Driven */}
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Results Driven</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Improved Grades</span>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Image with Authentic Photography */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Background Decorative Accent Ring */}
            <div 
              className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-amber-200/40 via-indigo-100/60 to-purple-100/50 rounded-3xl transform rotate-1 -z-10" 
              aria-hidden="true" 
            />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-md sm:max-w-lg lg:max-w-none w-full">
              {/* High-fidelity photography matching the prompt: tutor smiling with school-age student studying with notebook */}
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=900"
                alt="Professional female tutor helping a young student with homework in an encouraging, modern study setting"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
                loading="eager"
              />

              {/* Floating Stat Overlay Badge: Top Right */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-slate-100/80 flex items-center gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900 text-sm">4.95 / 5.0</span>
                    <span className="text-[11px] text-slate-500">Rating</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">From 15,000+ reviews</p>
                </div>
              </div>

              {/* Floating Improvement Badge: Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-slate-100/80 flex items-center gap-3 animate-fade-in max-w-[260px]">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">+1.5 Letter Grades</div>
                  <p className="text-[11px] text-slate-500 leading-tight">Average student improvement in first 90 days</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
