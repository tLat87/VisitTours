import { Achievement, QuizQuestion, PhotoChallenge } from '../types/game';

export const achievements: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Steps',
    description: 'Visit your first place',
    icon: '👣',
    points: 10,
    unlocked: false,
    requirement: {
      type: 'visit_locations',
      value: 1
    }
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit 5 places',
    icon: '🗺️',
    points: 50,
    unlocked: false,
    requirement: {
      type: 'visit_locations',
      value: 5
    }
  },
  {
    id: 'historian',
    title: 'Historian',
    description: 'Visit all historical places',
    icon: '🏰',
    points: 100,
    unlocked: false,
    requirement: {
      type: 'visit_category',
      value: 3,
      category: 'history'
    }
  },
  {
    id: 'nature_lover',
    title: 'Nature Lover',
    description: 'Visit all peaceful places',
    icon: '🌿',
    points: 100,
    unlocked: false,
    requirement: {
      type: 'visit_category',
      value: 3,
      category: 'peace'
    }
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Visit all lively places',
    icon: '🎉',
    points: 100,
    unlocked: false,
    requirement: {
      type: 'visit_category',
      value: 3,
      category: 'liveliness'
    }
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Complete 3 quizzes',
    icon: '🧠',
    points: 75,
    unlocked: false,
    requirement: {
      type: 'complete_quiz',
      value: 3
    }
  },
  {
    id: 'photographer',
    title: 'Photographer',
    description: 'Complete 5 photo challenges',
    icon: '📸',
    points: 80,
    unlocked: false,
    requirement: {
      type: 'take_photos',
      value: 5
    }
  },
  {
    id: 'influencer',
    title: 'Influencer',
    description: 'Share 10 places',
    icon: '📱',
    points: 60,
    unlocked: false,
    requirement: {
      type: 'share_locations',
      value: 10
    }
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    locationId: '4',
    question: 'In what year was the Discover Downham Heritage Centre built?',
    options: ['1887', '1923', '1956', '2001'],
    correctAnswer: 0,
    points: 10,
    explanation: 'The Heritage Centre was created in the building of a former fire station, built in 1887.'
  },
  {
    id: 'q2',
    locationId: '5',
    question: 'What material was used to build the Town Hall?',
    options: ['Brick', 'Carrstone', 'Wood', 'Marble'],
    correctAnswer: 1,
    points: 10,
    explanation: 'Town Hall is built from local carrstone, which gave the town the nickname "Gingerbread Town".'
  },
  {
    id: 'q3',
    locationId: '7',
    question: 'On which days does the market operate in Downham Market?',
    options: ['Monday and Wednesday', 'Tuesday and Thursday', 'Friday and Saturday', 'Sunday'],
    correctAnswer: 2,
    points: 10,
    explanation: 'The market operates every Friday and Saturday, creating a lively atmosphere in the town center.'
  },
  {
    id: 'q4',
    locationId: '1',
    question: 'Which river flows along Fen Rivers Way?',
    options: ['Thames', 'Ouse', 'Cam', 'Wensum'],
    correctAnswer: 1,
    points: 10,
    explanation: 'Fen Rivers Way runs along the River Ouse, offering scenic views of the English countryside.'
  },
  {
    id: 'q5',
    locationId: '3',
    question: 'What can you see in Boughton Fen?',
    options: ['Only trees', 'Rare species of birds and butterflies', 'Mountain landscapes', 'Beaches'],
    correctAnswer: 1,
    points: 10,
    explanation: 'Boughton Fen is a nature reserve with unique fen landscapes, home to rare species of birds and butterflies.'
  }
];

export const photoChallenges: PhotoChallenge[] = [
  {
    id: 'pc1',
    locationId: '1',
    title: 'River Panorama',
    description: 'Take a photo of the beautiful view of the River Ouse',
    points: 15,
    completed: false
  },
  {
    id: 'pc2',
    locationId: '4',
    title: 'Historical Moment',
    description: 'Take a photo of the Heritage Centre building from an interesting angle',
    points: 15,
    completed: false
  },
  {
    id: 'pc3',
    locationId: '7',
    title: 'Market Life',
    description: 'Take a photo of the lively market in action',
    points: 20,
    completed: false
  },
  {
    id: 'pc4',
    locationId: '5',
    title: 'Architectural Beauty',
    description: 'Take a photo of the carrstone details of Town Hall',
    points: 15,
    completed: false
  },
  {
    id: 'pc5',
    locationId: '3',
    title: 'Natural Harmony',
    description: 'Take a photo of the unique fen landscape',
    points: 20,
    completed: false
  }
];
