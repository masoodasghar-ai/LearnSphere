import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  ArrowUp, 
  LayoutDashboard, 
  ChevronUp, 
  ChevronDown, 
  X,
  BookOpen, 
  Sparkles, 
  Star, 
  GraduationCap, 
  Calendar, 
  TrendingUp,
  Tag,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { UserRole } from '../../types';

interface InternalNavWidgetProps {
  onOpenPortal: (role: UserRole) => void;
  onBookSession: () => void;
  onOpenPricing: () => void;
  onOpenOffer: () => void;
  onOpenClassroom?: () => void;
}

interface NavSection {
  id: string;
  name: string;
  shortName: string;
  label: string;
  icon: React.ReactNode;
}

export const InternalNavWidget: React.FC<InternalNavWidgetProps> = ({
  onOpenPortal,
  onBookSession,
  onOpenPricing,
  onOpenOffer,
  onOpenClassroom,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const sections: NavSection[] = [
    { id: 'hero', name: 'Hero Overview', shortName: 'Overview', label: 'Top / Introduction', icon: <Compass className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'subjects', name: 'Popular Subjects', shortName: 'Subjects', label: 'Math, Science, AP Prep', icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'how-it-works', name: 'How It Works', shortName: 'Process', label: '4-Step Success Formula', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'tutors', name: 'Meet Expert Tutors', shortName: 'Tutors', label: 'Browse & Filter Profiles', icon: <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'testimonials', name: 'Success Stories', shortName: 'Reviews', label: 'Student & Parent Ratings', icon: <Star className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'stats', name: 'Platform Stats', shortName: 'Impact', label: '15,000+ Learners & 98% Win', icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'offer', name: 'Special Promotion', shortName: 'Discount', label: '20% Off First Month Code', icon: <Tag className="w-3.5 h-3.5 text-rose-400" /> },
  ];

  // Track scroll position, active section, and scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      const progress = totalHeight > 0 ? Math.min(100, Math.round((currentScroll / totalHeight) * 100)) : 0;
      setScrollProgress(progress);
      setShowBackToTop(currentScroll > 220);

      // Determine active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter(s => s.el !== null);

      const scrollPos = window.scrollY + 180;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth',
      });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const currentSectionMeta = sections[currentIndex] || sections[0];

  // Quick navigation to previous section
  const handlePrevSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1].id);
    } else {
      scrollToTop();
    }
  };

  // Quick navigation to next section
  const handleNextSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1].id);
    }
  };

  return (
    <aside 
      aria-label="Internal Page Navigation Hub" 
      className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-2.5 font-sans pointer-events-none"
    >
      {/* Expanded Quick Navigation Card Menu */}
      {isOpen && (
        <div 
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Jump to section menu"
          className="pointer-events-auto w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden p-4 mb-1 animate-fade-in text-slate-800 ring-1 ring-slate-900/10"
        >
          {/* Menu Header with Page Progress */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-700 to-[#0B132B] flex items-center justify-center text-white shadow-sm">
                <Compass className="w-4 h-4 text-amber-300 animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Page Navigation Hub</h4>
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                  <span>Reading progress:</span>
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100 text-[10px]">
                    {scrollProgress}%
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close navigation menu"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar inside menu */}
          <div className="w-full bg-slate-100 h-1 rounded-full my-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 h-full rounded-full transition-all duration-200"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Section Jumps List */}
          <div className="py-1 space-y-1 max-h-60 overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Jump To Section
              </span>
              <span className="text-[10px] text-slate-400">
                {sections.length} Page Segments
              </span>
            </div>

            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50/90 text-indigo-900 font-bold border border-indigo-200 shadow-xs'
                      : 'hover:bg-slate-50/90 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <div className="text-xs truncate flex items-center gap-1.5 font-semibold">
                        {section.name}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal truncate">{section.label}</div>
                    </div>
                  </div>

                  {isActive ? (
                    <span className="text-[10px] bg-indigo-600 text-white font-mono px-2 py-0.5 rounded-full font-bold shadow-2xs">
                      CURRENT
                    </span>
                  ) : (
                    <span className="text-slate-300 group-hover:text-indigo-600 text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                      Jump →
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Access to SaaS Portals */}
          <div className="pt-3 border-t border-slate-100 mt-1">
            {onOpenClassroom && (
              <div className="mb-2">
                <button
                  onClick={() => { setIsOpen(false); onOpenClassroom(); }}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-900 via-indigo-850 to-[#0B132B] text-white border border-indigo-500/40 hover:border-amber-400 flex items-center justify-between text-xs font-bold shadow-xs cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Whiteboard Classroom</span>
                  </span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold font-mono px-2 py-0.5 rounded-full shadow-2xs">
                    TRY DEMO
                  </span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Interactive SaaS Portals
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                Interactive Demo
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => { setIsOpen(false); onOpenPortal('student'); }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Student View
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[10px] text-slate-400 block truncate">Courses & AI partner</span>
              </button>

              <button
                onClick={() => { setIsOpen(false); onOpenPortal('tutor'); }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Tutor Cockpit
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[10px] text-slate-400 block truncate">Schedule & earnings</span>
              </button>

              <button
                onClick={() => { setIsOpen(false); onOpenPortal('parent'); }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Parent Portal
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[10px] text-slate-400 block truncate">Grades & attendance</span>
              </button>

              <button
                onClick={() => { setIsOpen(false); onOpenPortal('organization_admin'); }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Academy Admin
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[10px] text-slate-400 block truncate">Multi-tenant school</span>
              </button>
            </div>
          </div>

          {/* Bottom Fast Action Buttons */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => { setIsOpen(false); onOpenPricing(); }}
              className="flex-1 py-2 text-center text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              Pricing Plans
            </button>
            <button
              onClick={() => { setIsOpen(false); onOpenOffer(); }}
              className="py-2 px-2.5 text-center text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Tag className="w-3 h-3 text-amber-600" />
              20% Off
            </button>
            <button
              onClick={() => { setIsOpen(false); onBookSession(); }}
              className="flex-1 py-2 text-center text-xs font-bold text-white bg-[#0B132B] hover:bg-indigo-900 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-amber-300" />
              Book Free Trial
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Controls Dock / Internal Navigation Bar */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl sm:rounded-full shadow-2xl border border-indigo-500/40 text-white ring-1 ring-white/10">
        
        {/* Step Prev Navigation Button */}
        <button
          onClick={handlePrevSection}
          disabled={currentIndex <= 0}
          aria-label="Previous page section"
          className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-800/80 disabled:cursor-not-allowed text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
          title={currentIndex > 0 ? `Jump to previous: ${sections[currentIndex - 1].shortName}` : 'Already at top'}
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Central Internal Navigation Pill Button */}
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer group ${
            isOpen 
              ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/50 shadow-md' 
              : 'bg-[#0B132B] hover:bg-indigo-950 text-slate-100 hover:text-white border border-indigo-400/30'
          }`}
          title="Click to view all page sections & jump"
        >
          <div className="w-5 h-5 rounded-full bg-indigo-600/90 flex items-center justify-center text-white shrink-0 group-hover:rotate-45 transition-transform duration-300">
            <Compass className="w-3 h-3 text-amber-300" />
          </div>
          
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 leading-none">
              Section
            </span>
            <span className="font-bold text-amber-300 truncate max-w-[85px] sm:max-w-[110px] leading-tight">
              {currentSectionMeta.shortName}
            </span>
          </div>

          <div className="flex items-center gap-1 pl-1 border-l border-slate-700">
            <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-800/80 px-1 py-0.2 rounded">
              {scrollProgress}%
            </span>
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            )}
          </div>
        </button>

        {/* Step Next Navigation Button */}
        <button
          onClick={handleNextSection}
          disabled={currentIndex >= sections.length - 1}
          aria-label="Next page section"
          className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-indigo-600 disabled:opacity-30 disabled:hover:bg-slate-800/80 disabled:cursor-not-allowed text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
          title={currentIndex < sections.length - 1 ? `Jump to next: ${sections[currentIndex + 1].shortName}` : 'End of page'}
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* SaaS Portal Demo Direct Button */}
        <button
          onClick={() => onOpenPortal('student')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          title="Open interactive SaaS Portal Demo"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden xs:inline sm:inline">Portals</span>
          <span className="bg-amber-400/25 text-amber-300 text-[9px] px-1 py-0.2 rounded font-mono font-bold tracking-tight border border-amber-400/40">
            LIVE
          </span>
        </button>

        {/* Back to Top Button with SVG Circular Progress Indicator */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label={`Scroll to top (${scrollProgress}% scrolled)`}
            className="relative w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer shrink-0 shadow-sm"
            title="Back to top"
          >
            {/* SVG Circular Progress Ring */}
            <svg className="absolute inset-0 w-8 h-8 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
              <path
                className="text-slate-700/80"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400 transition-all duration-150"
                strokeDasharray={`${scrollProgress}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <ArrowUp className="w-3.5 h-3.5 z-10" />
          </button>
        )}

      </div>
    </aside>
  );
};
