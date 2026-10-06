import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Calendar, 
  CheckSquare, 
  Square,
  BarChart3,
  Flame,
  Info,
  Play,
  RotateCcw,
  Trophy,
  Crown,
  Zap,
  Medal,
  Star,
  ShieldCheck,
  Share2,
  X,
  Compass
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';

export type MilestoneStatus = 'completed' | 'in-progress' | 'upcoming' | 'locked';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'master';

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  tier: BadgeTier;
  iconType: 'trophy' | 'crown' | 'medal' | 'star' | 'zap' | 'flame' | 'award';
  xpBonus: number;
  unlockedAt?: string;
  skillsUnlocked: string[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
}

export interface Milestone {
  id: string;
  step: number;
  title: string;
  category: string;
  status: MilestoneStatus;
  date: string;
  score: number; // mastery score 0-100
  benchmark: number; // expected cohort benchmark
  studyHours: number;
  xpAwarded: number;
  summary: string;
  tutorFeedback?: string;
  badge?: AchievementBadge;
  subtasks: Subtask[];
}

export interface LearningPathData {
  id: string;
  subject: string;
  title: string;
  level: string;
  targetGoal: string;
  tutorName: string;
  milestones: Milestone[];
}

const INITIAL_PATHS: LearningPathData[] = [
  {
    id: 'calc-bc',
    subject: 'Mathematics',
    title: 'AP Calculus BC: Score 5 Mastery Route',
    level: 'Advanced High School / AP',
    targetGoal: '5 on AP Exam & College Credit',
    tutorName: 'Sarah Ahmed (MIT Math)',
    milestones: [
      {
        id: 'm1',
        step: 1,
        title: 'Limits & Continuity Rigor',
        category: 'Foundations',
        status: 'completed',
        date: 'Sep 02',
        score: 95,
        benchmark: 82,
        studyHours: 12,
        xpAwarded: 350,
        summary: 'Delta-epsilon proofs, infinite limits, and intermediate value theorem application.',
        tutorFeedback: 'Superb conceptual comprehension. Flawless algebraic factoring under pressure.',
        badge: {
          id: 'b-calc-1',
          name: 'Limitless Pioneer',
          description: 'Mastered rigorous epsilon-delta boundary proofs and indeterminate limit forms.',
          tier: 'gold',
          iconType: 'medal',
          xpBonus: 200,
          unlockedAt: 'Sep 02, 2026',
          skillsUnlocked: ['Epsilon-Delta Rigor', 'Squeeze Theorem', 'L\'Hôpital Proofs'],
        },
        subtasks: [
          { id: 'st-1-1', title: 'Evaluate indeterminate forms via algebraic conjugate', completed: true, xp: 100 },
          { id: 'st-1-2', title: 'Master Squeeze Theorem trigonometric limits', completed: true, xp: 120 },
          { id: 'st-1-3', title: 'Complete 30 timed AP multiple choice problems', completed: true, xp: 130 },
        ],
      },
      {
        id: 'm2',
        step: 2,
        title: 'Derivatives & Chain Rule Mastery',
        category: 'Core Differential Calculus',
        status: 'completed',
        date: 'Sep 09',
        score: 91,
        benchmark: 80,
        studyHours: 16,
        xpAwarded: 420,
        summary: 'Power rule, product/quotient rules, chain rule compositions, and implicit differentiation.',
        tutorFeedback: 'Mastered chain rule nested derivatives. Work on logarithmic differentiation speed.',
        badge: {
          id: 'b-calc-2',
          name: 'Chain Reaction Virtuoso',
          description: 'Calculated complex multi-layer composite derivatives and implicit conic tangents flawlessly.',
          tier: 'gold',
          iconType: 'zap',
          xpBonus: 220,
          unlockedAt: 'Sep 09, 2026',
          skillsUnlocked: ['Implicit Conic Analysis', 'Higher Order Differentials', 'Transcendental Derivatives'],
        },
        subtasks: [
          { id: 'st-2-1', title: 'Implicit differentiation of higher-order curves', completed: true, xp: 140 },
          { id: 'st-2-2', title: 'Differentiability vs continuity corner/cusp analysis', completed: true, xp: 130 },
          { id: 'st-2-3', title: 'Inverse trigonometric differentiation formulas', completed: true, xp: 150 },
        ],
      },
      {
        id: 'm3',
        step: 3,
        title: 'Applications of Derivatives & Related Rates',
        category: 'Applied Analysis',
        status: 'completed',
        date: 'Sep 16',
        score: 88,
        benchmark: 76,
        studyHours: 18,
        xpAwarded: 480,
        summary: 'Related rates word scenarios, Mean Value Theorem, optimization, curve sketching via f\' and f\'\'.',
        tutorFeedback: 'Strong optimization modelling. Diagram geometric constraints early to save time.',
        badge: {
          id: 'b-calc-3',
          name: 'Rate of Change Maestro',
          description: 'Conquered non-linear geometric related rates and 3D constraint optimization challenges.',
          tier: 'diamond',
          iconType: 'trophy',
          xpBonus: 280,
          unlockedAt: 'Sep 16, 2026',
          skillsUnlocked: ['Related Rates Modeling', 'Global Extrema Optimization', 'Mean Value Theorem'],
        },
        subtasks: [
          { id: 'st-3-1', title: 'Geometric related rates (cones, ladders, shadows)', completed: true, xp: 160 },
          { id: 'st-3-2', title: 'First and second derivative tests for concavity & inflection', completed: true, xp: 160 },
          { id: 'st-3-3', title: '1-on-1 problem debrief with Sarah Ahmed', completed: true, xp: 160 },
        ],
      },
      {
        id: 'm4',
        step: 4,
        title: 'Integration & Fundamental Theorem (FTC)',
        category: 'Integral Calculus',
        status: 'in-progress',
        date: 'Sep 25',
        score: 84,
        benchmark: 75,
        studyHours: 14,
        xpAwarded: 320,
        summary: 'Riemann sums, definite and indefinite integrals, u-substitution, and accumulation functions.',
        tutorFeedback: 'Currently practicing integration by parts and trigonometric substitution.',
        badge: {
          id: 'b-calc-4',
          name: 'Integral Architect',
          description: 'Awarded upon mastering Fundamental Theorem of Calculus Parts 1 & 2 and Tabular By-Parts.',
          tier: 'diamond',
          iconType: 'award',
          xpBonus: 300,
          skillsUnlocked: ['FTC Accumulation Functions', 'Integration by Parts', 'Trig Substitution'],
        },
        subtasks: [
          { id: 'st-4-1', title: 'Definite integrals as signed net area and FTC Part 1', completed: true, xp: 120 },
          { id: 'st-4-2', title: 'U-substitution with bounds transformation practice', completed: true, xp: 100 },
          { id: 'st-4-3', title: 'Integration by Parts (Tabular & algebraic method)', completed: false, xp: 150 },
          { id: 'st-4-4', title: 'Solve 2023 AP Free Response Question #4', completed: false, xp: 150 },
        ],
      },
      {
        id: 'm5',
        step: 5,
        title: 'Differential Equations & Slope Fields',
        category: 'Modeling',
        status: 'upcoming',
        date: 'Oct 04',
        score: 72,
        benchmark: 74,
        studyHours: 0,
        xpAwarded: 0,
        summary: 'Separation of variables, exponential growth models, logistic equations, and Euler method approximation.',
        tutorFeedback: 'Scheduled to kick off next week with interactive slope field simulation.',
        badge: {
          id: 'b-calc-5',
          name: 'Slope Field Navigator',
          description: 'Awarded for modeling non-linear logistic differential systems and Euler step approximations.',
          tier: 'silver',
          iconType: 'star',
          xpBonus: 240,
          skillsUnlocked: ['Separation of Variables', 'Euler Method Approximations', 'Logistic Carrying Capacity'],
        },
        subtasks: [
          { id: 'st-5-1', title: 'Construct and sketch slope fields for dy/dx', completed: false, xp: 130 },
          { id: 'st-5-2', title: 'Euler Method iterative approximations', completed: false, xp: 140 },
          { id: 'st-5-3', title: 'Logistic differential equations carrying capacity', completed: false, xp: 150 },
        ],
      },
      {
        id: 'm6',
        step: 6,
        title: 'Parametric, Polar & Vector Calculus',
        category: 'BC Only Units',
        status: 'locked',
        date: 'Oct 14',
        score: 65,
        benchmark: 72,
        studyHours: 0,
        xpAwarded: 0,
        summary: 'Velocity and acceleration vectors, polar coordinates area between loops, arc length formulas.',
        badge: {
          id: 'b-calc-6',
          name: 'Polar Dimension Surfer',
          description: 'Awarded for mastering polar loop integration and parametric velocity/acceleration vectors.',
          tier: 'gold',
          iconType: 'flame',
          xpBonus: 260,
          skillsUnlocked: ['Polar Arc Length Integration', 'Parametric Vector Kinematics', 'Loop Overlap Analysis'],
        },
        subtasks: [
          { id: 'st-6-1', title: 'Arc length integrals in Cartesian & parametric', completed: false, xp: 150 },
          { id: 'st-6-2', title: 'Polar area integration between overlapping curves', completed: false, xp: 160 },
        ],
      },
      {
        id: 'm7',
        step: 7,
        title: 'Infinite Sequences & Taylor / Maclaurin Series',
        category: 'Capstone Mastery',
        status: 'locked',
        date: 'Oct 24',
        score: 60,
        benchmark: 70,
        studyHours: 0,
        xpAwarded: 0,
        summary: 'Convergence tests (ratio, root, alternating), power series radius of convergence, and Taylor polynomials.',
        badge: {
          id: 'b-calc-7',
          name: 'Infinite Series Grandmaster',
          description: 'The highest honor in AP Calculus BC. Awarded for constructing high-order Taylor power series and error bounds.',
          tier: 'master',
          iconType: 'crown',
          xpBonus: 400,
          skillsUnlocked: ['Taylor Error Bounds (Lagrange)', 'Power Series Radii', '8 Convergence Tests Matrix'],
        },
        subtasks: [
          { id: 'st-7-1', title: 'Master 8 convergence tests decision matrix', completed: false, xp: 180 },
          { id: 'st-7-2', title: 'Derive Taylor polynomials for sin(x), e^x, and ln(1+x)', completed: false, xp: 200 },
          { id: 'st-7-3', title: 'Full 3-hour AP Calculus BC simulated exam', completed: false, xp: 300 },
        ],
      },
    ],
  },
  {
    id: 'sat-math',
    subject: 'Test Prep',
    title: 'Digital SAT Math: 800 Target Blueprint',
    level: 'College Readiness',
    targetGoal: '780–800 Scaled Math Score',
    tutorName: 'Marcus Vance (99th Percentile Coach)',
    milestones: [
      {
        id: 'sat-1',
        step: 1,
        title: 'Linear Equations & Systems Speed',
        category: 'Heart of Algebra',
        status: 'completed',
        date: 'Sep 05',
        score: 98,
        benchmark: 84,
        studyHours: 10,
        xpAwarded: 320,
        summary: 'Slope-intercept, point-slope, system of linear inequalities, and constant solutions.',
        tutorFeedback: 'Exceptional speed: 35 seconds per problem average with zero arithmetic mistakes.',
        badge: {
          id: 'b-sat-1',
          name: 'Algebra Speed Demon',
          description: 'Achieved sub-40 second solving speed with 98% accuracy on hard linear systems.',
          tier: 'gold',
          iconType: 'zap',
          xpBonus: 200,
          unlockedAt: 'Sep 05, 2026',
          skillsUnlocked: ['Rapid Desmos Regression', 'Infinite Solution Coefficients', 'Slope Inequalities'],
        },
        subtasks: [
          { id: 'sat-1-1', title: 'Zero vs infinite solution coefficients shortcut', completed: true, xp: 110 },
          { id: 'sat-1-2', title: 'Desmos regression and graphing tricks', completed: true, xp: 130 },
        ],
      },
      {
        id: 'sat-2',
        step: 2,
        title: 'Advanced Quadratics & Parabolas',
        category: 'Passport to Advanced Math',
        status: 'completed',
        date: 'Sep 12',
        score: 92,
        benchmark: 78,
        studyHours: 14,
        xpAwarded: 390,
        summary: 'Vertex formula (-b/2a), discriminant analysis for roots, and completing the square.',
        tutorFeedback: 'High accuracy on vertex forms. Keep practicing non-linear system intersections.',
        badge: {
          id: 'b-sat-2',
          name: 'Parabola Dominator',
          description: 'Mastered vertex conversions and discriminant root cases in high-difficulty quadratic modules.',
          tier: 'gold',
          iconType: 'medal',
          xpBonus: 220,
          unlockedAt: 'Sep 12, 2026',
          skillsUnlocked: ['Vertex Transformation Shortcuts', 'Discriminant Delta Proofs', 'Completing The Square'],
        },
        subtasks: [
          { id: 'sat-2-1', title: 'Discriminant delta cases (real vs non-real roots)', completed: true, xp: 130 },
          { id: 'sat-2-2', title: 'Equivalent non-linear forms timed drill', completed: true, xp: 140 },
        ],
      },
      {
        id: 'sat-3',
        step: 3,
        title: 'Problem Solving & Data Analysis',
        category: 'Statistics & Rates',
        status: 'in-progress',
        date: 'Sep 26',
        score: 86,
        benchmark: 80,
        studyHours: 11,
        xpAwarded: 290,
        summary: 'Ratios, unit conversions, scatterplot lines of best fit, margin of error, and standard deviation.',
        tutorFeedback: 'Double check question phrasing: percent increase vs percent of total.',
        badge: {
          id: 'b-sat-3',
          name: 'Statistical Sage',
          description: 'Awarded for conquering conditional two-way probabilities and margin-of-error inferences.',
          tier: 'diamond',
          iconType: 'trophy',
          xpBonus: 260,
          skillsUnlocked: ['Standard Deviation Bounds', 'Conditional Probabilities', 'Exponential Modeling'],
        },
        subtasks: [
          { id: 'sat-3-1', title: 'Compound interest and exponential growth modeling', completed: true, xp: 120 },
          { id: 'sat-3-2', title: 'Two-way conditional frequency tables', completed: true, xp: 110 },
          { id: 'sat-3-3', title: 'Margin of error and sample size inference', completed: false, xp: 140 },
        ],
      },
      {
        id: 'sat-4',
        step: 4,
        title: 'Geometry & Trigonometry in Digital SAT',
        category: 'Additional Topics',
        status: 'upcoming',
        date: 'Oct 07',
        score: 75,
        benchmark: 76,
        studyHours: 0,
        xpAwarded: 0,
        summary: 'Circle equations (x-h)^2 + (y-k)^2 = r^2, radian measurements, special right triangles.',
        badge: {
          id: 'b-sat-4',
          name: 'Trig Precision Specialist',
          description: 'Awarded for circle geometry completion and complementary sine-cosine identities.',
          tier: 'silver',
          iconType: 'star',
          xpBonus: 240,
          skillsUnlocked: ['Circle Center & Radius Derivations', 'Radian Trig Identities', 'Similar Triangle Ratios'],
        },
        subtasks: [
          { id: 'sat-4-1', title: 'Circle completion of square for center and radius', completed: false, xp: 130 },
          { id: 'sat-4-2', title: 'Sine/cosine complementary angles identity', completed: false, xp: 120 },
        ],
      },
      {
        id: 'sat-5',
        step: 5,
        title: 'Full Adaptive Module 2 Hard-Level Mock',
        category: 'Exam Simulation',
        status: 'locked',
        date: 'Oct 18',
        score: 70,
        benchmark: 75,
        studyHours: 0,
        xpAwarded: 0,
        summary: '44 questions timed test mimicking Bluebook hardest test adaptive routing.',
        badge: {
          id: 'b-sat-5',
          name: 'Perfect 800 Pathfinder',
          description: 'The pinnacle award. Achieved 100% scaled mastery on hardest adaptive Module 2 simulation.',
          tier: 'master',
          iconType: 'crown',
          xpBonus: 500,
          skillsUnlocked: ['Bluebook Hard Module Pacing', 'Elimination Strategy', '800 Score Benchmark'],
        },
        subtasks: [
          { id: 'sat-5-1', title: 'Complete Bluebook practice test #5 hard module', completed: false, xp: 250 },
        ],
      },
    ],
  },
  {
    id: 'physics-c',
    subject: 'Science',
    title: 'AP Physics C: Mechanics Master Track',
    level: 'College Level',
    targetGoal: 'Score 5 & Lab Research Foundations',
    tutorName: 'Dr. Elena Rostova (PhD Physics)',
    milestones: [
      {
        id: 'phys-1',
        step: 1,
        title: '1D & 2D Kinematics with Calculus',
        category: 'Motion Dynamics',
        status: 'completed',
        date: 'Sep 04',
        score: 94,
        benchmark: 81,
        studyHours: 15,
        xpAwarded: 410,
        summary: 'Position derivative functions, velocity vectors, integration for displacement, air resistance drag.',
        tutorFeedback: 'Exceptional integration skills for non-constant acceleration problems.',
        badge: {
          id: 'b-phys-1',
          name: 'Kinematics Commander',
          description: 'Derived non-constant terminal velocity differential equations with high mathematical precision.',
          tier: 'gold',
          iconType: 'zap',
          xpBonus: 220,
          unlockedAt: 'Sep 04, 2026',
          skillsUnlocked: ['Velocity Vector Derivatives', 'Terminal Velocity Integrals', 'Air Drag Modeling'],
        },
        subtasks: [
          { id: 'phys-1-1', title: 'Derive kinematic formulas using definite integrals', completed: true, xp: 140 },
          { id: 'phys-1-2', title: 'Terminal velocity differential equation solving', completed: true, xp: 150 },
        ],
      },
      {
        id: 'phys-2',
        step: 2,
        title: "Newton's Laws & Friction Planes",
        category: 'Force Interactions',
        status: 'completed',
        date: 'Sep 14',
        score: 90,
        benchmark: 79,
        studyHours: 16,
        xpAwarded: 440,
        summary: 'Free-body diagrams on inclines, coupled masses with massless/massive pulleys, centripetal forces.',
        tutorFeedback: 'Solid force decomposition. Remember normal force changes when pulling at an angle.',
        badge: {
          id: 'b-phys-2',
          name: 'Newtonian Force Master',
          description: 'Constructed multi-mass Atwood acceleration systems and banked curved friction thresholds.',
          tier: 'gold',
          iconType: 'medal',
          xpBonus: 240,
          unlockedAt: 'Sep 14, 2026',
          skillsUnlocked: ['Coupled Atwood Dynamics', 'Banked Curve Centripetal Bounds', 'Variable Friction Forces'],
        },
        subtasks: [
          { id: 'phys-2-1', title: 'Atwood machine tension derivations with pulleys', completed: true, xp: 150 },
          { id: 'phys-2-2', title: 'Banked curve friction min/max velocity calculus', completed: true, xp: 150 },
        ],
      },
      {
        id: 'phys-3',
        step: 3,
        title: 'Work, Kinetic Energy & Conservative Fields',
        category: 'Energy Conservation',
        status: 'in-progress',
        date: 'Sep 27',
        score: 85,
        benchmark: 78,
        studyHours: 10,
        xpAwarded: 280,
        summary: 'Line integrals for work, potential energy functions U(x) = -integral(F dx), non-linear springs.',
        tutorFeedback: 'Focusing on conservative vs non-conservative energy transfer diagrams.',
        badge: {
          id: 'b-phys-3',
          name: 'Conservative Energy Titan',
          description: 'Awarded for solving path-independent line integrals and potential well equilibrium stability.',
          tier: 'diamond',
          iconType: 'trophy',
          xpBonus: 280,
          skillsUnlocked: ['Line Integrals for Work', 'Potential Energy Wells', 'Non-linear Spring Calculus'],
        },
        subtasks: [
          { id: 'phys-3-1', title: 'Variable spring force F = -kx^3 work calculations', completed: true, xp: 130 },
          { id: 'phys-3-2', title: 'Equilibrium stability points from dU/dx = 0', completed: false, xp: 140 },
          { id: 'phys-3-3', title: 'FRQ roller coaster loop normal force derivation', completed: false, xp: 150 },
        ],
      },
      {
        id: 'phys-4',
        step: 4,
        title: 'System of Particles & Center of Mass',
        category: 'Momentum',
        status: 'upcoming',
        date: 'Oct 08',
        score: 74,
        benchmark: 75,
        studyHours: 0,
        xpAwarded: 0,
        summary: 'Continuous mass integration x_cm = (1/M) integral(x dm), elastic vs inelastic collisions in 2D.',
        badge: {
          id: 'b-phys-4',
          name: 'Center of Mass Oracle',
          description: 'Awarded for continuous non-uniform mass density integration and 2D momentum conservation.',
          tier: 'silver',
          iconType: 'star',
          xpBonus: 250,
          skillsUnlocked: ['Continuous Density Integration', '2D Collisions in CM Frame', 'Impulse Integrals'],
        },
        subtasks: [
          { id: 'phys-4-1', title: 'Center of mass of non-uniform density rods', completed: false, xp: 150 },
        ],
      },
      {
        id: 'phys-5',
        step: 5,
        title: 'Rotational Kinematics & Moment of Inertia',
        category: 'Rotation',
        status: 'locked',
        date: 'Oct 20',
        score: 68,
        benchmark: 73,
        studyHours: 0,
        xpAwarded: 0,
        summary: 'Parallel axis theorem, torque vectors, rolling without slipping dynamics.',
        badge: {
          id: 'b-phys-5',
          name: 'Rotational Dynamics Legend',
          description: 'The supreme Mechanics badge. Awarded for parallel axis theorem and rolling dynamics.',
          tier: 'master',
          iconType: 'crown',
          xpBonus: 450,
          skillsUnlocked: ['Parallel Axis Theorem', 'Rolling Without Slipping Torque', 'Angular Momentum Vectors'],
        },
        subtasks: [
          { id: 'phys-5-1', title: 'Calculate moment of inertia of solid cylinder and sphere', completed: false, xp: 180 },
        ],
      },
    ],
  },
];

export const LearningPath: React.FC = () => {
  const [paths, setPaths] = useState<LearningPathData[]>(INITIAL_PATHS);
  const [selectedPathId, setSelectedPathId] = useState<string>('calc-bc');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('m4');
  const [metricView, setMetricView] = useState<'mastery' | 'hours' | 'xp'>('mastery');
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<AchievementBadge | null>(null);
  const [graphClickFeedback, setGraphClickFeedback] = useState<{
    milestoneId: string;
    step: number;
    title: string;
    isCompleted: boolean;
    badgeName?: string;
  } | null>(null);

  // Currently active learning path
  const currentPath = useMemo(() => {
    return paths.find(p => p.id === selectedPathId) || paths[0];
  }, [paths, selectedPathId]);

  // Currently selected milestone for detail inspector
  const currentMilestone = useMemo(() => {
    return currentPath.milestones.find(m => m.id === selectedMilestoneId) || currentPath.milestones[0];
  }, [currentPath, selectedMilestoneId]);

  // All completed badges for this track
  const earnedBadges = useMemo(() => {
    return currentPath.milestones
      .filter(m => m.status === 'completed' && m.badge)
      .map(m => m.badge!);
  }, [currentPath]);

  // Aggregate stats
  const stats = useMemo(() => {
    const milestones = currentPath.milestones;
    const completedCount = milestones.filter(m => m.status === 'completed').length;
    const totalCount = milestones.length;
    const inProgressCount = milestones.filter(m => m.status === 'in-progress').length;
    const completionPercent = Math.round((completedCount / totalCount) * 100);

    const totalXp = milestones.reduce((acc, m) => acc + m.xpAwarded + (m.status === 'completed' && m.badge ? m.badge.xpBonus : 0), 0);
    const totalHours = milestones.reduce((acc, m) => acc + m.studyHours, 0);
    
    // Average score of completed and in-progress
    const scoredMilestones = milestones.filter(m => m.status === 'completed' || m.status === 'in-progress');
    const avgMastery = scoredMilestones.length > 0 
      ? Math.round(scoredMilestones.reduce((acc, m) => acc + m.score, 0) / scoredMilestones.length) 
      : 0;

    return {
      completedCount,
      totalCount,
      inProgressCount,
      completionPercent,
      totalXp,
      totalHours,
      avgMastery,
      earnedBadgesCount: earnedBadges.length,
      totalBadgesCount: milestones.filter(m => m.badge).length,
    };
  }, [currentPath, earnedBadges]);

  // Chart data formatted for Recharts
  const chartData = useMemo(() => {
    let runningXp = 0;
    let runningHours = 0;

    return currentPath.milestones.map((m) => {
      const bonus = m.status === 'completed' && m.badge ? m.badge.xpBonus : 0;
      runningXp += (m.xpAwarded + bonus);
      runningHours += m.studyHours;

      return {
        id: m.id,
        name: `M${m.step}: ${m.title.length > 18 ? m.title.substring(0, 16) + '...' : m.title}`,
        fullName: m.title,
        step: `Step ${m.step}`,
        stepNum: m.step,
        date: m.date,
        score: m.score,
        benchmark: m.benchmark,
        status: m.status,
        studyHours: m.studyHours,
        cumulativeHours: runningHours,
        xpAwarded: m.xpAwarded,
        cumulativeXp: runningXp,
        badge: m.badge,
        isCompleted: m.status === 'completed',
        isSelected: m.id === selectedMilestoneId,
      };
    });
  }, [currentPath, selectedMilestoneId]);

  // Handler when clicking a milestone node (from graph, stepper, or badge)
  const handleMilestoneSelect = (milestoneId: string, fromGraph = false) => {
    setSelectedMilestoneId(milestoneId);
    const targetMilestone = currentPath.milestones.find(m => m.id === milestoneId);
    
    if (targetMilestone) {
      setGraphClickFeedback({
        milestoneId: targetMilestone.id,
        step: targetMilestone.step,
        title: targetMilestone.title,
        isCompleted: targetMilestone.status === 'completed',
        badgeName: targetMilestone.badge?.name,
      });

      // Clear feedback banner after 6 seconds
      setTimeout(() => {
        setGraphClickFeedback(prev => (prev?.milestoneId === milestoneId ? null : prev));
      }, 6000);
    }
  };

  // Toggle subtask completion dynamically to update the graph in real-time
  const toggleSubtask = (milestoneId: string, subtaskId: string) => {
    setPaths(prevPaths => {
      return prevPaths.map(p => {
        if (p.id !== currentPath.id) return p;

        const updatedMilestones = p.milestones.map(m => {
          if (m.id !== milestoneId) return m;

          const updatedSubtasks = m.subtasks.map(st => {
            if (st.id !== subtaskId) return st;
            return { ...st, completed: !st.completed };
          });

          // Calculate new completion ratio
          const completedSubs = updatedSubtasks.filter(st => st.completed).length;
          const totalSubs = updatedSubtasks.length;
          const subtaskRatio = totalSubs > 0 ? completedSubs / totalSubs : 0;

          // Dynamically adjust milestone score and status
          let newStatus: MilestoneStatus = m.status;
          let newScore = m.score;
          let newXp = m.xpAwarded;
          let updatedBadge = m.badge;

          if (completedSubs === totalSubs) {
            newStatus = 'completed';
            newScore = Math.max(93, m.score + 5);
            newXp = updatedSubtasks.reduce((sum, s) => sum + s.xp, 0);
            if (updatedBadge && !updatedBadge.unlockedAt) {
              updatedBadge = {
                ...updatedBadge,
                unlockedAt: 'Unlocked Today!',
              };
            }
          } else if (completedSubs > 0) {
            newStatus = 'in-progress';
            newScore = Math.min(88, 70 + Math.round(subtaskRatio * 20));
            newXp = updatedSubtasks.filter(s => s.completed).reduce((sum, s) => sum + s.xp, 0);
          } else {
            newStatus = 'in-progress';
            newScore = Math.max(68, m.benchmark - 5);
            newXp = 0;
          }

          return {
            ...m,
            subtasks: updatedSubtasks,
            status: newStatus,
            score: newScore,
            xpAwarded: newXp,
            badge: updatedBadge,
          };
        });

        return { ...p, milestones: updatedMilestones };
      });
    });
  };

  // Visual helper for badge icons
  const renderBadgeIcon = (iconType: string, className = "w-4 h-4") => {
    switch (iconType) {
      case 'crown': return <Crown className={className} />;
      case 'medal': return <Medal className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'flame': return <Flame className={className} />;
      case 'star': return <Star className={className} />;
      case 'award': return <Award className={className} />;
      default: return <Trophy className={className} />;
    }
  };

  // Visual styling for badge tiers
  const getBadgeTierStyle = (tier: BadgeTier, unlocked = true) => {
    if (!unlocked) {
      return {
        bg: 'bg-slate-100',
        border: 'border-slate-300',
        text: 'text-slate-400',
        glow: '',
        ring: 'ring-slate-200',
        label: 'Locked',
      };
    }
    switch (tier) {
      case 'master':
        return {
          bg: 'bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600',
          border: 'border-amber-300',
          text: 'text-white',
          glow: 'shadow-lg shadow-purple-500/25',
          ring: 'ring-2 ring-amber-400',
          label: 'Master Tier',
        };
      case 'diamond':
        return {
          bg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
          border: 'border-cyan-200',
          text: 'text-white',
          glow: 'shadow-md shadow-cyan-500/20',
          ring: 'ring-2 ring-cyan-400',
          label: 'Diamond Tier',
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-amber-400 to-amber-600',
          border: 'border-amber-200',
          text: 'text-slate-950 font-bold',
          glow: 'shadow-md shadow-amber-500/25',
          ring: 'ring-2 ring-amber-300',
          label: 'Gold Tier',
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-slate-200 to-slate-400',
          border: 'border-slate-300',
          text: 'text-slate-800',
          glow: 'shadow-xs',
          ring: 'ring-1 ring-slate-400',
          label: 'Silver Tier',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-amber-700 to-amber-900',
          border: 'border-amber-600',
          text: 'text-white',
          glow: 'shadow-xs',
          ring: 'ring-1 ring-amber-500',
          label: 'Bronze Tier',
        };
    }
  };

  // Status visual helpers
  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Mastered
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 animate-pulse">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            In Progress
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Next Up
          </span>
        );
      case 'locked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            <Lock className="w-3 h-3 text-slate-400" />
            Locked
          </span>
        );
    }
  };

  // Custom Clickable SVG Node on Recharts Graph
  const CustomGraphDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;

    const isSelected = payload.id === selectedMilestoneId;
    const isCompleted = payload.status === 'completed';
    const hasBadge = !!payload.badge;

    return (
      <g 
        className="cursor-pointer transition-all duration-200"
        onClick={() => handleMilestoneSelect(payload.id, true)}
      >
        {/* Pulsing halo if currently selected */}
        {isSelected && (
          <>
            <circle 
              cx={cx} 
              cy={cy} 
              r={18} 
              className="animate-ping" 
              fill="#F59E0B" 
              fillOpacity={0.35} 
            />
            <circle 
              cx={cx} 
              cy={cy} 
              r={14} 
              fill="#F59E0B" 
              fillOpacity={0.2} 
            />
          </>
        )}

        {/* Outer Ring */}
        <circle
          cx={cx}
          cy={cy}
          r={isSelected ? 10 : isCompleted ? 7.5 : 6}
          fill={isSelected ? '#F59E0B' : isCompleted ? '#10B981' : '#4F46E5'}
          stroke="#FFFFFF"
          strokeWidth={isSelected ? 3 : 2}
          className="transition-transform duration-200 hover:scale-125"
        />

        {/* Achievement Badge Star Icon for completed nodes */}
        {isCompleted && (
          <circle
            cx={cx}
            cy={cy}
            r={3}
            fill="#FEF08A"
          />
        )}

        {/* Floating Trophy Icon Badge above completed node when selected */}
        {isSelected && hasBadge && isCompleted && (
          <g transform={`translate(${cx - 9}, ${cy - 28})`}>
            <rect
              width={18}
              height={16}
              rx={4}
              fill="#0B132B"
              stroke="#F59E0B"
              strokeWidth={1}
            />
            <polygon
              points="9,4 11,8 15,8 12,11 13,15 9,12 5,15 6,11 3,8 7,8"
              fill="#F59E0B"
              transform="scale(0.8) translate(2, 0)"
            />
          </g>
        )}
      </g>
    );
  };

  // Custom Tooltip for Recharts
  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/98 backdrop-blur-md text-white p-3.5 rounded-xl shadow-2xl border border-slate-700 text-xs space-y-2 min-w-[230px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-amber-400">{data.step}: {data.date}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-tight ${
              data.status === 'completed' ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40' :
              data.status === 'in-progress' ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40' : 'bg-slate-800 text-slate-400'
            }`}>
              {data.status}
            </span>
          </div>

          <p className="font-semibold text-slate-100">{data.fullName}</p>
          
          <div className="space-y-1 font-mono text-[11px] bg-slate-800/60 p-2 rounded-lg border border-slate-700/60">
            <div className="flex justify-between items-center text-indigo-300">
              <span>Student Mastery:</span>
              <span className="font-bold text-white text-xs">{data.score}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>National Cohort:</span>
              <span>{data.benchmark}%</span>
            </div>
            {metricView === 'hours' && (
              <div className="flex justify-between items-center text-amber-300">
                <span>Total Study Time:</span>
                <span>{data.cumulativeHours} hrs</span>
              </div>
            )}
            {metricView === 'xp' && (
              <div className="flex justify-between items-center text-emerald-300">
                <span>Cumulative XP:</span>
                <span>{data.cumulativeXp} XP</span>
              </div>
            )}
          </div>

          {/* Achievement Badge Status in Tooltip */}
          {data.badge && (
            <div className={`p-2 rounded-lg flex items-center justify-between gap-2 border text-[11px] ${
              data.isCompleted 
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' 
                : 'bg-slate-800/40 border-slate-700 text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5 truncate">
                <Trophy className={`w-3.5 h-3.5 shrink-0 ${data.isCompleted ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="truncate font-semibold">{data.badge.name}</span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase shrink-0">
                {data.isCompleted ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          )}

          <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-800 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Click node to inspect milestone & achievements</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden font-sans">
      
      {/* 1. Header Bar with Learning Path Selector */}
      <div className="bg-gradient-to-r from-[#0B132B] via-indigo-950 to-[#0B132B] text-white p-5 sm:p-6 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-semibold">
                Dynamic Learning Path
              </span>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                {currentPath.targetGoal}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-serif text-white">
              {currentPath.title}
            </h2>

            <p className="text-xs text-slate-300 flex items-center gap-3">
              <span>Assigned Mentor: <strong className="text-white">{currentPath.tutorName}</strong></span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Track: <strong>{currentPath.subject}</strong> ({currentPath.level})</span>
            </p>
          </div>

          {/* Subject Route Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Switch Path:</span>
            <div className="bg-slate-800/80 p-1 rounded-xl flex items-center gap-1 border border-slate-700">
              {paths.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPathId(p.id);
                    setSelectedMilestoneId(p.milestones[0].id);
                    setGraphClickFeedback(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedPathId === p.id 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {p.subject === 'Mathematics' ? 'Calculus BC' : p.subject === 'Test Prep' ? 'SAT Math' : 'AP Physics'}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Aggregate KPI Stats Ribbon with Badges Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-indigo-900/60">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Path Progress</div>
            <div className="text-xl font-bold text-white mt-0.5 flex items-baseline gap-1.5">
              <span>{stats.completionPercent}%</span>
              <span className="text-xs text-slate-400 font-normal">({stats.completedCount}/{stats.totalCount} milestones)</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Average Mastery</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 flex items-baseline gap-1.5">
              <span>{stats.avgMastery}%</span>
              <span className="text-xs text-emerald-300 font-medium">+14% vs benchmark</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Achievement Badges</div>
            <div className="text-xl font-bold text-amber-300 mt-0.5 flex items-baseline gap-1.5">
              <span className="flex items-center gap-1">
                <Trophy className="w-5 h-5 text-amber-400 inline" />
                {stats.earnedBadgesCount} / {stats.totalBadgesCount}
              </span>
              <span className="text-xs text-amber-200/80 font-normal">unlocked</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Total XP Earned</div>
            <div className="text-xl font-bold text-indigo-300 mt-0.5 flex items-baseline gap-1">
              <span>{stats.totalXp}</span>
              <span className="text-xs text-slate-300 font-normal">XP with badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Achievement Badges Showcase Gallery */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 border-b border-indigo-900/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Medal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Milestone Achievement Badges</span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  {stats.earnedBadgesCount} Unlocked
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Earn verified academic badges upon completing each milestone checkpoint.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
            <span>Click any badge to view certification & milestones</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
          {currentPath.milestones.map((m) => {
            if (!m.badge) return null;
            const isCompleted = m.status === 'completed';
            const tierStyle = getBadgeTierStyle(m.badge.tier, isCompleted);
            const isSelected = m.id === selectedMilestoneId;

            return (
              <button
                key={m.badge.id}
                onClick={() => {
                  handleMilestoneSelect(m.id);
                  if (isCompleted) {
                    setSelectedBadgeModal(m.badge!);
                  }
                }}
                className={`group relative p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'ring-2 ring-amber-400 border-amber-400 bg-white/10 shadow-lg' 
                    : 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10'
                }`}
              >
                {/* Badge Top: Icon + Tier Pill */}
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${tierStyle.bg} ${tierStyle.text} ${tierStyle.ring}`}>
                    {renderBadgeIcon(m.badge.iconType, "w-4 h-4")}
                  </div>

                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {isCompleted ? 'UNLOCKED' : `STEP ${m.step}`}
                  </span>
                </div>

                {/* Badge Name */}
                <div className="space-y-0.5">
                  <div className={`text-xs font-bold leading-tight line-clamp-1 ${isCompleted ? 'text-white group-hover:text-amber-300' : 'text-slate-400'}`}>
                    {m.badge.name}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {isCompleted ? m.badge.unlockedAt : 'Locked Checkpoint'}
                  </div>
                </div>

                {/* Badge XP & Indicator */}
                <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="font-mono text-amber-300 font-bold">
                    +{m.badge.xpBonus} XP
                  </span>
                  <span className="text-[10px] text-indigo-300 group-hover:translate-x-0.5 transition-transform">
                    {isCompleted ? 'View →' : 'Lock'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive Milestone Stepper Roadmap */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Milestone Roadmap & Checkpoints
            </h3>
            <p className="text-xs text-slate-500">
              Click any milestone node or graph point to view objectives, practice assignments, and tutor notes.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span> Current</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Next Up</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Locked</span>
          </div>
        </div>

        {/* Horizontal Node Stepper */}
        <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
          <div className="flex items-center min-w-max gap-1 px-1">
            {currentPath.milestones.map((milestone, idx) => {
              const isSelected = selectedMilestoneId === milestone.id;
              const isLast = idx === currentPath.milestones.length - 1;
              const isCompleted = milestone.status === 'completed';

              return (
                <React.Fragment key={milestone.id}>
                  {/* Milestone Node Button */}
                  <button
                    onClick={() => handleMilestoneSelect(milestone.id)}
                    className={`group relative flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer min-w-[175px] max-w-[210px] ${
                      isSelected 
                        ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md -translate-y-0.5' 
                        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs hover:border-slate-300'
                    }`}
                  >
                    {/* Top step icon + badge indicator */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        milestone.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        milestone.status === 'in-progress' ? 'bg-indigo-600 text-white shadow-xs' :
                        milestone.status === 'upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {milestone.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : milestone.status === 'locked' ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : (
                          milestone.step
                        )}
                      </div>

                      {/* Achievement badge pill */}
                      {milestone.badge && isCompleted ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                          <Trophy className="w-3 h-3 text-amber-500" />
                          Badge
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-semibold text-slate-400">
                          {milestone.date}
                        </span>
                      )}
                    </div>

                    {/* Milestone Title */}
                    <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 line-clamp-1">
                      {milestone.title}
                    </div>

                    <div className="text-[10px] text-slate-500 truncate w-full mt-0.5">
                      {milestone.category}
                    </div>

                    {/* Bottom Progress Tag */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 w-full flex items-center justify-between text-[10px]">
                      <span className="font-bold text-indigo-700">
                        {milestone.score}% Mastery
                      </span>
                      <span className="text-slate-400 font-medium">
                        {milestone.subtasks.filter(s => s.completed).length}/{milestone.subtasks.length} tasks
                      </span>
                    </div>
                  </button>

                  {/* Connecting Line Between Steps */}
                  {!isLast && (
                    <div className="w-6 sm:w-8 h-0.5 bg-slate-300 shrink-0 relative">
                      <div 
                        className={`h-full ${
                          milestone.status === 'completed' ? 'bg-emerald-500' : 
                          milestone.status === 'in-progress' ? 'bg-indigo-500' : 'bg-slate-200'
                        }`} 
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Dynamic Progress Tracking Graph (Recharts Area & Line) */}
      <div className="p-5 sm:p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Dynamic Mastery & Progress Tracking Graph
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any graph node to inspect milestone metrics and reveal unlocked achievement honors.
            </p>
          </div>

          {/* Metric View Toggle */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setMetricView('mastery')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metricView === 'mastery' ? 'bg-white text-indigo-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mastery Score (%)
            </button>
            <button
              onClick={() => setMetricView('hours')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metricView === 'hours' ? 'bg-white text-indigo-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Study Hours
            </button>
            <button
              onClick={() => setMetricView('xp')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                metricView === 'xp' ? 'bg-white text-indigo-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Accumulated XP
            </button>
          </div>
        </div>

        {/* Visual Graph Click Notification Indicator Banner */}
        {graphClickFeedback && (
          <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-[#0B132B] text-white border border-indigo-700/60 shadow-md flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {graphClickFeedback.step}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Graph Node Selected
                  </span>
                  {graphClickFeedback.isCompleted && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.2 rounded-full font-bold border border-emerald-400/40 flex items-center gap-1">
                      <Trophy className="w-2.5 h-2.5 text-amber-400" />
                      Badge Unlocked: {graphClickFeedback.badgeName}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-white">
                  {graphClickFeedback.title}
                </div>
              </div>
            </div>

            <button
              onClick={() => setGraphClickFeedback(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Recharts Container with Clickable Interactive Nodes */}
        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {metricView === 'mastery' ? (
              <AreaChart 
                data={chartData} 
                margin={{ top: 18, right: 20, left: -15, bottom: 0 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    handleMilestoneSelect(e.activePayload[0].payload.id, true);
                  }
                }}
              >
                <defs>
                  <linearGradient id="masteryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis 
                  dataKey="step" 
                  tick={{ fontSize: 11, fill: '#64748B' }} 
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis 
                  domain={[50, 100]} 
                  tick={{ fontSize: 11, fill: '#64748B' }} 
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip content={<CustomChartTooltip />} />
                
                {/* Benchmark threshold guide */}
                <ReferenceLine y={85} stroke="#10B981" strokeDasharray="4 4" label={{ value: 'Target 85% Exam Readiness', fill: '#059669', fontSize: 10, position: 'insideTopRight' }} />
                
                {/* Cohort Line */}
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#94A3B8" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#94A3B8' }} 
                  name="Cohort Median"
                />

                {/* Student Mastery Area with Custom Clickable Interactive Dots */}
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4338CA" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#masteryGradient)" 
                  dot={<CustomGraphDot />}
                  activeDot={{ r: 7, fill: '#F59E0B', stroke: '#4338CA', strokeWidth: 2 }}
                />

                {/* Visual Highlight indicator for currently selected milestone */}
                {currentMilestone && (
                  <ReferenceDot 
                    x={`Step ${currentMilestone.step}`} 
                    y={currentMilestone.score} 
                    r={9} 
                    fill="#F59E0B" 
                    stroke="#FFFFFF" 
                    strokeWidth={3} 
                  />
                )}
              </AreaChart>
            ) : metricView === 'hours' ? (
              <AreaChart 
                data={chartData} 
                margin={{ top: 18, right: 20, left: -15, bottom: 0 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    handleMilestoneSelect(e.activePayload[0].payload.id, true);
                  }
                }}
              >
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="step" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit="h" />
                <Tooltip content={<CustomChartTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeHours" 
                  stroke="#D97706" 
                  strokeWidth={3} 
                  fill="url(#hoursGradient)" 
                  dot={<CustomGraphDot />}
                />
              </AreaChart>
            ) : (
              <AreaChart 
                data={chartData} 
                margin={{ top: 18, right: 20, left: -15, bottom: 0 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    handleMilestoneSelect(e.activePayload[0].payload.id, true);
                  }
                }}
              >
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="step" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit="xp" />
                <Tooltip content={<CustomChartTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeXp" 
                  stroke="#059669" 
                  strokeWidth={3} 
                  fill="url(#xpGradient)" 
                  dot={<CustomGraphDot />}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend notes */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Student Mastery
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 font-medium">
              <span className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-white"></span> Unlocked Badge Node
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-400"></span> National AP Benchmark
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-500"></span> 85% AP 5 Target Line
            </span>
          </div>
          <span className="text-[11px] text-slate-400 italic">
            *Click any node in graph to open checkpoint details
          </span>
        </div>
      </div>

      {/* 5. Active Milestone Detail Inspector with Achievement Badge Showcase */}
      {currentMilestone && (
        <div className="p-5 sm:p-6 bg-white">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Milestone Summary & Objectives */}
            <div className="lg:w-7/12 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                      Checkpoint {currentMilestone.step} of {currentPath.milestones.length}
                    </span>
                    {getStatusBadge(currentMilestone.status)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {currentMilestone.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Category: <strong className="text-slate-700">{currentMilestone.category}</strong> · Target Completion: <strong className="text-slate-700">{currentMilestone.date}</strong>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold font-mono text-indigo-700">
                    {currentMilestone.score}%
                  </div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                    Current Score
                  </span>
                </div>
              </div>

              {/* Achievement Badge Banner if Milestone has one */}
              {currentMilestone.badge && (
                <div className={`p-4 rounded-xl border transition-all ${
                  currentMilestone.status === 'completed'
                    ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${
                        getBadgeTierStyle(currentMilestone.badge.tier, currentMilestone.status === 'completed').bg
                      } ${
                        getBadgeTierStyle(currentMilestone.badge.tier, currentMilestone.status === 'completed').text
                      }`}>
                        {renderBadgeIcon(currentMilestone.badge.iconType, "w-6 h-6")}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-mono font-extrabold tracking-wider px-2 py-0.5 rounded-full ${
                            currentMilestone.status === 'completed'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {currentMilestone.status === 'completed' ? '🏆 Achievement Unlocked' : '🔒 Milestone Achievement'}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-600">
                            +{currentMilestone.badge.xpBonus} Bonus XP
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                          {currentMilestone.badge.name}
                        </h4>

                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {currentMilestone.badge.description}
                        </p>
                      </div>
                    </div>

                    {currentMilestone.status === 'completed' && (
                      <button
                        onClick={() => setSelectedBadgeModal(currentMilestone.badge!)}
                        className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Badge</span>
                      </button>
                    )}
                  </div>

                  {/* Skills unlocked by this badge */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Verified Competencies:</span>
                    {currentMilestone.badge.skillsUnlocked.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {currentMilestone.summary}
              </p>

              {/* Mentor Feedback Box */}
              {currentMilestone.tutorFeedback && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tutor Evaluation Note ({currentPath.tutorName})</span>
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    "{currentMilestone.tutorFeedback}"
                  </p>
                </div>
              )}

              {/* Interactive Sub-task Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Milestone Objectives & Practice Modules
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Check tasks to simulate dynamic real-time progress & unlock badges
                  </span>
                </div>

                <div className="space-y-2">
                  {currentMilestone.subtasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => toggleSubtask(currentMilestone.id, task.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        task.completed 
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          task.completed ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-transparent'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-xs font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                          {task.title}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        +{task.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Next Steps, Rewards & Action Center */}
            <div className="lg:w-5/12 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Checkpoint Milestones Reward
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Earned XP</span>
                    <span className="text-base font-bold text-indigo-700 font-mono">
                      +{currentMilestone.xpAwarded + (currentMilestone.status === 'completed' && currentMilestone.badge ? currentMilestone.badge.xpBonus : 0)} XP
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Study Hours</span>
                    <span className="text-base font-bold text-amber-700 font-mono">{currentMilestone.studyHours} Hours</span>
                  </div>
                </div>

                {/* Badge Achievement Callout Card */}
                {currentMilestone.badge && (
                  <div className="bg-gradient-to-br from-indigo-900 via-[#0B132B] to-slate-950 p-4 rounded-xl text-white border border-indigo-700/50 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                        {currentMilestone.status === 'completed' ? 'Badge Unlocked' : 'Upcoming Badge'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        currentMilestone.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {currentMilestone.badge.tier}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        getBadgeTierStyle(currentMilestone.badge.tier, currentMilestone.status === 'completed').bg
                      } ${
                        getBadgeTierStyle(currentMilestone.badge.tier, currentMilestone.status === 'completed').text
                      }`}>
                        {renderBadgeIcon(currentMilestone.badge.iconType, "w-5 h-5")}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{currentMilestone.badge.name}</div>
                        <div className="text-[11px] text-slate-300">+{currentMilestone.badge.xpBonus} XP Achievement Bonus</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-900 block">Recommended Practice Drill</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Complete 10 high-frequency multiple-choice problems with step-by-step Socratic hints powered by LearnSphere AI.
                  </p>
                  <button 
                    onClick={() => alert(`Launching practice drill for ${currentMilestone.title}...`)}
                    className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                    Start 10-Min Practice Drill
                  </button>
                </div>
              </div>

              {/* Tutor Booking / Check-in CTA */}
              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={() => alert(`Connecting with mentor ${currentPath.tutorName} for milestone review...`)}
                  className="w-full py-2.5 bg-[#0B132B] hover:bg-indigo-950 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Review Checkpoint with {currentPath.tutorName.split(' ')[0]}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 6. Achievement Badge Modal */}
      {selectedBadgeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedBadgeModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 text-slate-800"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header with Glow */}
            <div className="bg-gradient-to-br from-[#0B132B] via-indigo-950 to-slate-900 text-white p-6 text-center relative overflow-hidden">
              <button
                onClick={() => setSelectedBadgeModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-xl mb-3 relative group">
                <div className={`w-full h-full rounded-2xl flex items-center justify-center ${
                  getBadgeTierStyle(selectedBadgeModal.tier, true).bg
                } ${
                  getBadgeTierStyle(selectedBadgeModal.tier, true).text
                } ring-4 ring-amber-400/40`}>
                  {renderBadgeIcon(selectedBadgeModal.iconType, "w-10 h-10")}
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                {selectedBadgeModal.tier} Achievement Badge
              </span>

              <h3 className="text-xl font-bold font-serif text-white mt-2">
                {selectedBadgeModal.name}
              </h3>

              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
                {selectedBadgeModal.description}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">XP Awarded</span>
                  <span className="text-lg font-bold text-indigo-700 font-mono">+{selectedBadgeModal.xpBonus} XP</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Date Earned</span>
                  <span className="text-xs font-bold text-slate-800">{selectedBadgeModal.unlockedAt || 'Recently'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Verified Academic Skills
                </span>
                <div className="space-y-1.5">
                  {selectedBadgeModal.skillsUnlocked.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => alert(`Certificate of Achievement for "${selectedBadgeModal.name}" exported to student portfolio!`)}
                  className="flex-1 py-2.5 bg-[#0B132B] hover:bg-indigo-950 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Share Credential</span>
                </button>
                <button
                  onClick={() => setSelectedBadgeModal(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
