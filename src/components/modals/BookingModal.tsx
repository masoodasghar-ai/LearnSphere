import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Video,
  User,
  Mail,
  BookOpen
} from 'lucide-react';
import { Tutor, SubjectCategory, BookingRequest } from '../../types';
import { MOCK_TUTORS, POPULAR_SUBJECTS } from '../../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTutor?: Tutor | null;
  preselectedSubject?: SubjectCategory | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedTutor,
  preselectedSubject,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<string>(
    preselectedSubject?.name || preselectedTutor?.subject || 'Mathematics'
  );
  const [selectedTutorId, setSelectedTutorId] = useState<string>(
    preselectedTutor?.id || MOCK_TUTORS[0].id
  );
  const [sessionType, setSessionType] = useState<'trial_free' | 'paid_1on1'>('trial_free');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, Sep 25');
  const [selectedSlot, setSelectedSlot] = useState<string>('4:00 PM - 4:45 PM');
  
  // Student Form
  const [studentName, setStudentName] = useState<string>('');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [gradeLevel, setGradeLevel] = useState<string>('10th Grade (High School)');
  const [goals, setGoals] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  if (!isOpen) return null;

  const currentTutor = MOCK_TUTORS.find(t => t.id === selectedTutorId) || MOCK_TUTORS[0];

  const handleNext = () => {
    if (step === 3) {
      const errs: Record<string, string> = {};
      if (!studentName.trim()) errs.studentName = 'Student or parent name is required';
      if (!studentEmail.trim() || !studentEmail.includes('@')) errs.studentEmail = 'A valid email is required for the session link';
      
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      // Create confirmed booking
      const newBooking: BookingRequest = {
        id: `BK-${Date.now().toString().slice(-6)}`,
        studentName,
        studentEmail,
        tutorId: currentTutor.id,
        tutorName: currentTutor.name,
        subject: selectedSubject,
        date: selectedDate,
        timeSlot: selectedSlot,
        durationMinutes: sessionType === 'trial_free' ? 30 : 60,
        gradeLevel,
        notes: goals,
        sessionType,
        amount: sessionType === 'trial_free' ? 0 : currentTutor.hourlyRate,
      };

      setConfirmedBooking(newBooking);
      setStep(4);
      return;
    }

    setStep(prev => prev + 1);
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  const timeSlots = [
    '3:30 PM - 4:15 PM',
    '4:30 PM - 5:15 PM',
    '5:30 PM - 6:15 PM',
    '6:30 PM - 7:15 PM',
    '7:30 PM - 8:15 PM',
  ];

  const availableDates = [
    'Today (Instant Matching)',
    'Tomorrow, Sep 25',
    'Saturday, Sep 26',
    'Sunday, Sep 27',
    'Monday, Sep 28',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {step === 4 ? 'Session Confirmed!' : 'Book a 1-on-1 Tutoring Session'}
              </h2>
              <p className="text-xs text-slate-500">
                {step === 4 ? 'Your calendar invitation has been generated' : `Step ${step} of 3 · 100% Satisfaction Guarantee`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (if not finished) */}
        {step < 4 && (
          <div className="h-1 bg-slate-100 w-full">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6">
          
          {/* STEP 1: Select Subject & Session Format */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Choose Subject
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {POPULAR_SUBJECTS.map((subj) => (
                    <button
                      key={subj.id}
                      onClick={() => setSelectedSubject(subj.name)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedSubject === subj.name
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold">{subj.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{subj.shortDesc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Select Session Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSessionType('trial_free')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      sessionType === 'trial_free'
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">Free 30-Min Diagnostic Trial</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        $0 FREE
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Assess student grade level, review sample homework, and experience our interactive whiteboard.
                    </p>
                  </div>

                  <div
                    onClick={() => setSessionType('paid_1on1')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      sessionType === 'paid_1on1'
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">Full 60-Min Deep Dive Session</span>
                      <span className="text-slate-900 text-xs font-bold">
                        ${currentTutor.hourlyRate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Comprehensive exam preparation, syllabus catching-up, and customized problem set drills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Matched Tutor Preview */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentTutor.avatar}
                    alt={currentTutor.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-bold text-sm text-slate-900">{currentTutor.name}</div>
                    <div className="text-xs text-slate-500">{currentTutor.title} · ★ {currentTutor.rating}</div>
                  </div>
                </div>
                <span className="text-xs text-indigo-700 font-semibold bg-white px-2.5 py-1 rounded border border-slate-200">
                  Assigned Expert
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Select Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedDate === date
                          ? 'border-indigo-600 bg-indigo-50/90 text-indigo-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Select Convenient Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'border-indigo-600 bg-indigo-50/90 text-indigo-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        {slot}
                      </span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Available
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-100 flex items-center gap-3 text-xs text-indigo-900">
                <Video className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>Sessions are conducted live via LearnSphere Secure Whiteboard. No software download required.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Student Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student or Parent Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (errors.studentName) setErrors({ ...errors, studentName: '' });
                    }}
                    placeholder="e.g. Jason Reynolds"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                {errors.studentName && <p className="text-xs text-rose-600 mt-1">{errors.studentName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address for Session Link & Reminders *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => {
                      setStudentEmail(e.target.value);
                      if (errors.studentEmail) setErrors({ ...errors, studentEmail: '' });
                    }}
                    placeholder="student@example.com or parent@example.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                {errors.studentEmail && <p className="text-xs text-rose-600 mt-1">{errors.studentEmail}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Grade / Academic Level
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option>Elementary (Grades 1–5)</option>
                    <option>Middle School (Grades 6–8)</option>
                    <option>9th Grade (Freshman)</option>
                    <option>10th Grade (High School)</option>
                    <option>11th Grade (Junior / SAT)</option>
                    <option>12th Grade (Senior / AP)</option>
                    <option>University / Adult Learner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Main Learning Goal
                  </label>
                  <input
                    type="text"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g. Raise calculus grade from C to A"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Zero charge today. Your promo code <strong>BRIGHTER20</strong> has been saved for any follow-up sessions.</span>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Your Free Session is Confirmed!
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  A calendar invite and direct classroom link have been sent to <strong>{confirmedBooking.studentEmail}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Tutor:</span>
                  <span className="font-bold text-indigo-700">{confirmedBooking.tutorName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Subject:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.subject}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.date} · {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Amount Due:</span>
                  <span className="font-bold text-emerald-600">$0.00 (100% Free Trial)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0B132B] text-white text-xs font-semibold rounded-lg hover:bg-indigo-900 shadow-sm transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>{step === 3 ? 'Confirm & Book Free Session' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
