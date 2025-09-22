import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, Achievement, QuizQuestion, PhotoChallenge } from '../types/game';
import { achievements, quizQuestions, photoChallenges } from '../data/gameData';

interface GameState {
  userProgress: UserProgress;
  currentQuiz: QuizQuestion | null;
  photoChallenges: PhotoChallenge[];
  showAchievement: Achievement | null;
}

type GameAction =
  | { type: 'VISIT_LOCATION'; locationId: string }
  | { type: 'COMPLETE_QUIZ'; quizId: string; score: number }
  | { type: 'COMPLETE_PHOTO_CHALLENGE'; challengeId: string; photoUri: string }
  | { type: 'SHARE_LOCATION'; locationId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievement: Achievement }
  | { type: 'SET_CURRENT_QUIZ'; quiz: QuizQuestion | null }
  | { type: 'LOAD_GAME_DATA'; data: GameState }
  | { type: 'HIDE_ACHIEVEMENT' };

const initialState: GameState = {
  userProgress: {
    totalPoints: 0,
    level: 1,
    visitedLocations: new Set(),
    completedQuizzes: new Set(),
    achievements: achievements.map(a => ({ ...a, unlocked: false })),
    streak: 0,
  },
  currentQuiz: null,
  photoChallenges: photoChallenges.map(pc => ({ ...pc, completed: false })),
  showAchievement: null,
};

function calculateLevel(points: number): number {
  return Math.floor(points / 100) + 1;
}

function checkAchievements(userProgress: UserProgress): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  userProgress.achievements.forEach(achievement => {
    if (achievement.unlocked) return;
    
    let shouldUnlock = false;
    
    switch (achievement.requirement.type) {
      case 'visit_locations':
        shouldUnlock = userProgress.visitedLocations.size >= achievement.requirement.value;
        break;
      case 'visit_category':
        const categoryVisits = Array.from(userProgress.visitedLocations).filter(locationId => {
          // This would need to be implemented based on your location data
          return true; // Placeholder
        }).length;
        shouldUnlock = categoryVisits >= achievement.requirement.value;
        break;
      case 'complete_quiz':
        shouldUnlock = userProgress.completedQuizzes.size >= achievement.requirement.value;
        break;
      case 'take_photos':
        const completedPhotos = photoChallenges.filter(pc => pc.completed).length;
        shouldUnlock = completedPhotos >= achievement.requirement.value;
        break;
      case 'share_locations':
        // This would need to be tracked separately
        shouldUnlock = false; // Placeholder
        break;
    }
    
    if (shouldUnlock) {
      const unlockedAchievement = {
        ...achievement,
        unlocked: true,
        unlockedAt: new Date()
      };
      newAchievements.push(unlockedAchievement);
    }
  });
  
  return newAchievements;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'VISIT_LOCATION': {
      const newVisitedLocations = new Set(state.userProgress.visitedLocations);
      newVisitedLocations.add(action.locationId);
      
      const newUserProgress = {
        ...state.userProgress,
        visitedLocations: newVisitedLocations,
        totalPoints: state.userProgress.totalPoints + 5, // 5 points per visit
        level: calculateLevel(state.userProgress.totalPoints + 5),
        lastVisitDate: new Date(),
      };
      
      const newAchievements = checkAchievements(newUserProgress);
      const updatedAchievements = state.userProgress.achievements.map(achievement => {
        const newAchievement = newAchievements.find(a => a.id === achievement.id);
        return newAchievement || achievement;
      });
      
      return {
        ...state,
        userProgress: {
          ...newUserProgress,
          achievements: updatedAchievements,
        },
        showAchievement: newAchievements.length > 0 ? newAchievements[0] : null,
      };
    }
    
    case 'COMPLETE_QUIZ': {
      const newCompletedQuizzes = new Set(state.userProgress.completedQuizzes);
      newCompletedQuizzes.add(action.quizId);
      
      const newUserProgress = {
        ...state.userProgress,
        completedQuizzes: newCompletedQuizzes,
        totalPoints: state.userProgress.totalPoints + action.score,
        level: calculateLevel(state.userProgress.totalPoints + action.score),
      };
      
      return {
        ...state,
        userProgress: newUserProgress,
        currentQuiz: null,
      };
    }
    
    case 'COMPLETE_PHOTO_CHALLENGE': {
      const updatedChallenges = state.photoChallenges.map(challenge =>
        challenge.id === action.challengeId
          ? { ...challenge, completed: true, photoUri: action.photoUri }
          : challenge
      );
      
      const challenge = state.photoChallenges.find(c => c.id === action.challengeId);
      const points = challenge ? challenge.points : 0;
      
      const newUserProgress = {
        ...state.userProgress,
        totalPoints: state.userProgress.totalPoints + points,
        level: calculateLevel(state.userProgress.totalPoints + points),
      };
      
      return {
        ...state,
        photoChallenges: updatedChallenges,
        userProgress: newUserProgress,
      };
    }
    
    case 'SHARE_LOCATION': {
      const newUserProgress = {
        ...state.userProgress,
        totalPoints: state.userProgress.totalPoints + 2, // 2 points per share
        level: calculateLevel(state.userProgress.totalPoints + 2),
      };
      
      return {
        ...state,
        userProgress: newUserProgress,
      };
    }
    
    case 'SET_CURRENT_QUIZ':
      return {
        ...state,
        currentQuiz: action.quiz,
      };
    
    case 'LOAD_GAME_DATA':
      return action.data;
    
    case 'HIDE_ACHIEVEMENT':
      return {
        ...state,
        showAchievement: null,
      };
    
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  visitLocation: (locationId: string) => void;
  startQuiz: (locationId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  completePhotoChallenge: (challengeId: string, photoUri: string) => void;
  shareLocation: (locationId: string) => void;
  hideAchievement: () => void;
} | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    loadGameData();
  }, []);

  useEffect(() => {
    saveGameData();
  }, [state]);

  const loadGameData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('gameData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert Sets back from arrays
        parsedData.userProgress.visitedLocations = new Set(parsedData.userProgress.visitedLocations);
        parsedData.userProgress.completedQuizzes = new Set(parsedData.userProgress.completedQuizzes);
        dispatch({ type: 'LOAD_GAME_DATA', data: parsedData });
      }
    } catch (error) {
      console.log('Error loading game data:', error);
    }
  };

  const saveGameData = async () => {
    try {
      const dataToSave = {
        ...state,
        userProgress: {
          ...state.userProgress,
          visitedLocations: Array.from(state.userProgress.visitedLocations),
          completedQuizzes: Array.from(state.userProgress.completedQuizzes),
        },
      };
      await AsyncStorage.setItem('gameData', JSON.stringify(dataToSave));
    } catch (error) {
      console.log('Error saving game data:', error);
    }
  };

  const visitLocation = (locationId: string) => {
    dispatch({ type: 'VISIT_LOCATION', locationId });
  };

  const startQuiz = (locationId: string) => {
    const quiz = quizQuestions.find(q => q.locationId === locationId);
    if (quiz) {
      dispatch({ type: 'SET_CURRENT_QUIZ', quiz });
    }
  };

  const completeQuiz = (quizId: string, score: number) => {
    dispatch({ type: 'COMPLETE_QUIZ', quizId, score });
  };

  const completePhotoChallenge = (challengeId: string, photoUri: string) => {
    dispatch({ type: 'COMPLETE_PHOTO_CHALLENGE', challengeId, photoUri });
  };

  const shareLocation = (locationId: string) => {
    dispatch({ type: 'SHARE_LOCATION', locationId });
  };

  const hideAchievement = () => {
    dispatch({ type: 'HIDE_ACHIEVEMENT' });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        visitLocation,
        startQuiz,
        completeQuiz,
        completePhotoChallenge,
        shareLocation,
        hideAchievement,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
