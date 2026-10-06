export type UserRole = 'student' | 'parent' | 'tutor' | 'organization_admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  createdAt: string;
}

export interface Tutor {
  id: string;
  name: string;
  title: string;
  subject: string;
  allSubjects: string[];
  avatar: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  experienceYears: number;
  hourlyRate: number;
  verified: boolean;
  tagline: string;
  bio: string;
  education: string[];
  languages: string[];
  teachingStyle: string;
  availableSlots: string[];
  nextAvailable: string;
  ratingBreakdown: { stars: number; percentage: number }[];
  featuredReviews: {
    id: string;
    studentName: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

export interface SubjectCategory {
  id: string;
  slug: string;
  name: string;
  iconName: 'math' | 'science' | 'english' | 'testprep' | 'cs' | 'languages';
  shortDesc: string;
  fullDesc: string;
  topics: string[];
  popularGrades: string;
  activeTutorsCount: number;
  averageRate: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  school: string;
  avatar: string;
  rating: number;
  quote: string;
  subject: string;
  improvement: string;
}

export interface PlatformStat {
  label: string;
  value: string;
  subtext: string;
  icon: string;
}

export interface BookingRequest {
  id?: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  notes?: string;
  gradeLevel?: string;
  sessionType: 'trial_free' | 'paid_1on1';
  amount: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  subject: string;
  rating: number;
  studentsCount: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  isFree: boolean;
  thumbnail: string;
  description: string;
  modulesCount: number;
  lessonsCount: number;
}
