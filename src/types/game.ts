export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  requirement: {
    type: 'visit_locations' | 'visit_category' | 'complete_quiz' | 'take_photos' | 'share_locations';
    value: number;
    category?: string;
  };
}

export interface UserProgress {
  totalPoints: number;
  level: number;
  visitedLocations: Set<string>;
  completedQuizzes: Set<string>;
  achievements: Achievement[];
  streak: number;
  lastVisitDate?: Date;
}

export interface QuizQuestion {
  id: string;
  locationId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  explanation: string;
}

export interface PhotoChallenge {
  id: string;
  locationId: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  photoUri?: string;
}
