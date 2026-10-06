import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
            Student & Parent Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mt-3">
            Why Students & Parents Love LearnSphere
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Real outcomes from verified learners who achieved academic breakthroughs with personalized guidance.
          </p>
        </div>

        {/* Desktop Carousel / Visible items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[0, 1, 2].map((offset) => {
            const item = TESTIMONIALS[(activeIndex + offset) % TESTIMONIALS.length];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
              >
                <div>
                  {/* Quotation mark decoration */}
                  <div className="text-indigo-200 mb-3" aria-hidden="true">
                    <Quote className="w-8 h-8 fill-indigo-100 text-indigo-300" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-sm text-slate-700 leading-relaxed font-normal">
                    &quot;{item.quote}&quot;
                  </blockquote>

                  {/* Specific Outcome */}
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Result: {item.improvement}</span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.role} · {item.school}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicator dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-indigo-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
