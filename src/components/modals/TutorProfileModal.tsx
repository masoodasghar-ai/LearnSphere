import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Award, 
  GraduationCap, 
  Languages, 
  Users, 
  MessageSquare, 
  Send,
  BookOpen
} from 'lucide-react';
import { Tutor } from '../../types';

interface TutorProfileModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookSession: (tutor: Tutor) => void;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  tutor,
  isOpen,
  onClose,
  onBookSession,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'about' | 'experience' | 'reviews' | 'availability'>('overview');
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState('');

  if (!isOpen || !tutor) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
        
        {/* Header with Photo, Verified Badge, and Quick Meta */}
        <div className="relative bg-gradient-to-r from-indigo-900 via-indigo-950 to-navy-950 p-6 sm:p-8 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
              />
              {tutor.verified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold font-serif">{tutor.name}</h2>
                <span className="bg-indigo-500/30 border border-indigo-400/40 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {tutor.subject}
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1">{tutor.title}</p>

              {/* Quick stats unboxed */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-slate-300">
                <div className="flex items-center text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{tutor.rating.toFixed(2)}</span>
                  <span className="text-slate-400 font-normal ml-1">({tutor.reviewsCount} reviews)</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tutor.studentsCount.toLocaleString()}+ Students</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tutor.experienceYears}+ Years Teaching</span>
                </div>
              </div>
            </div>

            {/* Price badge */}
            <div className="sm:text-right shrink-0 bg-white/10 px-4 py-2.5 rounded-xl border border-white/10">
              <span className="text-xs text-slate-300">Hourly Rate</span>
              <div className="text-2xl font-extrabold text-white">${tutor.hourlyRate}<span className="text-xs font-normal text-slate-300">/hr</span></div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 pt-2 border-t border-white/10 text-xs font-semibold">
            {(['overview', 'about', 'experience', 'reviews', 'availability'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white text-indigo-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Teaching Philosophy & Approach
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  {tutor.teachingStyle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Specialized Subjects</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.allSubjects.map((sub, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
                    <Languages className="w-4 h-4" />
                    <span>Languages Spoken</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.languages.map((lang, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Upcoming Open Slots
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {tutor.availableSlots.map((slot, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{slot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Full Biography
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {tutor.bio}
              </p>
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Verified Academic Credentials
                </h4>
                <ul className="space-y-2">
                  {tutor.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <Award className="w-8 h-8 text-indigo-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{tutor.experienceYears} Years of Pedagogical Excellence</h4>
                  <p className="text-xs text-slate-600">Guided over {tutor.studentsCount.toLocaleString()} middle school, high school, and university students.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">Lead Curriculum Developer & Subject Chair</div>
                  <div className="text-slate-500">2018 – Present · Advanced Academic Institute</div>
                  <p className="mt-1 text-slate-600">Standardized diagnostic grading rubrics and AP problem banks for top 100 students.</p>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">Senior 1-on-1 Academic Coach</div>
                  <div className="text-slate-500">2014 – 2018 · LearnSphere Global</div>
                  <p className="mt-1 text-slate-600">Maintained a 98.4% student goal achievement rating across competitive exams.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Rating summary */}
              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-slate-900">{tutor.rating.toFixed(1)}</div>
                  <div className="flex items-center text-amber-400 justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-400">{tutor.reviewsCount} reviews</div>
                </div>

                <div className="flex-1 space-y-1">
                  {tutor.ratingBreakdown.map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-4 text-slate-500 text-right">{row.stars}★</span>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${row.percentage}%` }} />
                      </div>
                      <span className="w-7 text-[11px] text-slate-400">{row.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student comments */}
              <div className="space-y-3">
                {tutor.featuredReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-900">{rev.studentName}</span>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">&quot;{rev.comment}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: AVAILABILITY & SEND MESSAGE */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Weekly Open Office Hours
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 flex justify-between">
                    <span className="font-semibold text-slate-700">Monday - Thursday</span>
                    <span className="text-indigo-600 font-bold">3:00 PM – 8:00 PM EST</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 flex justify-between">
                    <span className="font-semibold text-slate-700">Friday</span>
                    <span className="text-indigo-600 font-bold">2:00 PM – 6:30 PM EST</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 flex justify-between">
                    <span className="font-semibold text-slate-700">Saturday</span>
                    <span className="text-indigo-600 font-bold">10:00 AM – 4:00 PM EST</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 flex justify-between">
                    <span className="font-semibold text-slate-700">Sunday</span>
                    <span className="text-slate-400">By Appointment Only</span>
                  </div>
                </div>
              </div>

              {/* Send message form */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Send a Message to {tutor.name.split(' ')[0]}</span>
                </h4>
                {messageSent ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium">
                    Message sent! {tutor.name} typically responds in under 2 hours.
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-2">
                    <textarea
                      rows={3}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={`Ask ${tutor.name} about curriculum, test preparation, or custom scheduling...`}
                      className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Backed by 100% Risk-Free Match Guarantee
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('availability')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Ask a Question
            </button>
            <button
              onClick={() => {
                onClose();
                onBookSession(tutor);
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0B132B] hover:bg-indigo-900 rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Book Session with {tutor.name.split(' ')[0]}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
