/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/home/Hero';
import { TrustSection } from './components/home/TrustSection';
import { PopularSubjects } from './components/home/PopularSubjects';
import { HowItWorks } from './components/home/HowItWorks';
import { FeaturedTutors } from './components/home/FeaturedTutors';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { StatsSection } from './components/home/StatsSection';
import { PromotionalBanner } from './components/home/PromotionalBanner';
import { NewsletterSection } from './components/home/NewsletterSection';
import { Footer } from './components/common/Footer';

// Interactive Modals
import { BookingModal } from './components/modals/BookingModal';
import { TutorProfileModal } from './components/modals/TutorProfileModal';
import { SubjectModal } from './components/modals/SubjectModal';
import { DiscountModal } from './components/modals/DiscountModal';
import { BecomeTutorModal } from './components/modals/BecomeTutorModal';
import { PricingModal } from './components/modals/PricingModal';
import { AuthModal } from './components/modals/AuthModal';
import { AboutModal } from './components/modals/AboutModal';
import { PortalPreview } from './components/portal/PortalPreview';
import { InternalNavWidget } from './components/common/InternalNavWidget';
import { VirtualClassroomModal } from './components/classroom/VirtualClassroomModal';

import { Tutor, SubjectCategory, UserRole } from './types';

export default function App() {
  // Modal states
  const [classroomModalOpen, setClassroomModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<Tutor | null>(null);
  const [selectedSubjectForBooking, setSelectedSubjectForBooking] = useState<SubjectCategory | null>(null);

  const [tutorProfileModalOpen, setTutorProfileModalOpen] = useState(false);
  const [activeProfileTutor, setActiveProfileTutor] = useState<Tutor | null>(null);

  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState<SubjectCategory | null>(null);

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [becomeTutorModalOpen, setBecomeTutorModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  // Portal demo state
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalRole, setPortalRole] = useState<UserRole>('student');

  // Navigation handlers with fixed navbar offset (-80px)
  const scrollToElementWithOffset = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    }
  };

  const handleFindTutor = () => scrollToElementWithOffset('tutors');
  const handleHowItWorks = () => scrollToElementWithOffset('how-it-works');
  const handleTestimonials = () => scrollToElementWithOffset('testimonials');

  const handleOpenBooking = (tutor?: Tutor, subject?: SubjectCategory) => {
    setSelectedTutorForBooking(tutor || null);
    setSelectedSubjectForBooking(subject || null);
    setBookingModalOpen(true);
  };

  const handleOpenProfile = (tutor: Tutor) => {
    setActiveProfileTutor(tutor);
    setTutorProfileModalOpen(true);
  };

  const handleOpenSubject = (subject: SubjectCategory) => {
    setActiveSubject(subject);
    setSubjectModalOpen(true);
  };

  const handleRoleDemoLogin = (role: UserRole) => {
    setPortalRole(role);
    setPortalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar
        onClaimDiscount={() => setDiscountModalOpen(true)}
        onBecomeTutor={() => setBecomeTutorModalOpen(true)}
        onOpenLogin={() => setAuthModalOpen(true)}
        onOpenHelp={() => alert("LearnSphere 24/7 Help Desk: Call +1 (555) 789-2026 or email support@learnsphere.edu")}
        onOpenResources={() => setAboutModalOpen(true)}
      />

      {/* 2. Global Navigation */}
      <Navbar
        onBookSession={() => handleOpenBooking()}
        onFindTutor={handleFindTutor}
        onHowItWorks={handleHowItWorks}
        onPricing={() => setPricingModalOpen(true)}
        onTestimonials={handleTestimonials}
        onAboutUs={() => setAboutModalOpen(true)}
        onBecomeTutor={() => setBecomeTutorModalOpen(true)}
        onLogin={() => setAuthModalOpen(true)}
        onSelectSubject={handleOpenSubject}
        onOpenClassroom={() => setClassroomModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 3. Hero Section */}
        <Hero
          onFindTutor={handleFindTutor}
          onHowItWorks={handleHowItWorks}
          onBookSession={() => handleOpenBooking()}
          onOpenClassroom={() => setClassroomModalOpen(true)}
        />

        {/* 4. Trust Section (Monochrome Partner Logos) */}
        <TrustSection />

        {/* 5. Popular Subjects (Horizontal Carousel) */}
        <PopularSubjects
          onSelectSubject={handleOpenSubject}
          onViewAllSubjects={handleFindTutor}
        />

        {/* 6. How It Works (Timeline & Process) */}
        <HowItWorks
          onGetStarted={() => handleOpenBooking()}
          onOpenClassroom={() => setClassroomModalOpen(true)}
        />

        {/* 7. Find Your Perfect Tutor (Discovery Grid & Search) */}
        <FeaturedTutors
          onViewProfile={handleOpenProfile}
          onBookTutor={(tutor) => handleOpenBooking(tutor)}
        />

        {/* 8. Success / Testimonials Section */}
        <TestimonialsSection />

        {/* 9. Statistics Band (Midnight Navy) */}
        <StatsSection />

        {/* 10. Promotional Offer CTA with Countdown */}
        <PromotionalBanner
          onClaimDiscount={() => setDiscountModalOpen(true)}
        />

        {/* 11. Newsletter Subscription */}
        <NewsletterSection />

      </main>

      {/* 12. Dark Footer */}
      <Footer
        onFindTutor={handleFindTutor}
        onHowItWorks={handleHowItWorks}
        onPricing={() => setPricingModalOpen(true)}
        onSuccessStories={handleTestimonials}
        onAboutUs={() => setAboutModalOpen(true)}
        onBecomeTutor={() => setBecomeTutorModalOpen(true)}
        onOpenHelp={() => alert("LearnSphere Help Center: Contact our academic advising team 24/7 at support@learnsphere.edu")}
      />

      {/* Floating Internal Navigation and Quick-Jump Widget */}
      <InternalNavWidget
        onOpenPortal={(role) => {
          setPortalRole(role);
          setPortalOpen(true);
        }}
        onBookSession={() => handleOpenBooking()}
        onOpenPricing={() => setPricingModalOpen(true)}
        onOpenOffer={() => setDiscountModalOpen(true)}
        onOpenClassroom={() => setClassroomModalOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedTutor={selectedTutorForBooking}
        preselectedSubject={selectedSubjectForBooking}
      />

      <TutorProfileModal
        isOpen={tutorProfileModalOpen}
        tutor={activeProfileTutor}
        onClose={() => setTutorProfileModalOpen(false)}
        onBookSession={(tutor) => handleOpenBooking(tutor)}
      />

      <SubjectModal
        isOpen={subjectModalOpen}
        subject={activeSubject}
        onClose={() => setSubjectModalOpen(false)}
        onSelectTutor={handleOpenProfile}
        onBookSubject={(subj) => handleOpenBooking(undefined, subj)}
      />

      <DiscountModal
        isOpen={discountModalOpen}
        onClose={() => setDiscountModalOpen(false)}
        onApplyAndBook={() => handleOpenBooking()}
      />

      <BecomeTutorModal
        isOpen={becomeTutorModalOpen}
        onClose={() => setBecomeTutorModalOpen(false)}
      />

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onSelectPlan={(plan) => {
          if (plan === 'Tutor') setBecomeTutorModalOpen(true);
          else handleOpenBooking();
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSelectRoleDemo={handleRoleDemoLogin}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        onBookSession={() => handleOpenBooking()}
      />

      <PortalPreview
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        initialRole={portalRole}
        onOpenClassroom={() => setClassroomModalOpen(true)}
      />

      {/* Interactive Whiteboard Virtual Classroom Modal */}
      <VirtualClassroomModal
        isOpen={classroomModalOpen}
        onClose={() => setClassroomModalOpen(false)}
        onBookSession={() => {
          setClassroomModalOpen(false);
          handleOpenBooking();
        }}
      />

    </div>
  );
}
