import React from 'react';
import { X, GraduationCap, Award, ShieldCheck, Heart, Users, Target } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSession: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onBookSession }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-navy-950 p-6 sm:p-8 text-white shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-sm font-bold tracking-wider uppercase text-amber-300">About LearnSphere</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">Better Learning. Brighter Futures.</h2>
          <p className="text-xs text-slate-300 mt-2 max-w-lg leading-relaxed">
            Founded with a singular mission: to make world-class 1-on-1 mentorship accessible, personalized, and measurably effective for every student.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-700">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Our Pedagogical Philosophy</h3>
            <p className="leading-relaxed">
              At LearnSphere, we believe that academic struggles are rarely about intellectual ability—they are about conceptual gaps and lack of individualized pacing. Our educators don&apos;t just provide answers to tonight&apos;s homework; they cultivate genuine conceptual intuition, critical inquiry, and self-directed study habits that endure through college and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Top 1% Educator Vetting</span>
              </div>
              <p className="text-xs text-slate-600">
                Every instructor undergoes rigorous subject-matter examinations, background screening, and live teaching evaluations before tutoring on our platform.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Outcome-Driven Progress</span>
              </div>
              <p className="text-xs text-slate-600">
                Weekly progress reports, diagnostic benchmarking, and grade-tracking give parents and students 100% visibility into real improvements.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Student Safety & Privacy</span>
              </div>
              <p className="text-xs text-slate-600">
                Fully compliant with COPPA and FERPA student privacy standards. All video classrooms are monitored and recorded for student safety.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>100% Match Guarantee</span>
              </div>
              <p className="text-xs text-slate-600">
                If you aren&apos;t completely satisfied with your tutor after your first session, we will match you with another instructor for free or refund your fees.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">Austin, Texas · Serving students across 42 countries</span>
          <button
            onClick={() => {
              onClose();
              onBookSession();
            }}
            className="px-5 py-2.5 bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            Experience a Free Session
          </button>
        </div>

      </div>
    </div>
  );
};
