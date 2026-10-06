import React, { useState } from 'react';
import { X, Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Ideal for trying out LearnSphere diagnostic tests and free introductory lessons.',
      features: [
        '1 Free 30-min trial diagnostic session',
        'Basic video courses & notes',
        '10 daily practice questions',
        'Student dashboard & streak tracker',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Student Pro',
      price: billingCycle === 'annual' ? '$7.99' : '$9.99',
      period: 'per month',
      description: 'Our most popular plan for students and families seeking academic excellence.',
      features: [
        'Everything in Free',
        'Unlimited access to AI Study Partner',
        '20% discount on all 1-on-1 tutor hours',
        'Full AP & SAT exam question bank',
        'Verified certificates of completion',
        'Priority tutor booking slots',
      ],
      cta: 'Start 14-Day Free Pro Trial',
      popular: true,
    },
    {
      name: 'Tutor',
      price: billingCycle === 'annual' ? '$15.99' : '$19.99',
      period: 'per month',
      description: 'Full suite of teaching tools for independent educators and subject coaches.',
      features: [
        'Unlimited 1-on-1 virtual whiteboards',
        'Integrated automated calendar & payments',
        'Course creation & quiz builder',
        'Direct student messaging & homework review',
        'Direct deposit with 0% platform fee bonus',
      ],
      cta: 'Join as Pro Tutor',
      popular: false,
    },
    {
      name: 'Academy',
      price: billingCycle === 'annual' ? '$79' : '$99',
      period: 'per month',
      description: 'Complete multi-tenant infrastructure for schools, learning centers, and agencies.',
      features: [
        'Custom domain (e.g. academy.yourschool.com)',
        'Unlimited teacher and student seats',
        'Custom logo, colors & email branding',
        'Parent portal and progress reports',
        'Role-based permissions & audit logs',
      ],
      cta: 'Launch Academy Workspace',
      popular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in relative max-h-[92vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-6 bg-slate-50 border-b border-slate-200 shrink-0">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
            Transparent EdTech Pricing
          </span>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mt-2">
            Invest in Your Academic Potential
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mt-1">
            Choose the membership that matches your learning pace. Switch or cancel anytime.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl mt-4 shadow-2xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-indigo-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual' ? 'bg-indigo-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                p.popular
                  ? 'border-indigo-600 bg-indigo-50/30 shadow-md ring-1 ring-indigo-600 relative'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    Most Popular
                  </div>
                )}

                <div className="text-lg font-bold text-slate-900">{p.name}</div>
                <p className="text-xs text-slate-500 mt-1 min-h-[34px]">{p.description}</p>

                <div className="mt-4 mb-4">
                  <span className="text-3xl font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-xs text-slate-500 ml-1">/{p.period}</span>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    onClose();
                    onSelectPlan(p.name);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    p.popular
                      ? 'bg-[#0B132B] hover:bg-indigo-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
