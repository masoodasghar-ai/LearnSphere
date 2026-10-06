import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckSquare, 
  Square, 
  BookOpen, 
  Bot, 
  GraduationCap, 
  Send, 
  User, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Video, 
  Award,
  ChevronRight,
  ShieldAlert,
  Play,
  Compass,
  BarChart3,
  Target,
  ArrowRight
} from 'lucide-react';
import { UserRole } from '../../types';
import { LearningPath } from './LearningPath';

interface PortalPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
  onOpenClassroom?: () => void;
}

export const PortalPreview: React.FC<PortalPreviewProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
  onOpenClassroom,
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [studentTab, setStudentTab] = useState<'learning-path' | 'overview'>('learning-path');
  const [parentTab, setParentTab] = useState<'overview' | 'learning-path'>('overview');
  
  // Student State
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete Algebra II lesson: Quadratic Graphs', done: true },
    { id: 2, text: 'Practice 20 SAT Math questions', done: false },
    { id: 3, text: 'Attend 1-on-1 Physics session with Sarah at 7:00 PM', done: false },
  ]);

  // AI Tutor Chat State
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Hello Ahmed! I'm your LearnSphere AI Study Partner. Ready to tackle your AP Calculus or Physics today? Try asking me about quadratic equations or challenging homework concepts.",
      time: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const toggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const handleAiSend = (textToSend?: string) => {
    const q = textToSend || aiInput;
    if (!q.trim()) return;

    const userMsg = { sender: 'user' as const, text: q, time: 'Just now' };
    setAiChat(prev => [...prev, userMsg]);
    setAiInput('');

    // Generate simulated pedagogical Socratic AI answer
    setTimeout(() => {
      let response = "That's a great question! Instead of just giving the raw formula, let's look at the underlying intuition: A quadratic equation curves because the variable is squared, creating symmetrical parabolic motion. What specific form is your problem currently in?";
      if (q.toLowerCase().includes('simpler')) {
        response = "Think of a quadratic equation like throwing a ball into the air: it rises, reaches a highest peak (the vertex), and falls back to the ground (the roots/x-intercepts)!";
      } else if (q.toLowerCase().includes('hint')) {
        response = "Hint: Try moving all terms to one side so it equals zero ($ax^2 + bx + c = 0$), then check if you can factor or if you need the quadratic formula!";
      } else if (q.toLowerCase().includes('example')) {
        response = "Here is a clean example: For $x^2 - 5x + 6 = 0$, look for two numbers that multiply to $+6$ and add up to $-5$. Those numbers are $-2$ and $-3$! So $(x - 2)(x - 3) = 0$, meaning $x = 2$ or $x = 3$.";
      }

      setAiChat(prev => [...prev, { sender: 'ai', text: response, time: 'Just now' }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-100 rounded-2xl max-w-6xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in max-h-[95vh] flex flex-col">
        
        {/* Top App Bar with Role Switcher */}
        <div className="bg-[#0B132B] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-bold text-sm">LearnSphere Portal</span>
              <span className="text-[10px] text-slate-400 block">SaaS Live Environment</span>
            </div>
          </div>

          {/* Role switcher buttons */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs">
            <button
              onClick={() => setRole('student')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                role === 'student' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => setRole('tutor')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                role === 'tutor' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Tutor View
            </button>
            <button
              onClick={() => setRole('parent')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                role === 'parent' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Parent View
            </button>
            <button
              onClick={() => setRole('organization_admin')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                role === 'organization_admin' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Academy Admin
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* ==================== ROLE 1: STUDENT VIEW ==================== */}
          {role === 'student' && (
            <div className="space-y-6">
              
              {/* Header greeting & Streaks */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-slate-900">
                    Good morning, Ahmed 👋
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    You have 1 live 1-on-1 session today and 2 self-paced modules in progress.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Streak */}
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold shadow-2xs">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>12 Day Streak!</span>
                  </div>

                  {/* XP */}
                  <div className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-xs font-bold shadow-2xs">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>2,450 XP</span>
                  </div>
                </div>
              </div>

              {/* Student Portal Sub-Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setStudentTab('learning-path')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      studentTab === 'learning-path'
                        ? 'bg-[#0B132B] text-white shadow-md'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-amber-300" />
                    <span>Learning Path & Milestones Graph</span>
                    <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-tight">
                      Dynamic
                    </span>
                  </button>

                  <button
                    onClick={() => setStudentTab('overview')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      studentTab === 'overview'
                        ? 'bg-[#0B132B] text-white shadow-md'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>Daily Overview & AI Study Partner</span>
                  </button>
                </div>

                {onOpenClassroom && (
                  <button
                    onClick={onOpenClassroom}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer bg-gradient-to-r from-indigo-700 to-[#0B132B] hover:from-indigo-600 hover:to-indigo-950 text-white shadow-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Interactive Classroom Whiteboard</span>
                  </button>
                )}
              </div>

              {/* TAB 1: DYNAMIC LEARNING PATH TRACKER */}
              {studentTab === 'learning-path' && (
                <div className="animate-fade-in space-y-4">
                  <LearningPath />
                </div>
              )}

              {/* TAB 2: OVERVIEW */}
              {studentTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Quick-Jump Card into Learning Path */}
                  <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-[#0B132B] text-white p-4 sm:p-5 rounded-2xl shadow-md border border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                            Active Learning Track
                          </span>
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                            Step 4 of 7 In Progress
                          </span>
                        </div>
                        <h3 className="text-base font-bold">AP Calculus BC: Score 5 Mastery Route</h3>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Current Mastery: <strong className="text-emerald-400">84%</strong> vs Cohort Benchmark 75% (+9% ahead)
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setStudentTab('learning-path')}
                      className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                    >
                      <span>Open Dynamic Tracking Graph</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                    </button>
                  </div>

                  {/* Main Grid: Courses + Upcoming Class + Goals */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 8 Cols: Continue Learning & Upcoming Class */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Upcoming Class Highlight */}
                  <div className="bg-gradient-to-r from-indigo-900 to-navy-950 text-white p-5 rounded-2xl shadow-md border border-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Upcoming Live Tutoring</span>
                        <h3 className="text-base font-bold">AP Physics Mechanics with Sarah Ahmed</h3>
                        <p className="text-xs text-slate-300 mt-0.5">Today at 7:00 PM EST · Interactive Whiteboard Room</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => (onOpenClassroom ? onOpenClassroom() : alert("Launching virtual classroom with digital whiteboard..."))}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Join Classroom
                    </button>
                  </div>

                  {/* Continue Learning Course Cards */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Continue Learning
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>Mathematics</span>
                          <span className="text-indigo-600">72%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: '72%' }} />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">Module 4: Quadratic Vertex Form</p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>Physics</span>
                          <span className="text-purple-600">45%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-600 rounded-full" style={{ width: '45%' }} />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">Module 3: Newton's Third Law</p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>English Literature</span>
                          <span className="text-amber-600">81%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '81%' }} />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">Module 6: Rhetorical Devices</p>
                      </div>

                    </div>
                  </div>

                  {/* AI Study Partner Panel */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">LearnSphere AI Study Partner</h4>
                          <span className="text-[10px] text-emerald-600 font-semibold">Online · Socratic Pedagogical Mode</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400">Pro Plan Feature</span>
                    </div>

                    {/* Chat messages */}
                    <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                      {aiChat.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-slate-100 text-slate-800 rounded-bl-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick AI Action Buttons */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => handleAiSend('Explain simpler please!')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        💡 Explain Simpler
                      </button>
                      <button
                        onClick={() => handleAiSend('Can you give me a hint?')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        🔍 Give Me a Hint
                      </button>
                      <button
                        onClick={() => handleAiSend('Show me a worked example.')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        📐 Show an Example
                      </button>
                    </div>

                    {/* Chat Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                        placeholder="Ask anything about homework or exam prep..."
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                      <button
                        onClick={() => handleAiSend()}
                        className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right 4 Cols: Today's Goals & Schedule */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Today's Goals Checklist */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span>Today&apos;s Goals</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {goals.filter(g => g.done).length}/{goals.length} done
                      </span>
                    </h3>

                    <div className="space-y-2">
                      {goals.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => toggleGoal(g.id)}
                          className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-xs"
                        >
                          {g.done ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          )}
                          <span className={g.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>
                            {g.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended For You */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                      Recommended Practice
                    </h3>

                    <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs space-y-1">
                      <span className="font-bold text-indigo-900 block">Digital SAT Math Drill</span>
                      <p className="text-slate-600">Adaptive 15-question module targeting your weakest algebra concepts.</p>
                      <button 
                        onClick={() => alert("Launching adaptive practice test module...")}
                        className="text-indigo-700 font-bold mt-1 inline-flex items-center gap-1 hover:underline"
                      >
                        Start Diagnostic →
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}
            </div>
          )}

          {/* ==================== ROLE 2: TUTOR VIEW ==================== */}
          {role === 'tutor' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-slate-900">Tutor Dashboard · Sarah Ahmed</h2>
                  <p className="text-xs text-slate-500 mt-1">Mathematics & AP Calculus Specialist · 98% Rating</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl">
                    ● Accepting New Students
                  </span>
                </div>
              </div>

              {/* Tutor Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Monthly Earnings</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">$2,840.00</div>
                  <span className="text-[11px] text-emerald-600 font-semibold">+18% vs last month</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Active Students</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">32 Students</div>
                  <span className="text-[11px] text-slate-400">Weekly recurring</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Teaching Hours</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">68.5 hrs</div>
                  <span className="text-[11px] text-slate-400">This month</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Student Rating</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">4.95 ★</div>
                  <span className="text-[11px] text-slate-400">342 reviews</span>
                </div>
              </div>

              {/* Tutor Class Schedule */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Today&apos;s Booked Sessions</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900">4:00 PM – 4:45 PM</span>
                      <p className="text-slate-500">Julian C. · Pre-Calculus Limits & Derivatives</p>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded">Confirmed</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900">7:00 PM – 8:00 PM</span>
                      <p className="text-slate-500">Ahmed M. · AP Physics 1: Kinematics Review</p>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded">Upcoming</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== ROLE 3: PARENT VIEW ==================== */}
          {role === 'parent' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-slate-900">Parent Portal · Dr. Robert Harrison</h2>
                  <p className="text-xs text-slate-500 mt-1">Monitoring Academic Milestones & Mastery for Jason Harrison (10th Grade)</p>
                </div>

                {/* Parent sub-tabs */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setParentTab('overview')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      parentTab === 'overview' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Attendance & Grades
                  </button>
                  <button
                    onClick={() => setParentTab('learning-path')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      parentTab === 'learning-path' ? 'bg-indigo-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Milestones Path</span>
                  </button>
                </div>
              </div>

              {parentTab === 'learning-path' ? (
                <div className="animate-fade-in space-y-4">
                  <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl text-xs text-indigo-900 flex items-center justify-between">
                    <span className="font-semibold">
                      Viewing Jason&apos;s verified curriculum milestone progress tracked by MIT mentor Sarah Ahmed.
                    </span>
                    <span className="text-[11px] bg-indigo-200/60 px-2 py-0.5 rounded font-mono font-bold">
                      Parent Verified Access
                    </span>
                  </div>
                  <LearningPath />
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500">Algebra II Grade</span>
                      <div className="text-3xl font-extrabold text-emerald-600 mt-1">A- (91%)</div>
                      <span className="text-[11px] text-slate-500">Up from C (74%) in September</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500">Session Attendance</span>
                      <div className="text-3xl font-extrabold text-indigo-700 mt-1">100%</div>
                      <span className="text-[11px] text-slate-500">14 of 14 sessions attended</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500">Learning Time</span>
                      <div className="text-3xl font-extrabold text-slate-900 mt-1">28.4 hrs</div>
                      <span className="text-[11px] text-slate-500">Whiteboard & homework practice</span>
                    </div>
                  </div>

                  {/* Recent Tutor Feedback */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Instructor Feedback & Notes</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>Sarah Ahmed (Mathematics Tutor)</span>
                        <span className="text-slate-400">Yesterday</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        &quot;Jason demonstrated tremendous improvement on factoring higher-degree polynomials yesterday. He solved 4 challenging exam questions independently. For this week, we will tackle conic sections.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== ROLE 4: ACADEMY ADMIN VIEW ==================== */}
          {role === 'organization_admin' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-slate-900">Austin STEM Academy Portal</h2>
                  <p className="text-xs text-slate-500 mt-1">Custom Domain: academy.austinstem.edu · Multi-Tenant Workspace</p>
                </div>
                <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg">
                  Academy Plan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Enrolled Students</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">184</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Faculty / Tutors</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">14</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Sessions Completed</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">1,420</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500">Avg Improvement</span>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">+1.4 Grades</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
