import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Location } from '../data/locations';
import { useGame } from '../contexts/GameContext';

const { width } = Dimensions.get('window');

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  locations: Location[];
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface AIRecommendationsProps {
  locations: Location[];
  onLocationPress: (location: Location) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  locations, 
  onLocationPress 
}) => {
  const { state } = useGame();
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [state.userProgress, locations]);

  const generateRecommendations = () => {
    // Simulate AI analysis based on user behavior
    const userVisited = state.userProgress.visitedLocations;
    const userCompletedPhotoChallenges = state.userProgress.completedPhotoChallenges;
    const userPoints = state.userProgress.totalPoints;
    
    const newRecommendations: AIRecommendation[] = [];

    // Analyze user preferences based on visited locations
    const visitedCategories = Array.from(userVisited).map(locationId => {
      const location = locations.find(l => l.id === locationId);
      return location?.category;
    }).filter(Boolean);

    const categoryCounts = visitedCategories.reduce((acc, category) => {
      acc[category!] = (acc[category!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Find most/least visited categories
    const mostVisitedCategory = Object.keys(categoryCounts).reduce((a, b) => 
      categoryCounts[a] > categoryCounts[b] ? a : b, 'peace'
    );
    const leastVisitedCategory = Object.keys(categoryCounts).reduce((a, b) => 
      categoryCounts[a] < categoryCounts[b] ? a : b, 'history'
    );

    // Generate recommendations based on patterns
    if (userVisited.size === 0) {
      // New user - recommend popular places
      newRecommendations.push({
        id: 'new_user',
        title: 'Welcome!',
        description: 'Start with the most popular places in Downham Market',
        reason: 'You are a new user',
        locations: locations.slice(0, 3),
        priority: 'high',
        category: 'popular'
      });
    } else if (userVisited.size < 3) {
      // Few visits - recommend based on category
      const categoryLocations = locations.filter(l => l.category === mostVisitedCategory);
      newRecommendations.push({
        id: 'category_based',
        title: `Continue exploring ${mostVisitedCategory === 'peace' ? 'peaceful places' : 
                mostVisitedCategory === 'history' ? 'historical places' : 'lively places'}`,
        description: `You like ${mostVisitedCategory === 'peace' ? 'peaceful' : 
                    mostVisitedCategory === 'history' ? 'historical' : 'lively'} places`,
        reason: `You visited ${categoryCounts[mostVisitedCategory]} ${mostVisitedCategory} places`,
        locations: categoryLocations.slice(0, 3),
        priority: 'high',
        category: mostVisitedCategory
      });
    } else {
      // Experienced user - recommend unexplored areas
      const unexploredLocations = locations.filter(l => !userVisited.has(l.id));
      if (unexploredLocations.length > 0) {
        newRecommendations.push({
          id: 'unexplored',
          title: 'Discover new places!',
          description: 'You have more places to explore',
          reason: `You visited ${userVisited.size} out of ${locations.length} places`,
          locations: unexploredLocations.slice(0, 3),
          priority: 'medium',
          category: 'unexplored'
        });
      }

      // Recommend based on photo challenge performance
      if (userCompletedPhotoChallenges.size > 0) {
        newRecommendations.push({
          id: 'photo_enthusiast',
          title: 'Photo Enthusiast',
          description: 'Continue sharing amazing photos from historical places',
          reason: `You completed ${userCompletedPhotoChallenges.size} photo challenges`,
          locations: locations.filter(l => l.category === 'history').slice(0, 2),
          priority: 'medium',
          category: 'photo'
        });
      }

      // Recommend based on points
      if (userPoints > 50) {
        newRecommendations.push({
          id: 'high_achiever',
          title: 'High Achiever!',
          description: 'You are an active explorer - try photo challenges',
          reason: `You have ${userPoints} points`,
          locations: locations.slice(0, 2),
          priority: 'low',
          category: 'achievement'
        });
      }
    }

    setRecommendations(newRecommendations);
    setLoading(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ff9800';
      case 'low': return '#4CAF50';
      default: return '#cccccc';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'popular': return '⭐';
      case 'peace': return '🌿';
      case 'history': return '🏰';
      case 'liveliness': return '🎉';
      case 'unexplored': return '🔍';
      case 'photo': return '📸';
      case 'achievement': return '🏆';
      default: return '💡';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>🤖</Text>
          <Text style={styles.loadingText}>Analyzing your preferences...</Text>
        </View>
      </View>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🤖</Text>
        <Text style={styles.title}>AI Recommendations</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recommendations.map((recommendation) => (
          <View key={recommendation.id} style={styles.recommendationCard}>
            <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.categoryEmoji}>
                {getCategoryIcon(recommendation.category)}
              </Text>
              <Text style={styles.cardTitle}>{recommendation.title}</Text>
            </View>
              <View style={[
                styles.priorityBadge, 
                { backgroundColor: getPriorityColor(recommendation.priority) }
              ]}>
                <Text style={styles.priorityText}>
                  {recommendation.priority === 'high' ? 'High' : 
                   recommendation.priority === 'medium' ? 'Medium' : 'Low'}
                </Text>
              </View>
            </View>

            <Text style={styles.description}>{recommendation.description}</Text>
            <Text style={styles.reason}>{recommendation.reason}</Text>

            <View style={styles.locationsContainer}>
              {recommendation.locations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.locationItem}
                  onPress={() => onLocationPress(location)}
                >
                  <Text style={styles.locationTitle}>{location.title}</Text>
                  <Text style={styles.locationCategory}>
                    {location.category === 'peace' ? '🌿 Peaceful' :
                     location.category === 'history' ? '🏰 Historical' :
                     '🎉 Lively'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: '#cccccc',
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContent: {
    paddingRight: 20,
  },
  recommendationCard: {
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: width * 0.7,
    minHeight: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  reason: {
    color: '#999999',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  locationsContainer: {
    flex: 1,
  },
  locationItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  locationTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationCategory: {
    color: '#cccccc',
    fontSize: 12,
  },
  loadingEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  headerEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
});

export default AIRecommendations;
