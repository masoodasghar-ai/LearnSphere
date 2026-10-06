import React, { useState } from 'react';
import { X, Award, CheckCircle2, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';

interface BecomeTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BecomeTutorModal: React.FC<BecomeTutorModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [degree, setDegree] = useState('');
  const [experience, setExperience] = useState('3-5 years');
  const [rate, setRate] = useState('40');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-navy-950 p-6 text-white">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Tutor Recruitment Portal</span>
          </div>
          <h2 className="text-2xl font-bold font-serif">Teach with LearnSphere</h2>
          <p className="text-xs text-slate-300 mt-1">
            Join thousands of premier educators empowering students worldwide. Set your own hours and rates.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Application Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong>{name}</strong>. Our academic vetting committee will review your credentials and contact you at <strong>{email}</strong> within 48 business hours to schedule a 15-minute video demo lesson.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-4 px-6 py-2.5 bg-[#0B132B] text-white text-xs font-semibold rounded-lg hover:bg-indigo-900 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs">
              <div>
                <span className="font-bold text-slate-900 block">$35–$80/hr</span>
                <span className="text-[11px] text-slate-500">Average Payout</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="font-bold text-slate-900 block">100% Flexible</span>
                <span className="text-[11px] text-slate-500">Choose Schedule</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block">0% Friction</span>
                <span className="text-[11px] text-slate-500">Instant Payments</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Robert Vance"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="robert@university.edu"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Teaching Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option>Mathematics & Calculus</option>
                  <option>Physics & Science</option>
                  <option>English Literature & Essays</option>
                  <option>Digital SAT / ACT Prep</option>
                  <option>Computer Science & Coding</option>
                  <option>Spanish / Foreign Languages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Highest Degree & University</label>
                <input
                  type="text"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. M.S. Physics, Columbia"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teaching Experience</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option>1–2 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10+ years (Master Educator)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Desired Hourly Rate ($/hr)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Submit Tutor Application</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
