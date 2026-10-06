import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  BookOpen, 
  Sparkles, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import { POPULAR_SUBJECTS } from '../../data/mockData';
import { SubjectCategory } from '../../types';

interface NavbarProps {
  onBookSession: () => void;
  onFindTutor: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onTestimonials: () => void;
  onAboutUs: () => void;
  onBecomeTutor: () => void;
  onLogin: () => void;
  onSelectSubject: (subject: SubjectCategory) => void;
  onOpenClassroom?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookSession,
  onFindTutor,
  onHowItWorks,
  onPricing,
  onTestimonials,
  onAboutUs,
  onBecomeTutor,
  onLogin,
  onSelectSubject,
  onOpenClassroom,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subjectsDropdownOpen, setSubjectsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'tutors' | 'subjects' | 'how-it-works' | 'testimonials'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionCheck = [
        { id: 'testimonials', key: 'testimonials' as const },
        { id: 'tutors', key: 'tutors' as const },
        { id: 'how-it-works', key: 'how-it-works' as const },
        { id: 'subjects', key: 'subjects' as const },
      ];

      const scrollPos = window.scrollY + 140;
      let matched = false;
      for (const s of sectionCheck) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(s.key);
          matched = true;
          break;
        }
      }
      if (!matched && window.scrollY < 260) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-shadow duration-200 ${scrolled ? 'shadow-sm border-b border-slate-200/80' : 'border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-navy-950 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans flex items-center gap-1">
                  Learn<span className="text-indigo-600">Sphere</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500">
                  Online Tutoring
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={onFindTutor}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer relative ${
                activeSection === 'tutors'
                  ? 'text-indigo-900 bg-indigo-50/90 font-bold shadow-2xs'
                  : 'text-slate-700 hover:text-indigo-700 hover:bg-slate-50'
              }`}
            >
              Find a Tutor
              {activeSection === 'tutors' && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-indigo-600 rounded-full animate-fade-in" />
              )}
            </button>

            {/* Subjects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setSubjectsDropdownOpen(true)}
              onMouseLeave={() => setSubjectsDropdownOpen(false)}
            >
              <button
                onClick={() => setSubjectsDropdownOpen(!subjectsDropdownOpen)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 cursor-pointer relative ${
                  activeSection === 'subjects' || subjectsDropdownOpen
                    ? 'text-indigo-900 bg-indigo-50/90 font-bold shadow-2xs'
                    : 'text-slate-700 hover:text-indigo-700 hover:bg-slate-50'
                }`}
                aria-expanded={subjectsDropdownOpen}
              >
                Subjects
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${subjectsDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
                {activeSection === 'subjects' && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-indigo-600 rounded-full animate-fade-in" />
                )}
              </button>

              {subjectsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 mt-1 animate-fade-in z-50">
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Subject Categories</p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    {POPULAR_SUBJECTS.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onSelectSubject(sub);
                          setSubjectsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-indigo-50/70 text-slate-800 hover:text-indigo-900 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-sm text-slate-900 group-hover:text-indigo-700">{sub.name}</div>
                          <div className="text-xs text-slate-500 truncate max-w-[200px]">{sub.shortDesc}</div>
                        </div>
                        <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="px-3 pt-2 pb-1 border-t border-slate-100 mt-1">
                    <button
                      onClick={() => {
                        setSubjectsDropdownOpen(false);
                        onFindTutor();
                      }}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer py-1"
                    >
                      View all 150+ subjects & topics
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onHowItWorks}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer relative ${
                activeSection === 'how-it-works'
                  ? 'text-indigo-900 bg-indigo-50/90 font-bold shadow-2xs'
                  : 'text-slate-700 hover:text-indigo-700 hover:bg-slate-50'
              }`}
            >
              How It Works
              {activeSection === 'how-it-works' && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-indigo-600 rounded-full animate-fade-in" />
              )}
            </button>

            <button
              onClick={onPricing}
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              Pricing
            </button>

            <button
              onClick={onTestimonials}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer relative ${
                activeSection === 'testimonials'
                  ? 'text-indigo-900 bg-indigo-50/90 font-bold shadow-2xs'
                  : 'text-slate-700 hover:text-indigo-700 hover:bg-slate-50'
              }`}
            >
              Success Stories
              {activeSection === 'testimonials' && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-indigo-600 rounded-full animate-fade-in" />
              )}
            </button>

            <button
              onClick={onAboutUs}
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              About Us
            </button>
          </nav>

          {/* Desktop Right Side CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenClassroom && (
              <button
                onClick={onOpenClassroom}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 shadow-2xs transition-all cursor-pointer hover:scale-[1.02]"
                title="Try Interactive Whiteboard Virtual Classroom Demo"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Classroom Demo</span>
              </button>
            )}

            <button
              onClick={onLogin}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Log in
            </button>

            <button
              onClick={onBookSession}
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B132B] hover:bg-indigo-900 text-white text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <Calendar className="w-4 h-4 text-amber-400 group-hover:rotate-6 transition-transform" />
              <span>Book a Free Session</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.2 rounded font-mono">
                $0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onBookSession}
              className="px-3 py-1.5 text-xs font-semibold bg-[#0B132B] text-white rounded-md shadow-sm"
            >
              Free Trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="space-y-1">
            <button
              onClick={() => { setMobileMenuOpen(false); onFindTutor(); }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                activeSection === 'tutors'
                  ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200/80'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Find a Tutor
              </span>
              {activeSection === 'tutors' && (
                <span className="text-[10px] bg-indigo-600 text-white font-mono px-1.5 py-0.5 rounded-full">
                  CURRENT
                </span>
              )}
            </button>

            <div className="py-1">
              <div className="px-3.5 py-1.5 text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                Popular Subjects
              </div>
              <div className="grid grid-cols-2 gap-1 px-2">
                {POPULAR_SUBJECTS.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectSubject(sub);
                    }}
                    className="text-left text-xs py-2 px-2.5 rounded-lg text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/50 flex items-center justify-between transition-colors"
                  >
                    <span>{sub.name}</span>
                    <span className="text-[10px] text-slate-400">→</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); onHowItWorks(); }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                activeSection === 'how-it-works'
                  ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200/80'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                How It Works
              </span>
              {activeSection === 'how-it-works' && (
                <span className="text-[10px] bg-indigo-600 text-white font-mono px-1.5 py-0.5 rounded-full">
                  CURRENT
                </span>
              )}
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onPricing(); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
            >
              <span className="w-4 h-4 text-emerald-600 font-bold text-center">$</span>
              Pricing Plans
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onTestimonials(); }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                activeSection === 'testimonials'
                  ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200/80'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                Success Stories
              </span>
              {activeSection === 'testimonials' && (
                <span className="text-[10px] bg-indigo-600 text-white font-mono px-1.5 py-0.5 rounded-full">
                  CURRENT
                </span>
              )}
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onAboutUs(); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              About Us
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onBecomeTutor(); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-purple-600" />
              Become a Tutor
            </button>

            {onOpenClassroom && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenClassroom(); }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold bg-indigo-50 text-indigo-900 border border-indigo-200 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Virtual Classroom Demo
                </span>
                <span className="text-[10px] bg-indigo-600 text-white font-mono px-2 py-0.5 rounded-full">
                  TRY LIVE
                </span>
              </button>
            )}

            <button
              onClick={() => { setMobileMenuOpen(false); onLogin(); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
            >
              <span className="w-4 h-4 flex items-center justify-center text-xs">🔐</span>
              Login / Switch Role
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookSession();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-sm text-center shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book a Free Session</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                $0 FREE
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
