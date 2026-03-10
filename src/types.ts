export type Industry = 'HVAC' | 'Plumbing' | 'Roofing' | 'Electrical';

export interface AppState {
  industry: Industry;
  truckCount: number;
  currentStep: number; // 0: Hero, 1: Calibration, 2: Questions..., 7: Processing, 8: Results
  answers: Record<number, number>; // questionIndex -> score (0-100)
  calculatedScore: number;
  isSnapshotOpen: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: number; // impact on score
  }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How often do customer calls go to voicemail?",
    options: [
      { label: "Never - We catch every call", value: 100 },
      { label: "Rarely - Only after hours", value: 80 },
      { label: "Sometimes - During peak times", value: 50 },
      { label: "Often - We struggle to keep up", value: 20 }
    ]
  },
  {
    id: 2,
    text: "How long does it take to schedule a new job?",
    options: [
      { label: "Instantly - Real-time scheduling", value: 100 },
      { label: "Minutes - Quick manual entry", value: 70 },
      { label: "Hours - Requires callbacks", value: 40 },
      { label: "Days - Backlog is messy", value: 10 }
    ]
  },
  {
    id: 3,
    text: "Do technicians need to call the office for job details?",
    options: [
      { label: "Never - Everything is in the app", value: 100 },
      { label: "Rarely - Only for major changes", value: 75 },
      { label: "Often - App is missing info", value: 30 },
      { label: "Always - We use paper/phone calls", value: 0 }
    ]
  },
  {
    id: 4,
    text: "Do customer requests ever get lost between phone, text, and email?",
    options: [
      { label: "Never - Centralized inbox", value: 100 },
      { label: "Rarely - We have a system", value: 70 },
      { label: "Occasionally - It happens", value: 40 },
      { label: "Frequently - It's a major pain", value: 10 }
    ]
  },
  {
    id: 5,
    text: "Are invoices usually sent the same day the job finishes?",
    options: [
      { label: "Yes - Automated on completion", value: 100 },
      { label: "Mostly - By end of day", value: 80 },
      { label: "Within a few days", value: 50 },
      { label: "Weekly or longer", value: 20 }
    ]
  }
];

export const GROWTH_LEVELS = [
  { level: 1, title: "Manual Shop", description: "Relies on paper and memory." },
  { level: 2, title: "Basic Software", description: "Using off-the-shelf tools." },
  { level: 3, title: "Connected Systems", description: "Data flows between tools." },
  { level: 4, title: "Automated Workflows", description: "Systems handle the routine." },
  { level: 5, title: "Automated Service Machine", description: "Peak operational efficiency." }
];
