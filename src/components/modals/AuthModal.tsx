import React, { useState } from 'react';
import { X, LogIn, User, Shield, GraduationCap, Users, School, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoleDemo: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSelectRoleDemo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to student demo if logged in with custom input
    onSelectRoleDemo('student');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in relative p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 mx-auto mb-3">
            <LogIn className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-slate-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access your 1-on-1 tutoring portal, live whiteboard classes, and study tools.
          </p>
        </div>

        {/* 1-Click Instant Demo Logins Section */}
        <div className="mb-6 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5 text-center">
            🚀 1-Click SaaS Portal Demo Logins
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onClose(); onSelectRoleDemo('student'); }}
              className="p-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 group-hover:text-indigo-700">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>Student</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">Ahmed · 12d streak</p>
            </button>

            <button
              onClick={() => { onClose(); onSelectRoleDemo('tutor'); }}
              className="p-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 group-hover:text-indigo-700">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Tutor</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">Sarah · Math Coach</p>
            </button>

            <button
              onClick={() => { onClose(); onSelectRoleDemo('parent'); }}
              className="p-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 group-hover:text-indigo-700">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Parent</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">Dr. Harrison · Reports</p>
            </button>

            <button
              onClick={() => { onClose(); onSelectRoleDemo('organization_admin'); }}
              className="p-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 group-hover:text-indigo-700">
                <School className="w-3.5 h-3.5 text-indigo-600" />
                <span>Academy Admin</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">Austin STEM · Multi-tenant</p>
            </button>
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Or use email</span></div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <a href="#" className="text-[11px] text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#0B132B] hover:bg-indigo-900 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-xs text-slate-600 hover:text-indigo-600 transition-colors"
          >
            {mode === 'login' ? "Don't have an account? Sign up free" : "Already have an account? Log in"}
          </button>
        </div>

      </div>
    </div>
  );
};
