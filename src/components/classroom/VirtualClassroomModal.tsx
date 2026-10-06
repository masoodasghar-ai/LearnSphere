import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Hand, 
  MessageSquare, 
  Share2, 
  Download, 
  Undo, 
  Redo, 
  Trash2, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  Calculator, 
  BookOpen, 
  Palette, 
  PenTool, 
  Highlighter, 
  Eraser, 
  Square, 
  Circle, 
  Minus, 
  ArrowRight, 
  Grid, 
  Type, 
  Layout, 
  Layers, 
  Volume2, 
  Award,
  Clock,
  Compass,
  Zap,
  Info
} from 'lucide-react';

interface VirtualClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSession?: () => void;
}

type ToolType = 'pen' | 'highlighter' | 'eraser' | 'line' | 'arrow' | 'rect' | 'circle' | 'axis' | 'text';
type GridType = 'blank' | 'grid' | 'dots' | 'chalkboard';

interface LessonScenario {
  id: string;
  subject: string;
  title: string;
  tutorName: string;
  tutorAvatar: string;
  tutorBio: string;
  topic: string;
  problemText: string;
  steps: {
    title: string;
    transcript: string;
    actionText: string;
    drawActions: Array<{
      type: 'text' | 'line' | 'curve' | 'rect' | 'circle' | 'highlight' | 'axis';
      x1: number;
      y1: number;
      x2?: number;
      y2?: number;
      color: string;
      lineWidth: number;
      text?: string;
    }>;
  }[];
  quickQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const LESSON_SCENARIOS: LessonScenario[] = [
  {
    id: 'calc-optimization',
    subject: 'AP Calculus BC',
    title: 'Optimization & Critical Points: Maximum Cylinder Volume',
    tutorName: 'Sarah Ahmed',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    tutorBio: 'MIT Mathematics · 1,400+ Hours Taught',
    topic: 'Derivative Applications (Unit 5)',
    problemText: 'A metal can manufacturer wants to construct a closed cylindrical can of volume V = 1000 cm³. Find the radius r and height h that minimizes the total surface area.',
    steps: [
      {
        title: 'Step 1: Diagram & Geometric Setup',
        transcript: 'Welcome Jason! Today we are tackling optimization. First rule of applied calculus: always sketch the geometry and list what is fixed vs what we are minimizing.',
        actionText: 'Tutor is sketching cylinder dimensions (radius r and height h) and writing constraint equations...',
        drawActions: [
          { type: 'text', x1: 50, y1: 45, color: '#0F172A', lineWidth: 16, text: 'Goal: Minimize Surface Area A = 2πr² + 2πrh' },
          { type: 'text', x1: 50, y1: 75, color: '#4338CA', lineWidth: 14, text: 'Constraint: V = πr²h = 1000 cm³  =>  h = 1000 / (πr²)' },
          { type: 'circle', x1: 150, y1: 160, x2: 150, y2: 175, color: '#3B82F6', lineWidth: 2 },
          { type: 'line', x1: 100, y1: 160, x2: 100, y2: 250, color: '#3B82F6', lineWidth: 2 },
          { type: 'line', x1: 200, y1: 160, x2: 200, y2: 250, color: '#3B82F6', lineWidth: 2 },
          { type: 'circle', x1: 150, y1: 250, x2: 150, y2: 265, color: '#3B82F6', lineWidth: 2 },
          { type: 'text', x1: 215, y1: 205, color: '#64748B', lineWidth: 12, text: 'height h' },
          { type: 'line', x1: 150, y1: 160, x2: 200, y2: 160, color: '#EF4444', lineWidth: 1.5 },
          { type: 'text', x1: 165, y1: 150, color: '#EF4444', lineWidth: 12, text: 'r' },
        ],
      },
      {
        title: 'Step 2: Single-Variable Area Function',
        transcript: 'Notice we have two variables (r and h). By substituting our constraint h = 1000/(πr²) into the surface area equation, we get a function purely in terms of r!',
        actionText: 'Tutor is substituting constraint into Area formula...',
        drawActions: [
          { type: 'text', x1: 50, y1: 300, color: '#0F172A', lineWidth: 15, text: 'A(r) = 2πr² + 2πr(1000 / πr²)' },
          { type: 'text', x1: 50, y1: 335, color: '#10B981', lineWidth: 16, text: 'A(r) = 2πr² + 2000·r⁻¹' },
          { type: 'highlight', x1: 45, y1: 320, x2: 320, y2: 345, color: '#FDE047', lineWidth: 24 },
        ],
      },
      {
        title: 'Step 3: Differentiate & Find Critical Points',
        transcript: 'Now for the calculus magic! To find where surface area is at an absolute minimum, we compute dA/dr using the power rule and set it equal to 0.',
        actionText: 'Tutor is taking the derivative dA/dr and solving for r...',
        drawActions: [
          { type: 'text', x1: 380, y1: 60, color: '#0F172A', lineWidth: 15, text: "A'(r) = 4πr - 2000·r⁻² = 0" },
          { type: 'text', x1: 380, y1: 95, color: '#4338CA', lineWidth: 15, text: '4πr = 2000 / r²   =>   4πr³ = 2000' },
          { type: 'text', x1: 380, y1: 130, color: '#10B981', lineWidth: 16, text: 'r³ = 500 / π   =>   r = ∛(500 / π) ≈ 5.42 cm' },
          { type: 'rect', x1: 375, y1: 110, x2: 680, y2: 145, color: '#10B981', lineWidth: 2 },
        ],
      },
      {
        title: 'Step 4: Second Derivative Test & Verification',
        transcript: 'Never stop without verifying! Does r ≈ 5.42 give a minimum or maximum? We check A\'\'(r) = 4π + 4000/r³. Because r > 0, A\'\'(r) > 0 everywhere, proving concave up and a guaranteed global minimum!',
        actionText: 'Tutor is graphing concavity and verifying optimal dimensions...',
        drawActions: [
          { type: 'text', x1: 380, y1: 180, color: '#0F172A', lineWidth: 14, text: "Verification: A''(r) = 4π + 4000/r³ > 0  (Concave Up ✓)" },
          { type: 'text', x1: 380, y1: 215, color: '#B45309', lineWidth: 14, text: 'Optimal Height: h = 2r ≈ 10.84 cm' },
          { type: 'text', x1: 380, y1: 245, color: '#059669', lineWidth: 14, text: 'Key takeaway: Height equals diameter (h = 2r) minimizes material!' },
          { type: 'curve', x1: 390, y1: 340, x2: 550, y2: 340, color: '#6366F1', lineWidth: 2.5 },
          { type: 'text', x1: 440, y1: 355, color: '#6366F1', lineWidth: 12, text: 'Local Min at r ≈ 5.42' },
        ],
      },
    ],
    quickQuestion: {
      question: 'Why do we compute the second derivative A"(r) in optimization?',
      options: [
        'To find the y-intercept of the area function',
        'To confirm whether the critical point is a local minimum vs maximum',
        'To calculate the total cost of aluminum material',
        'To check if the function is differentiable at x = 0',
      ],
      correctIndex: 1,
      explanation: 'Exactly! By the Second Derivative Test, if A"(r) > 0 at a critical point, the graph is concave upward, confirming an absolute minimum.',
    },
  },
  {
    id: 'sat-geometry',
    subject: 'Digital SAT Math',
    title: 'Circle Equations & 40-Second Desmos Shortcut',
    tutorName: 'Marcus Vance',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    tutorBio: '99th Percentile SAT Coach · 800 Math Specialist',
    topic: 'Passport to Advanced Math / Circle Theorems',
    problemText: 'The equation of a circle in the xy-plane is x² + y² - 6x + 8y = 24. What are the coordinates of the center (h, k) and the length of the radius r?',
    steps: [
      {
        title: 'Step 1: Standard Circle Form Inspection',
        transcript: 'Welcome! College Board loves putting circle equations in general form. Your goal is always to rewrite it in standard form: (x - h)² + (y - k)² = r².',
        actionText: 'Tutor is grouping x and y terms to prepare for completing the square...',
        drawActions: [
          { type: 'text', x1: 50, y1: 50, color: '#0F172A', lineWidth: 16, text: 'Standard Form: (x - h)² + (y - k)² = r²' },
          { type: 'text', x1: 50, y1: 85, color: '#4338CA', lineWidth: 14, text: 'Given: (x² - 6x) + (y² + 8y) = 24' },
          { type: 'axis', x1: 500, y1: 220, color: '#CBD5E1', lineWidth: 1.5 },
        ],
      },
      {
        title: 'Step 2: Complete The Square Fast',
        transcript: 'Here is the 10-second mental math trick: take half the linear coefficient and square it. Half of -6 is -3, squared is 9. Half of 8 is 4, squared is 16.',
        actionText: 'Tutor is balancing both sides of the equation...',
        drawActions: [
          { type: 'text', x1: 50, y1: 130, color: '#0F172A', lineWidth: 14, text: '(x² - 6x + 9) + (y² + 8y + 16) = 24 + 9 + 16' },
          { type: 'text', x1: 50, y1: 165, color: '#10B981', lineWidth: 16, text: '(x - 3)² + (y + 4)² = 49' },
          { type: 'highlight', x1: 45, y1: 150, x2: 330, y2: 175, color: '#A7F3D0', lineWidth: 24 },
        ],
      },
      {
        title: 'Step 3: Extract Center and Radius',
        transcript: 'Be very careful with negative signs! Since it is (x - h) and (y - k), (x - 3) means h = +3, and (y + 4) means k = -4. Radius is √49 = 7.',
        actionText: 'Tutor diagrams the center (3, -4) and radius 7 on the coordinate plane...',
        drawActions: [
          { type: 'text', x1: 50, y1: 215, color: '#B45309', lineWidth: 15, text: 'Center (h, k) = (3, -4)' },
          { type: 'text', x1: 50, y1: 245, color: '#B45309', lineWidth: 15, text: 'Radius r = √49 = 7' },
          { type: 'circle', x1: 530, y1: 260, x2: 590, y2: 260, color: '#4F46E5', lineWidth: 2.5 },
          { type: 'line', x1: 530, y1: 260, x2: 590, y2: 260, color: '#EF4444', lineWidth: 1.5 },
          { type: 'text', x1: 545, y1: 250, color: '#EF4444', lineWidth: 11, text: 'r = 7' },
          { type: 'text', x1: 510, y1: 275, color: '#0F172A', lineWidth: 11, text: '(3, -4)' },
        ],
      },
    ],
    quickQuestion: {
      question: 'What is the center and radius of (x + 5)² + (y - 2)² = 36?',
      options: [
        'Center (5, -2), radius 36',
        'Center (-5, 2), radius 6',
        'Center (5, 2), radius 6',
        'Center (-5, -2), radius 18',
      ],
      correctIndex: 1,
      explanation: 'Spot on! (x - h) means h = -5, (y - k) means k = 2, and r = √36 = 6.',
    },
  },
  {
    id: 'physics-incline',
    subject: 'AP Physics C: Mechanics',
    title: 'Free Body Diagrams on an Incline & Friction Threshold',
    tutorName: 'Dr. Elena Rostova',
    tutorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    tutorBio: 'PhD Applied Physics · 12 Years Coaching',
    topic: "Newton's Laws & Energy Dynamics",
    problemText: 'A block of mass m = 5 kg rests on a rough ramp inclined at θ = 30° with static friction coefficient μ_s = 0.4. Does the block slide down, and what is the net force?',
    steps: [
      {
        title: 'Step 1: Rotate The Coordinate System',
        transcript: 'Physics pro tip: When an object is on an incline, never use standard horizontal/vertical axes. Rotate your axes parallel (x) and perpendicular (y) to the ramp surface.',
        actionText: 'Tutor sketches the 30° ramp and mass m with rotated coordinate axes...',
        drawActions: [
          { type: 'line', x1: 60, y1: 300, x2: 360, y2: 300, color: '#64748B', lineWidth: 2 },
          { type: 'line', x1: 60, y1: 300, x2: 360, y2: 150, color: '#334155', lineWidth: 3 },
          { type: 'text', x1: 130, y1: 290, color: '#475569', lineWidth: 12, text: 'θ = 30°' },
          { type: 'rect', x1: 180, y1: 200, x2: 240, y2: 235, color: '#4338CA', lineWidth: 2 },
        ],
      },
      {
        title: 'Step 2: Decompose Gravity Force Vector',
        transcript: 'Gravity acts straight down with magnitude mg. We break it into two components: mg sin(θ) pulling down the ramp, and mg cos(θ) pressing into the ramp.',
        actionText: 'Tutor draws free-body force vectors: Normal Force, Gravity components, and Friction...',
        drawActions: [
          { type: 'line', x1: 210, y1: 215, x2: 210, y2: 280, color: '#EF4444', lineWidth: 2 },
          { type: 'text', x1: 215, y1: 275, color: '#EF4444', lineWidth: 12, text: 'mg = (5)(9.8) = 49 N' },
          { type: 'line', x1: 210, y1: 215, x2: 245, y2: 275, color: '#D97706', lineWidth: 1.5 },
          { type: 'text', x1: 250, y1: 260, color: '#D97706', lineWidth: 11, text: 'mg cos(30°) = 42.4 N' },
          { type: 'line', x1: 210, y1: 215, x2: 150, y2: 245, color: '#10B981', lineWidth: 2 },
          { type: 'text', x1: 100, y1: 235, color: '#10B981', lineWidth: 11, text: 'Down: mg sin(30°) = 24.5 N' },
        ],
      },
      {
        title: 'Step 3: Compare Driving Force vs Max Friction',
        transcript: 'Normal force N = mg cos(30°) = 42.4 N. The maximum static friction force that can hold the block is f_max = μ_s · N = 0.4 · 42.4 N = 16.96 N. Since 24.5 N > 16.96 N, static friction fails and the block accelerates!',
        actionText: 'Tutor calculates net accelerating force down the incline...',
        drawActions: [
          { type: 'text', x1: 400, y1: 60, color: '#0F172A', lineWidth: 15, text: 'Max Friction: f_max = μ_s · N = (0.4)(42.4 N) = 17.0 N' },
          { type: 'text', x1: 400, y1: 95, color: '#EF4444', lineWidth: 15, text: 'Driving Gravity Force: mg sin(30°) = 24.5 N' },
          { type: 'text', x1: 400, y1: 130, color: '#10B981', lineWidth: 16, text: 'Conclusion: 24.5 N > 17.0 N  =>  The block slides!' },
          { type: 'highlight', x1: 395, y1: 115, x2: 720, y2: 140, color: '#FDE047', lineWidth: 24 },
        ],
      },
    ],
    quickQuestion: {
      question: 'At what ramp angle θ does an object start sliding if static friction coefficient is μ_s?',
      options: [
        'tan(θ) = μ_s',
        'sin(θ) = μ_s',
        'cos(θ) = μ_s',
        'θ = 45° always',
      ],
      correctIndex: 0,
      explanation: 'Brilliant! When mg sin(θ) = μ_s mg cos(θ), dividing by cos(θ) gives tan(θ) = μ_s. This is the classic critical slip angle formula!',
    },
  },
];

export const VirtualClassroomModal: React.FC<VirtualClassroomModalProps> = ({
  isOpen,
  onClose,
  onBookSession,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const currentScenario = LESSON_SCENARIOS[selectedScenarioIndex];

  // Whiteboard Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [penColor, setPenColor] = useState<string>('#4338CA');
  const [penWidth, setPenWidth] = useState<number>(3);
  const [gridType, setGridType] = useState<GridType>('grid');
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  // Step-by-Step Lesson Player
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [tutorSpeechVisible, setTutorSpeechVisible] = useState(true);

  // AV & Classroom simulation states
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(1124); // ~18 mins
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // Socratic Quiz & Student Chat State
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'tutor' | 'student'; text: string; time: string }>>([
    { sender: 'tutor', text: 'Hi Jason! Today we are working on optimization and geometric setups. Let me know whenever you want me to pause or clarify.', time: '10:02' },
    { sender: 'student', text: 'Sounds great! I was struggling with substituting the constraint equation in homework.', time: '10:03' },
    { sender: 'tutor', text: 'No worries at all! Notice how on step 2 we eliminate height h completely. Feel free to draw your work on the board.', time: '10:04' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Session timer increment
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Setup Canvas and Background Grid
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, type: GridType) => {
    ctx.save();
    if (type === 'chalkboard') {
      ctx.fillStyle = '#064E3B'; // Deep chalkboard slate green
      ctx.fillRect(0, 0, width, height);
      // Subtle chalk texture grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      if (type === 'grid') {
        ctx.strokeStyle = '#F1F5F9';
        ctx.lineWidth = 1;
        const step = 30;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (type === 'dots') {
        ctx.fillStyle = '#CBD5E1';
        const step = 25;
        for (let x = step; x < width; x += step) {
          for (let y = step; y < height; y += step) {
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
    ctx.restore();
  }, []);

  // Initialize Canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI setup
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawGrid(ctx, rect.width, rect.height, gridType);
    renderStepDrawings(0, true);
  }, [isOpen, gridType, selectedScenarioIndex]);

  // Render Step Annotations on Canvas
  const renderStepDrawings = (targetStepIndex: number, resetCanvas = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (resetCanvas) {
      drawGrid(ctx, rect.width, rect.height, gridType);
    }

    // Render all steps up to targetStepIndex
    for (let s = 0; s <= targetStepIndex; s++) {
      const step = currentScenario.steps[s];
      if (!step) continue;

      step.drawActions.forEach(action => {
        ctx.save();
        ctx.strokeStyle = gridType === 'chalkboard' && action.color === '#0F172A' ? '#FFFFFF' : action.color;
        ctx.fillStyle = gridType === 'chalkboard' && action.color === '#0F172A' ? '#FFFFFF' : action.color;
        ctx.lineWidth = action.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (action.type === 'text' && action.text) {
          ctx.font = `600 ${action.lineWidth}px "Inter", -apple-system, sans-serif`;
          ctx.fillText(action.text, action.x1, action.y1);
        } else if (action.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(action.x1, action.y1);
          ctx.lineTo(action.x2 || action.x1, action.y2 || action.y1);
          ctx.stroke();
        } else if (action.type === 'rect') {
          ctx.beginPath();
          ctx.rect(action.x1, action.y1, (action.x2 || 100) - action.x1, (action.y2 || 50) - action.y1);
          ctx.stroke();
        } else if (action.type === 'circle') {
          ctx.beginPath();
          const r = Math.hypot((action.x2 || action.x1) - action.x1, (action.y2 || action.y1) - action.y1);
          ctx.arc(action.x1, action.y1, r, 0, Math.PI * 2);
          ctx.stroke();
        } else if (action.type === 'highlight') {
          ctx.globalAlpha = 0.35;
          ctx.lineWidth = action.lineWidth;
          ctx.beginPath();
          ctx.moveTo(action.x1, action.y1);
          ctx.lineTo(action.x2 || action.x1, action.y1);
          ctx.stroke();
        } else if (action.type === 'axis') {
          ctx.beginPath();
          ctx.moveTo(action.x1 - 100, action.y1);
          ctx.lineTo(action.x1 + 100, action.y1);
          ctx.moveTo(action.x1, action.y1 - 100);
          ctx.lineTo(action.x1, action.y1 + 100);
          ctx.stroke();
        } else if (action.type === 'curve') {
          ctx.beginPath();
          ctx.moveTo(action.x1, action.y1);
          ctx.quadraticCurveTo((action.x1 + (action.x2 || 500)) / 2, action.y1 - 60, action.x2 || 500, action.y2 || action.y1);
          ctx.stroke();
        }
        ctx.restore();
      });
    }
  };

  // Drawing event handlers for freehand student drawing
  const saveStateForUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev.slice(-15), currentState]);
    setRedoStack([]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveStateForUndo();
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 24;
    } else if (activeTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = penWidth * 4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = penWidth;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    setUndoStack(prev => prev.slice(0, -1));
    ctx.putImageData(lastState, 0, 0);
  };

  const handleClearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    saveStateForUndo();
    const rect = canvas.getBoundingClientRect();
    drawGrid(ctx, rect.width, rect.height, gridType);
  };

  const handleExportNotes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `LearnSphere-Classroom-Notes-${currentScenario.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Step controls
  const handleNextStep = () => {
    if (currentStepIndex < currentScenario.steps.length - 1) {
      const next = currentStepIndex + 1;
      setCurrentStepIndex(next);
      renderStepDrawings(next, true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prev = currentStepIndex - 1;
      setCurrentStepIndex(prev);
      renderStepDrawings(prev, true);
    }
  };

  // Auto-play lesson walkthrough
  useEffect(() => {
    let timer: any;
    if (isPlayingAuto) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < currentScenario.steps.length - 1) {
            const next = prev + 1;
            renderStepDrawings(next, true);
            return next;
          } else {
            setIsPlayingAuto(false);
            return prev;
          }
        });
      }, 5500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAuto, currentScenario]);

  // Send student chat message & trigger tutor pedagogical response
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const newMsg = { sender: 'student' as const, text: chatInput, time: 'Just now' };
    setChatMessages(prev => [...prev, newMsg]);
    const query = chatInput;
    setChatInput('');

    // Instant realistic pedagogical tutor response
    setTimeout(() => {
      let tutorReply = "Great question! Notice how we use the constraint equation to collapse two variables into one before taking the derivative.";
      if (query.toLowerCase().includes('zero') || query.toLowerCase().includes('derivative')) {
        tutorReply = "Exactly! We set the first derivative equal to 0 because horizontal tangent lines indicate where the slope is zero—meaning local peaks or valleys.";
      } else if (query.toLowerCase().includes('help') || query.toLowerCase().includes('formula')) {
        tutorReply = "Let's check the formula sheet drawer on the left! Remember for cylinders: Volume V = πr²h and Surface Area A = 2πr² + 2πrh.";
      }
      setChatMessages(prev => [
        ...prev,
        { sender: 'tutor', text: tutorReply, time: 'Just now' },
      ]);
    }, 1000);
  };

  // Built-in Mini Calculator solver
  const handleCalcClick = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === '=') {
      try {
        // Safe evaluation for basic math expressions
        const sanitized = calcInput.replace(/[^0-9+\-*/().]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`"use strict"; return (${sanitized})`)();
        setCalcResult(String(Number(res).toFixed(4)));
      } catch (err) {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in font-sans">
      <div className={`bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white transition-all duration-300 ${
        isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-7xl h-[92vh]'
      }`}>
        
        {/* ================= 1. CLASSROOM TOP NAVIGATION BAR ================= */}
        <header className="bg-[#0B132B] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0">
          
          {/* Left: Branding, Session Info & Scenario Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-amber-300 font-bold shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white tracking-tight">
                    LearnSphere Virtual Classroom
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE 1-ON-1
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>Room: <strong className="text-slate-300 font-mono">LRN-4921</strong></span>
                  <span>·</span>
                  <span className="text-amber-300 font-semibold">{currentScenario.subject}</span>
                </div>
              </div>
            </div>

            {/* Scenario Topic Picker */}
            <div className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-800">
              <span className="text-[11px] text-slate-400">Lesson Demo:</span>
              <select
                value={selectedScenarioIndex}
                onChange={(e) => {
                  setSelectedScenarioIndex(Number(e.target.value));
                  setCurrentStepIndex(0);
                  setQuizAnswered(null);
                  setShowExplanation(false);
                }}
                className="bg-slate-800 text-xs text-white border border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-medium"
              >
                {LESSON_SCENARIOS.map((sc, i) => (
                  <option key={sc.id} value={i}>
                    {sc.subject}: {sc.title.split(':')[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Audio Wave, Timer, Rec Indicator & Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Recording badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-950/60 border border-rose-800/50 text-[11px] text-rose-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>REC {formatTimer(sessionSeconds)}</span>
            </div>

            {/* Audio wave activity */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-700">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Audio HD</span>
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 bg-emerald-400 h-2 animate-pulse" />
                <span className="w-0.5 bg-emerald-400 h-3 animate-pulse" />
                <span className="w-0.5 bg-emerald-400 h-1 animate-pulse" />
                <span className="w-0.5 bg-emerald-400 h-2.5 animate-pulse" />
              </div>
            </div>

            {/* Book Free Trial Button */}
            {onBookSession && (
              <button
                onClick={onBookSession}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-slate-950" />
                <span>Book This Tutor</span>
              </button>
            )}

            {/* Fullscreen & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-rose-900/60 transition-colors"
                title="Leave Classroom"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>
        </header>

        {/* ================= 2. MAIN CLASSROOM WORKSPACE ================= */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT 9 COLS: INTERACTIVE WHITEBOARD & TEACHER DEMO STAGE */}
          <div className="flex-1 flex flex-col bg-slate-900 relative overflow-hidden">
            
            {/* Whiteboard Top Toolbar */}
            <div className="bg-slate-850 border-b border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              
              {/* Tool Selection Group */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80">
                <button
                  onClick={() => setActiveTool('pen')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTool === 'pen' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Freehand Ink Pen"
                >
                  <PenTool className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTool('highlighter')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTool === 'highlighter' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Neon Highlighter"
                >
                  <Highlighter className="w-4 h-4 text-amber-300" />
                </button>

                <button
                  onClick={() => setActiveTool('eraser')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTool === 'eraser' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Eraser"
                >
                  <Eraser className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-slate-700 mx-1" />

                {/* Color swatches */}
                {['#4338CA', '#EF4444', '#10B981', '#F59E0B', '#0F172A'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setPenColor(c)}
                    className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                      penColor === c ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-900' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}

                <div className="w-px h-4 bg-slate-700 mx-1" />

                {/* Stroke widths */}
                {[2, 4, 6].map((w) => (
                  <button
                    key={w}
                    onClick={() => setPenWidth(w)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                      penWidth === w ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {w}px
                  </button>
                ))}
              </div>

              {/* Grid Background Switcher */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold px-1">Board:</span>
                <button
                  onClick={() => setGridType('grid')}
                  className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer ${
                    gridType === 'grid' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Graph Grid
                </button>
                <button
                  onClick={() => setGridType('dots')}
                  className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer ${
                    gridType === 'dots' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dot Grid
                </button>
                <button
                  onClick={() => setGridType('chalkboard')}
                  className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer ${
                    gridType === 'chalkboard' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Chalkboard
                </button>
              </div>

              {/* Board Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  className={`p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer ${
                    isCalculatorOpen ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300' : ''
                  }`}
                  title="Scientific Calculator"
                >
                  <Calculator className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Calculator</span>
                </button>

                <button
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                  className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 disabled:opacity-40 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClearBoard}
                  className="p-1.5 rounded-lg border border-slate-700 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
                  title="Clear Whiteboard"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleExportNotes}
                  className="p-1.5 rounded-lg border border-slate-700 hover:bg-indigo-900/40 text-slate-300 hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1"
                  title="Export Whiteboard Notes as PNG"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Save Notes</span>
                </button>
              </div>

            </div>

            {/* Interactive Canvas Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center p-2 bg-slate-950">
              
              {/* Whiteboard Surface Frame */}
              <div className="w-full h-full rounded-xl overflow-hidden relative shadow-2xl border-4 border-slate-800 bg-white">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-full cursor-crosshair touch-none"
                />

                {/* Floating Calculator Overlay */}
                {isCalculatorOpen && (
                  <div className="absolute top-4 left-4 z-20 w-64 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-indigo-500/40 shadow-2xl p-3 text-white animate-fade-in font-mono">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1 font-sans">
                        <Calculator className="w-3.5 h-3.5" />
                        In-Class Calculator
                      </span>
                      <button onClick={() => setIsCalculatorOpen(false)} className="text-slate-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-xl my-2.5 border border-slate-800 text-right">
                      <div className="text-xs text-slate-400 truncate min-h-[16px]">{calcInput || '0'}</div>
                      <div className="text-lg font-bold text-emerald-400 min-h-[28px]">{calcResult || '= '}</div>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                      {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((k) => (
                        <button
                          key={k}
                          onClick={() => handleCalcClick(k)}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            k === '=' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' :
                            ['/','*','-','+'].includes(k) ? 'bg-slate-800 hover:bg-slate-700 text-amber-300' :
                            'bg-slate-800/60 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleCalcClick('C')}
                      className="w-full mt-2 py-1 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Socratic Problem Prompt Overlay Badge */}
                <div className="absolute top-3 right-3 max-w-sm bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-lg text-white pointer-events-none text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                      Problem Under Analysis
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-snug font-sans">
                    {currentScenario.problemText}
                  </p>
                </div>

                {/* Live Tutor Pointer Callout / Speech Bubble */}
                {tutorSpeechVisible && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-lg bg-[#0B132B]/95 backdrop-blur-md border border-indigo-500/50 p-3.5 rounded-2xl shadow-2xl text-white animate-fade-in font-sans">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-amber-400/60 shadow-xs relative">
                        <img 
                          src={currentScenario.tutorAvatar} 
                          alt={currentScenario.tutorName}
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            <span>{currentScenario.tutorName}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({currentScenario.tutorBio.split('·')[0]})</span>
                          </span>
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-1.5 py-0.2 rounded font-mono font-bold">
                            Step {currentStepIndex + 1} of {currentScenario.steps.length}
                          </span>
                        </div>

                        <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                          &quot;{currentScenario.steps[currentStepIndex].transcript}&quot;
                        </p>

                        <div className="mt-2 text-[10px] text-amber-400/90 font-mono italic">
                          Action: {currentScenario.steps[currentStepIndex].actionText}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Bottom Lesson Player Controls */}
            <div className="bg-[#0B132B] border-t border-slate-800 p-3 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              
              {/* Stepper Progress Dots & Play/Pause */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                    isPlayingAuto ? 'bg-amber-400 text-slate-950' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlayingAuto ? 'Pause Walkthrough' : 'Play Walkthrough'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {currentScenario.steps.map((st, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentStepIndex(i);
                        renderStepDrawings(i, true);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === currentStepIndex ? 'w-6 bg-amber-400' :
                        i < currentStepIndex ? 'w-3 bg-emerald-500' : 'w-2 bg-slate-700'
                      }`}
                      title={st.title}
                    />
                  ))}
                </div>

                <span className="text-xs text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
                  {currentScenario.steps[currentStepIndex].title}
                </span>
              </div>

              {/* Prev / Next Step Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-xs text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === currentScenario.steps.length - 1}
                  className="px-3 py-1.5 rounded-lg border border-indigo-500 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 text-xs text-white font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT 3 COLS: TEACHER & STUDENT VIDEO PREVIEW + SOCRATIC CHAT */}
          <div className="w-full lg:w-80 xl:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0">
            
            {/* Live Camera Feeds Grid */}
            <div className="p-3 bg-[#0B132B]/80 border-b border-slate-800 grid grid-cols-2 gap-2">
              
              {/* Tutor Video Box */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-indigo-500/40 shadow-sm group">
                <img
                  src={currentScenario.tutorAvatar}
                  alt={currentScenario.tutorName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Tutor</span>
                </div>

                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[11px] text-white font-semibold">
                  <span className="truncate">{currentScenario.tutorName}</span>
                  <span className="text-[10px] text-amber-300 font-mono">1080p</span>
                </div>
              </div>

              {/* Student Video Box */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-slate-700 shadow-sm flex items-center justify-center">
                {isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-indigo-950 flex flex-col items-center justify-center text-slate-300">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                      J
                    </div>
                    <span className="text-[10px] mt-1 font-medium">Jason (Student)</span>
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs flex flex-col items-center">
                    <VideoOff className="w-5 h-5 mb-1 text-slate-600" />
                    <span>Camera Off</span>
                  </div>
                )}

                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px] text-white">
                  <span>You</span>
                  <div className="flex items-center gap-1">
                    {isHandRaised && <Hand className="w-3 h-3 text-amber-400" />}
                    {isMicOn ? <Mic className="w-3 h-3 text-emerald-400" /> : <MicOff className="w-3 h-3 text-rose-400" />}
                  </div>
                </div>
              </div>

            </div>

            {/* AV Quick Controls */}
            <div className="px-3 py-2 bg-slate-850 border-b border-slate-800 flex items-center justify-center gap-2">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isMicOn ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-950/60 border-rose-800 text-rose-300'
                }`}
              >
                {isMicOn ? <Mic className="w-3.5 h-3.5 text-emerald-400" /> : <MicOff className="w-3.5 h-3.5 text-rose-400" />}
                <span className="text-[11px]">{isMicOn ? 'Mute' : 'Unmute'}</span>
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isVideoOn ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-950/60 border-rose-800 text-rose-300'
                }`}
              >
                {isVideoOn ? <Video className="w-3.5 h-3.5 text-emerald-400" /> : <VideoOff className="w-3.5 h-3.5 text-rose-400" />}
                <span className="text-[11px]">{isVideoOn ? 'Stop Cam' : 'Start Cam'}</span>
              </button>

              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isHandRaised ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Raise Hand to Ask Question"
              >
                <Hand className="w-3.5 h-3.5" />
                <span className="text-[11px]">{isHandRaised ? 'Raised' : 'Raise Hand'}</span>
              </button>
            </div>

            {/* Socratic Interactive Checkpoint Quiz */}
            <div className="p-3 bg-slate-950/60 border-b border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-amber-400" />
                  Socratic Checkpoint
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Test Comprehension</span>
              </div>

              <p className="text-xs font-semibold text-slate-100">
                {currentScenario.quickQuestion.question}
              </p>

              <div className="space-y-1.5 pt-1">
                {currentScenario.quickQuestion.options.map((opt, oIdx) => {
                  const isSelected = quizAnswered === oIdx;
                  const isCorrect = oIdx === currentScenario.quickQuestion.correctIndex;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setQuizAnswered(oIdx);
                        setShowExplanation(true);
                      }}
                      className={`w-full p-2 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                        quizAnswered === null 
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' :
                        isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold' :
                        isSelected
                          ? 'bg-rose-950/70 border-rose-500 text-rose-300' :
                          'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="truncate">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[11px] text-emerald-300 animate-fade-in leading-relaxed">
                  <strong>Tutor Feedback: </strong>
                  {currentScenario.quickQuestion.explanation}
                </div>
              )}
            </div>

            {/* Live Pedagogical Chat Stream */}
            <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
              
              <div className="p-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  Lesson Chat & Notes
                </span>
                <span className="text-[10px] text-slate-500">Live Transcript</span>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                      <span>{msg.sender === 'student' ? 'You' : currentScenario.tutorName}</span>
                      <span>·</span>
                      <span>{msg.time}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                      msg.sender === 'student'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Box */}
              <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Ask tutor a question or type answer..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendChat}
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors cursor-pointer"
                  title="Send Question"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
