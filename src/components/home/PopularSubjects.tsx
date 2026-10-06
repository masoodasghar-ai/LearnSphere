import React, { useRef } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  BookText, 
  GraduationCap, 
  Code2, 
  Languages as LanguagesIcon, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { POPULAR_SUBJECTS } from '../../data/mockData';
import { SubjectCategory } from '../../types';

interface PopularSubjectsProps {
  onSelectSubject: (subject: SubjectCategory) => void;
  onViewAllSubjects: () => void;
}

export const PopularSubjects: React.FC<PopularSubjectsProps> = ({
  onSelectSubject,
  onViewAllSubjects,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'math':
        return <Calculator className="w-6 h-6 text-indigo-600" />;
      case 'science':
        return <FlaskConical className="w-6 h-6 text-purple-600" />;
      case 'english':
        return <BookText className="w-6 h-6 text-amber-600" />;
      case 'testprep':
        return <GraduationCap className="w-6 h-6 text-emerald-600" />;
      case 'cs':
        return <Code2 className="w-6 h-6 text-blue-600" />;
      case 'languages':
        return <LanguagesIcon className="w-6 h-6 text-rose-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-indigo-600" />;
    }
  };

  const getSubjectBadgeBg = (iconName: string) => {
    switch (iconName) {
      case 'math': return 'bg-indigo-50 border-indigo-100';
      case 'science': return 'bg-purple-50 border-purple-100';
      case 'english': return 'bg-amber-50 border-amber-100';
      case 'testprep': return 'bg-emerald-50 border-emerald-100';
      case 'cs': return 'bg-blue-50 border-blue-100';
      case 'languages': return 'bg-rose-50 border-rose-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <section id="subjects" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Popular Subjects
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Explore a wide range of subjects and find the perfect tutor for you.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll to previous subjects"
              className="group w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-indigo-900 hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Previous subjects"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll to next subjects"
              className="group w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-indigo-900 hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Next subjects"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizontally scrollable row / 6 visible on desktop */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {POPULAR_SUBJECTS.map((subject) => (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className="min-w-[240px] sm:min-w-[270px] lg:flex-1 snap-start bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Line Icon Container */}
                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-5 transition-transform group-hover:scale-105 ${getSubjectBadgeBg(subject.iconName)}`}>
                  {getSubjectIcon(subject.iconName)}
                </div>

                {/* Subject Name */}
                <h3 className="text-lg font-bold text-slate-900 font-sans group-hover:text-indigo-700 transition-colors">
                  {subject.name}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {subject.shortDesc}
                </p>

                {/* Tutor Count & Topics */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{subject.activeTutorsCount}+ Tutors</span>
                  <span>Avg ${subject.averageRate}/hr</span>
                </div>
              </div>

              {/* Explore Button Link */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Bottom Link */}
        <div className="mt-6 text-center">
          <button
            onClick={onViewAllSubjects}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer py-1"
          >
            Looking for something specific? Browse all 150+ subjects & AP exam tracks
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
