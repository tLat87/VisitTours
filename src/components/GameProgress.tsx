import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { UserProgress } from '../types/game';

const { width } = Dimensions.get('window');

interface GameProgressProps {
  userProgress: UserProgress;
  onPress: () => void;
}

const GameProgress: React.FC<GameProgressProps> = ({ userProgress, onPress }) => {
  const progressToNextLevel = (userProgress.totalPoints % 100) / 100;
  const pointsToNextLevel = 100 - (userProgress.totalPoints % 100);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelEmoji}>🏆</Text>
          <Text style={styles.levelText}>Level {userProgress.level}</Text>
        </View>
        <Text style={styles.chevronEmoji}>▶️</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressToNextLevel * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {pointsToNextLevel} points to next level
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>⭐</Text>
          <Text style={styles.statText}>{userProgress.totalPoints}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>📍</Text>
          <Text style={styles.statText}>{userProgress.visitedLocations.size}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>🧠</Text>
          <Text style={styles.statText}>{userProgress.completedQuizzes.size}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statText}>{userProgress.streak}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff4444',
    borderRadius: 4,
  },
  progressText: {
    color: '#cccccc',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  levelEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  chevronEmoji: {
    fontSize: 16,
  },
  statEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
});

export default GameProgress;
