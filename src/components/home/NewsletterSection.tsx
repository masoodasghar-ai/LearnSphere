import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Icon + Copy */}
            <div className="flex items-start sm:items-center gap-4 max-w-xl">
              <div className="w-14 h-14 rounded-2xl bg-[#0B132B] flex items-center justify-center text-white shrink-0 shadow-md">
                <Mail className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                  Stay Inspired. Stay Informed.
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Subscribe to our newsletter for weekly study strategies, AP exam tips, and exclusive student scholarship updates.
                </p>
              </div>
            </div>

            {/* Right Input Form */}
            <div className="w-full lg:max-w-md">
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">You&apos;re subscribed!</span>
                    <p className="text-xs text-emerald-700">Check your inbox for your free Study Habit Blueprint PDF.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && <p className="text-xs text-rose-600 pl-1">{error}</p>}
                  <p className="text-[11px] text-slate-400 pl-1">
                    We respect your privacy. Unsubscribe anytime with 1-click. No spam guaranteed.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
