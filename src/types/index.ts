export type TabType = 'home' | 'lessons' | 'lab' | 'quiz' | 'achievements' | 'teacher-guide';

export type TopicId = 'cell_organism' | 'virus' | 'fungi' | 'biodiversity';

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  imagePlaceholder?: string;
  illustrationSvgType?: 'plant_cell' | 'animal_cell' | 'virus_structure' | 'fungi_types' | 'food_web';
  didYouKnow?: string;
  interactiveChallenge?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Lesson {
  id: TopicId;
  title: string;
  subtitle: string;
  badge: string;
  grade: string;
  duration: string;
  color: string;
  iconName: string;
  overview: string;
  sections: LessonSection[];
  localConnection?: string; // Hà Tiên context
  summaryTakeaway: string[];
}

export interface LabSimulationConfig {
  id: string;
  topicId: TopicId;
  title: string;
  subtitle: string;
  objective: string;
  toolsNeeded: string[];
  predictionQuestion: string;
  predictionOptions: string[];
}

export interface QuizQuestion {
  id: number;
  topicId: TopicId | 'all';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
  id: string;
  date: string;
  topicId: string;
  topicName: string;
  studentName: string;
  studentClass: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeAwarded?: string;
  timeSpentSeconds: number;
}

export interface LabObservationLog {
  id: string;
  timestamp: string;
  labTitle: string;
  studentPrediction: string;
  conditionsApplied: Record<string, any>;
  conclusion: string;
  teacherVerified?: boolean;
}
