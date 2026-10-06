# LearnSphere — Master SaaS Architectural Specification

## 1. Reference Screenshot Analysis
- **Aesthetic Tone**: Premium, high-trust educational platform. Warm, welcoming, and academically rigorous.
- **Color Hierarchy**:
  - Primary: Deep Navy / Midnight Indigo (`#0B132B`, `#1C2541`)
  - Secondary: Royal Academic Indigo / Violet (`#4338CA`, `#4F46E5`)
  - Accent: Warm Gold / Amber (`#F59E0B`, `#D97706`) for ratings, badges, and focal calls to action
  - Surfaces: Clean White (`#FFFFFF`) with whisper-soft slate/lavender section alternating backgrounds (`#F8FAFC`, `#F5F3FF`)
- **Typography**:
  - Headings: Refined academic serif (`Playfair Display`, `Lora`) communicating pedagogical authority.
  - Body & UI: Modern, clean humanist sans-serif (`Plus Jakarta Sans`) with optical sizing and high legibility.
- **Layout Rhythm**:
  - Top announcement banner with quick utility links.
  - Global navigation with clear hierarchy, subjects dropdown, and high-contrast "Book a Free Session" primary button.
  - Hero split layout: High-converting value proposition on the left (clear badges, large serif headline with vibrant highlight, supporting text, dual CTAs, and 4 trust indicator metrics) with a warm photographic visual on the right.
  - Social Proof / Organization Bar: Soft monochrome badges ("Learning resources students know").
  - Horizontal subject card carousels with category icons and direct explore links.
  - 4-step "How It Works" structured progress timeline.
  - Tutor discovery grid with ratings, credentials, rates, and direct booking.
  - Testimonial cards with real quotes and student/parent outcomes.
  - High-impact statistics bar in midnight navy.
  - Limited-time promotional CTA with discount voucher claim.
  - Newsletter capture with privacy compliance.
  - Multi-column comprehensive dark footer with legal and contact details.

---

## 2. Design System Tokens
- **Palette**:
  - `navy-950`: `#080D1A`
  - `navy-900`: `#0B132B`
  - `indigo-600`: `#4F46E5`
  - `indigo-700`: `#4338CA`
  - `gold-500`: `#F59E0B`
  - `gold-600`: `#D97706`
  - `slate-50`: `#F8FAFC`
  - `slate-100`: `#F1F5F9`
  - `slate-600`: `#475569`
  - `slate-900`: `#0F172A`
- **Radii**: 12px to 18px for cards (`rounded-xl`, `rounded-2xl`), 8px to 10px for buttons and inputs.
- **Elevation**: Subtle layered soft shadows (`shadow-sm`, `shadow-md`, `shadow-xl`) without neon glow.
- **Zero-Pill Compliance**: Static metadata rendered as unboxed typography with dot separators (`·`).

---

## 3. Page Architecture
- `/` — Homepage / Landing (Phase 1): Announcement, Navbar, Hero, Trust Organizations, Popular Subjects, How It Works, Expert Tutors, Testimonials, Statistics, Promotional Offer, Newsletter, Footer.
- `/tutors` & `/tutors/:id` — Tutor directory with multi-faceted search (subject, grade, price, rating, availability) and comprehensive tutor profiles.
- `/subjects/:slug` — Dedicated subject landing page with curriculum, topics, and matched tutors.
- `/courses` & `/courses/:id` — Self-paced courses and interactive LMS player.
- `/book-session` — Multi-step booking engine (Select Subject -> Pick Tutor -> Choose Date & Slot -> Student Details -> Instant Confirmation).
- `/dashboard/student` — Student learning dashboard (Active courses, streaks, upcoming live sessions, assignments, AI study partner).
- `/dashboard/tutor` — Tutor teaching center (Schedule, bookings, earnings, curriculum builder, student communications).
- `/dashboard/parent` — Parent portal (Child progress reports, attendance, teacher feedback, billing).
- `/dashboard/academy` — Multi-tenant organization portal (Teacher management, student cohorts, custom domain and branding).
- `/admin` — Master SaaS control center (Platform analytics, commission rates, content management, audit logs).

---

## 4. Database Schema (PostgreSQL DDL Reference)

```sql
-- Organizations / Tenants
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    primary_color VARCHAR(16) DEFAULT '#4338CA',
    custom_domain VARCHAR(255) UNIQUE,
    subscription_tier VARCHAR(32) DEFAULT 'academy',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users & Auth
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(32),
    avatar_url TEXT,
    role VARCHAR(32) NOT NULL CHECK (role IN ('student', 'parent', 'tutor', 'organization_admin', 'super_admin')),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tutors Profile
CREATE TABLE tutor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    headline VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    experience_years INT NOT NULL DEFAULT 1,
    hourly_rate_cents INT NOT NULL DEFAULT 3500,
    is_verified BOOLEAN DEFAULT FALSE,
    teaching_style TEXT,
    languages TEXT[] DEFAULT ARRAY['English'],
    rating_avg NUMERIC(3, 2) DEFAULT 5.00,
    total_reviews INT DEFAULT 0,
    total_students_taught INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subjects & Categories
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(64) NOT NULL,
    description TEXT,
    icon_name VARCHAR(64),
    is_active BOOLEAN DEFAULT TRUE
);

-- Tutoring Sessions & Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    tutor_id UUID REFERENCES tutor_profiles(id) ON DELETE RESTRICT,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE RESTRICT,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
    session_type VARCHAR(32) NOT NULL DEFAULT 'trial_free' CHECK (session_type IN ('trial_free', 'paid_1on1', 'group_class')),
    price_cents INT NOT NULL DEFAULT 0,
    meeting_url TEXT,
    recording_url TEXT,
    student_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews & Ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tutor_id UUID REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses & Modules
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    author_tutor_id UUID REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price_cents INT NOT NULL DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    thumbnail_url TEXT,
    difficulty_level VARCHAR(32) DEFAULT 'Beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. User Roles and Permission Matrix
1. **Student**: Searches tutors, books trial and paid sessions, joins live whiteboard rooms, watches courses, asks the AI Tutor questions, tracks XP and streaks.
2. **Parent**: Linked to child accounts, views attendance and session logs, inspects grade improvements, manages family payment methods.
3. **Tutor**: Publishes profile, sets recurring weekly availability, conducts 1-on-1 virtual classrooms, assigns homework drills, tracks earnings.
4. **Organization / Academy Admin**: Whitelabels their tutoring institute, assigns tutors to student cohorts, accesses aggregate retention analytics.
5. **Super Admin**: Manages marketplace payout commissions, resolves disputes, curates featured tutors, configures promotional campaigns.

---

## 6. Primary User Journeys
1. **Discovery to Free Trial Session**:
   Visitor lands on homepage -> filters by Mathematics -> views Sarah Ahmed's profile -> clicks "Book a Free Session" -> selects tomorrow at 4:00 PM -> fills student grade & goals -> receives instant calendar confirmation + video room link.
2. **Course Self-Paced Learning**:
   Student explores "Popular Subjects" -> clicks "Computer Science" -> previews Python course curriculum -> enrolls -> watches video module with interactive code exercise.
3. **AI Homework & Concept Assistance**:
   Student encounters difficult calculus derivative -> queries "AI Tutor" -> AI tutor provides Socratic step-by-step hint rather than giving the raw answer.
4. **Tutor Onboarding**:
   Qualified teacher clicks "Become a Tutor" in top navbar -> submits academic credentials and subject masteries -> enters review queue.

---

## 7. API Architecture
- `GET /api/tutors` — Filtered tutor query with pagination and availability slots.
- `GET /api/tutors/:id` — Detailed tutor dossier with reviews and rating breakdown.
- `POST /api/bookings` — Create session reservation with idempotent conflict detection.
- `GET /api/subjects` — Full directory of subject categories and sub-topics.
- `POST /api/newsletter` — Secure email capture with opt-in double verification.
- `POST /api/ai-tutor/chat` — Streaming pedagogical AI explanation with guardrails.
- `POST /api/coupons/claim` — Validates voucher code (e.g. `BRIGHTER20` for 20% off).

---

## 8. Multi-Tenant SaaS Isolation
- Every tenant has an isolated slug (`tenant_id`).
- Supports custom domains (e.g. `academy.mathmasters.com` with CNAME mapping).
- Configurable theme parameters (brand name, primary color, custom banner logo).
- Isolated billing balances with automated platform split fees via Stripe Connect.
