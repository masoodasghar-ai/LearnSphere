import React from 'react';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  ShieldCheck,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onFindTutor: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onSuccessStories: () => void;
  onAboutUs: () => void;
  onBecomeTutor: () => void;
  onOpenHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onFindTutor,
  onHowItWorks,
  onPricing,
  onSuccessStories,
  onAboutUs,
  onBecomeTutor,
  onOpenHelp,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080D1A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Mission (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Learn<span className="text-indigo-400">Sphere</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering students to reach their full potential with personalized tutoring, vetted top 1% instructors, and smarter academic learning pathways.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>COPPA & FERPA Compliant Educational Platform</span>
            </div>
          </div>

          {/* Col 1: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onFindTutor} className="hover:text-white transition-colors cursor-pointer">
                  Find a Tutor
                </button>
              </li>
              <li>
                <button onClick={onFindTutor} className="hover:text-white transition-colors cursor-pointer">
                  Subjects Directory
                </button>
              </li>
              <li>
                <button onClick={onHowItWorks} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={onSuccessStories} className="hover:text-white transition-colors cursor-pointer">
                  Success Stories
                </button>
              </li>
              <li>
                <button onClick={onPricing} className="hover:text-white transition-colors cursor-pointer">
                  Pricing Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: For Students */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#tutors" onClick={onFindTutor} className="hover:text-white transition-colors">
                  1-on-1 Tutoring
                </a>
              </li>
              <li>
                <a href="#tutors" onClick={onFindTutor} className="hover:text-white transition-colors">
                  Homework Help
                </a>
              </li>
              <li>
                <a href="#tutors" onClick={onFindTutor} className="hover:text-white transition-colors">
                  Digital SAT Prep
                </a>
              </li>
              <li>
                <a href="#tutors" onClick={onFindTutor} className="hover:text-white transition-colors">
                  AP Exam Crash Courses
                </a>
              </li>
              <li>
                <a href="#tutors" onClick={onFindTutor} className="hover:text-white transition-colors">
                  Study Practice Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: For Tutors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Tutors
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onBecomeTutor} className="hover:text-white transition-colors cursor-pointer">
                  Become a Tutor
                </button>
              </li>
              <li>
                <button onClick={onBecomeTutor} className="hover:text-white transition-colors cursor-pointer">
                  Tutor Earnings & Rates
                </button>
              </li>
              <li>
                <button onClick={onAboutUs} className="hover:text-white transition-colors cursor-pointer">
                  Teaching Guidelines
                </button>
              </li>
              <li>
                <button onClick={onOpenHelp} className="hover:text-white transition-colors cursor-pointer">
                  Tutor Community
                </button>
              </li>
              <li>
                <button onClick={onPricing} className="hover:text-white transition-colors cursor-pointer">
                  Academy White-label
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>+1 (555) 789-2026</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>support@learnsphere.edu</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>123 Academic Way, Suite 400, Austin, TX 78701</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 LearnSphere Inc. All rights reserved. Better Learning. Brighter Futures.
          </div>

          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Accessibility</a>
            
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
