import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../contexts/GameContext';
import { useResponsive } from '../utils/responsive';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { state } = useGame();
  const responsive = useResponsive();
  const { userProgress } = state;

  const unlockedAchievements = userProgress.achievements.filter(a => a.unlocked);
  const lockedAchievements = userProgress.achievements.filter(a => !a.unlocked);

  const renderAchievement = (achievement: any, isUnlocked: boolean) => (
    <View
      key={achievement.id}
      style={[
        styles.achievementCard,
        !isUnlocked && styles.lockedAchievement,
      ]}
    >
      <View style={styles.achievementIcon}>
        <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
      </View>
      <View style={styles.achievementInfo}>
        <Text style={[
          styles.achievementTitle,
          !isUnlocked && styles.lockedText,
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.achievementDescription,
          !isUnlocked && styles.lockedText,
        ]}>
          {achievement.description}
        </Text>
        <View style={styles.achievementPoints}>
          <Text style={styles.starEmoji}>⭐</Text>
          <Text style={styles.pointsText}>+{achievement.points} points</Text>
        </View>
      </View>
      {isUnlocked && (
        <View style={styles.unlockedBadge}>
          <Text style={styles.checkEmoji}>✅</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>🎮</Text>
          </View>
          <Text style={[styles.playerName, { fontSize: responsive.fontSize.xlarge }]}>
            Player
          </Text>
          <Text style={[styles.playerLevel, { fontSize: responsive.fontSize.large }]}>
            Level {userProgress.level}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={[styles.statValue, { fontSize: responsive.fontSize.xlarge }]}>
              {userProgress.totalPoints}
            </Text>
            <Text style={[styles.statLabel, { fontSize: responsive.fontSize.small }]}>
              Points
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📍</Text>
            <Text style={[styles.statValue, { fontSize: responsive.fontSize.xlarge }]}>
              {userProgress.visitedLocations.size}
            </Text>
            <Text style={[styles.statLabel, { fontSize: responsive.fontSize.small }]}>
              Places
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📸</Text>
            <Text style={[styles.statValue, { fontSize: responsive.fontSize.xlarge }]}>
              {userProgress.completedPhotoChallenges.size}
            </Text>
            <Text style={[styles.statLabel, { fontSize: responsive.fontSize.small }]}>
              Photo Challenges
            </Text>
          </View>
        </View>

        {/* Progress to next level */}
        <View style={styles.progressSection}>
          <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.large }]}>
            Progress to Next Level
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((userProgress.totalPoints % 100) / 100) * 100}%` },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { fontSize: responsive.fontSize.small }]}>
            {100 - (userProgress.totalPoints % 100)} points to level {userProgress.level + 1}
          </Text>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.large }]}>
            Achievements ({unlockedAchievements.length}/{userProgress.achievements.length})
          </Text>
          
          {unlockedAchievements.length > 0 && (
            <>
              <Text style={[styles.subsectionTitle, { fontSize: responsive.fontSize.medium }]}>
                Unlocked
              </Text>
              {unlockedAchievements.map(achievement => renderAchievement(achievement, true))}
            </>
          )}

          {lockedAchievements.length > 0 && (
            <>
              <Text style={[styles.subsectionTitle, { fontSize: responsive.fontSize.medium }]}>
                Locked
              </Text>
              {lockedAchievements.map(achievement => renderAchievement(achievement, false))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#ff4444',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarEmoji: {
    fontSize: 50,
  },
  playerName: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playerLevel: {
    color: '#cccccc',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statValue: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statLabel: {
    color: '#cccccc',
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff4444',
    borderRadius: 5,
  },
  progressText: {
    color: '#cccccc',
    textAlign: 'center',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  subsectionTitle: {
    color: '#ff4444',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementEmoji: {
    fontSize: 25,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  achievementDescription: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 8,
  },
  achievementPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  lockedText: {
    color: '#666666',
  },
  unlockedBadge: {
    width: 30,
    height: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  starEmoji: {
    fontSize: 16,
    marginRight: 5,
  },
  checkEmoji: {
    fontSize: 20,
  },
});

export default ProfileScreen;
