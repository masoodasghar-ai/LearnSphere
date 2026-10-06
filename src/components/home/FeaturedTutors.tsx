import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle, 
  GraduationCap, 
  Clock, 
  Calendar, 
  Search, 
  Users, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MOCK_TUTORS } from '../../data/mockData';
import { Tutor } from '../../types';

interface FeaturedTutorsProps {
  onViewProfile: (tutor: Tutor) => void;
  onBookTutor: (tutor: Tutor) => void;
}

export const FeaturedTutors: React.FC<FeaturedTutorsProps> = ({
  onViewProfile,
  onBookTutor,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(60);

  const subjects = ['All', 'Mathematics', 'Science', 'English', 'Test Prep', 'Computer Science', 'Languages'];

  const filteredTutors = MOCK_TUTORS.filter((tutor) => {
    const matchesSubject = selectedSubject === 'All' || tutor.subject === selectedSubject || tutor.allSubjects.includes(selectedSubject);
    const matchesQuery = 
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.allSubjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = tutor.hourlyRate <= maxPrice;

    return matchesSubject && matchesQuery && matchesPrice;
  });

  return (
    <section id="tutors" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Meet Expert Tutors
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Learn from verified instructors from top universities who understand how to help you succeed.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-10 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutors by subject, exam (e.g. SAT, AP), or name..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Price Filter Pill */}
            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-medium text-slate-700 whitespace-nowrap">Max Rate:</span>
              <input 
                type="range" 
                min="25" 
                max="60" 
                step="5" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-indigo-600 cursor-pointer"
              />
              <span className="font-bold text-slate-900 min-w-[42px]">${maxPrice}/hr</span>
            </div>

          </div>

          {/* Interactive Subject Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3.5 scrollbar-none">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubject === subj
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Tutor Cards Grid */}
        {filteredTutors.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200/80">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No tutors found matching your criteria</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your search query, increasing the maximum hourly rate, or selecting &quot;All&quot; subjects.
            </p>
            <button
              onClick={() => { setSelectedSubject('All'); setSearchQuery(''); setMaxPrice(60); }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top: Avatar, Rating, Subject */}
                <div className="p-6">
                  
                  <div className="flex items-start gap-4">
                    {/* Tutor Avatar with Verified checkmark */}
                    <div className="relative shrink-0">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                      />
                      {tutor.verified && (
                        <div 
                          className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs" 
                          title="Verified Instructor"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        </div>
                      )}
                    </div>

                    {/* Name, Title, and Subject */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-indigo-700 transition-colors">
                          {tutor.name}
                        </h3>
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shrink-0">
                          {tutor.subject}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {tutor.title}
                      </p>

                      {/* Stars & Reviews */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-slate-800 ml-1">
                            {tutor.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          ({tutor.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tagline / Teaching focus */}
                  <p className="text-xs text-slate-600 mt-4 line-clamp-2 italic bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                    &quot;{tutor.tagline}&quot;
                  </p>

                  {/* Clean unboxed metadata according to Zero-Pill discipline */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{tutor.experienceYears}+ Yrs Exp</span>
                    </div>
                    <span className="text-slate-300">·</span>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{tutor.studentsCount.toLocaleString()}+ Students</span>
                    </div>
                  </div>

                  {/* Next Availability */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50/70 px-2.5 py-1.5 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Next Slot: {tutor.nextAvailable}</span>
                  </div>

                </div>

                {/* Card Bottom Actions: Hourly Rate & Buttons */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-lg font-bold text-slate-900">${tutor.hourlyRate}</span>
                    <span className="text-xs text-slate-500">/hr</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewProfile(tutor)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => onBookTutor(tutor)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B132B] hover:bg-indigo-900 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
                    >
                      Book Session
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
