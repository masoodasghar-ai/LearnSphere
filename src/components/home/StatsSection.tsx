import React from 'react';
import { Users, Award, BookOpen, ThumbsUp, Calendar } from 'lucide-react';
import { PLATFORM_STATS } from '../../data/mockData';

export const StatsSection: React.FC = () => {
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'students':
        return <Users className="w-6 h-6 text-amber-300" />;
      case 'tutors':
        return <Award className="w-6 h-6 text-amber-300" />;
      case 'subjects':
        return <BookOpen className="w-6 h-6 text-amber-300" />;
      case 'satisfaction':
        return <ThumbsUp className="w-6 h-6 text-amber-300" />;
      case 'excellence':
        return <Calendar className="w-6 h-6 text-amber-300" />;
      default:
        return <Award className="w-6 h-6 text-amber-300" />;
    }
  };

  return (
    <section id="stats" className="bg-[#0B132B] text-white py-14 border-y border-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          
          {PLATFORM_STATS.map((stat, idx) => (
            <div key={stat.label} className={`flex flex-col items-center justify-center ${idx > 0 ? 'pt-6 md:pt-0' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
