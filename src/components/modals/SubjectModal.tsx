import React from 'react';
import { X, BookOpen, Users, Star, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { SubjectCategory, Tutor } from '../../types';
import { MOCK_TUTORS } from '../../data/mockData';

interface SubjectModalProps {
  subject: SubjectCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTutor: (tutor: Tutor) => void;
  onBookSubject: (subject: SubjectCategory) => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
  subject,
  isOpen,
  onClose,
  onSelectTutor,
  onBookSubject,
}) => {
  if (!isOpen || !subject) return null;

  const matchedTutors = MOCK_TUTORS.filter(
    (t) => t.subject.toLowerCase() === subject.name.toLowerCase() || t.allSubjects.some(s => s.toLowerCase().includes(subject.name.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-950 to-navy-950 text-white shrink-0 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Subject Curriculum Overview</span>
            </div>
            <h2 className="text-2xl font-bold font-serif">{subject.name}</h2>
            <p className="text-xs text-slate-300 mt-1">{subject.popularGrades} · {subject.activeTutorsCount}+ Active Tutors</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Overview text */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Program Description
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {subject.fullDesc}
            </p>
          </div>

          {/* Core Modules / Topics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Key Topics & Standardized Curricula Covered
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subject.topics.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matched Expert Tutors for this Subject */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center justify-between">
              <span>Top-Rated Instructors for {subject.name}</span>
              <span className="text-[11px] text-slate-400 font-normal">Available this week</span>
            </h3>

            <div className="space-y-2.5">
              {matchedTutors.slice(0, 3).map((tutor) => (
                <div
                  key={tutor.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/30 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-11 h-11 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900">{tutor.name}</div>
                      <div className="text-xs text-slate-500">{tutor.title}</div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{tutor.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({tutor.reviewsCount} reviews) · ${tutor.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectTutor(tutor);
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-900 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Average rate: <strong className="text-slate-900">${subject.averageRate}/hr</strong>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookSubject(subject);
            }}
            className="px-5 py-2.5 bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-xs rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Book a Free Session in {subject.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
