import React from 'react';
import { TRUST_ORGANIZATIONS } from '../../data/mockData';

export const TrustSection: React.FC = () => {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50/70 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-6">
          Trusted by Students and Parents · Learning Resources & Curricula We Align With
        </p>

        {/* Logos Row with tasteful monochrome & typography styling */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          
          {/* Google */}
          <div className="flex items-center gap-1.5 font-bold text-lg sm:text-xl text-slate-700 hover:text-indigo-600 transition-colors">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>

          {/* Yahoo */}
          <div className="font-black text-lg sm:text-xl text-purple-700 tracking-tight">
            yahoo<span className="text-red-500">!</span>
          </div>

          {/* College Board */}
          <div className="flex items-center gap-1.5 font-serif font-bold text-base sm:text-lg text-slate-800 tracking-normal">
            <div className="w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center text-[10px] font-sans font-bold">
              C
            </div>
            <span>CollegeBoard</span>
          </div>

          {/* edX */}
          <div className="font-black text-xl sm:text-2xl text-slate-800 tracking-tighter">
            <span className="text-indigo-600">ed</span>X
          </div>

          {/* Khan Academy */}
          <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg text-emerald-800">
            <div className="w-4 h-4 bg-emerald-600 rounded-sm transform rotate-45" />
            <span>Khan Academy</span>
          </div>

          {/* Coursera */}
          <div className="font-semibold text-lg sm:text-xl text-blue-700 tracking-tight">
            coursera
          </div>

        </div>

        <p className="text-[11px] text-slate-400 mt-5">
          *All trademarks, logos and brand names are the property of their respective owners. Used for reference and curriculum compatibility.
        </p>
      </div>
    </section>
  );
};
