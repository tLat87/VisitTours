import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { locations, Location } from '../data/locations';
import LocationDetailModal from '../components/LocationDetailModal';
import { useResponsive } from '../utils/responsive';
import { useGame } from '../contexts/GameContext';
import GameProgress from '../components/GameProgress';
import AchievementModal from '../components/AchievementModal';
import QuizModal from '../components/QuizModal';
import PhotoChallengeModal from '../components/PhotoChallengeModal';
import WeatherWidget from '../components/WeatherWidget';
import AIRecommendations from '../components/AIRecommendations';
import ReviewModal from '../components/ReviewModal';
import RatingDisplay from '../components/RatingDisplay';
import AudioGuidePlayer from '../components/AudioGuidePlayer';
import { audioGuides } from '../data/audioGuides';

const { width } = Dimensions.get('window');

type Category = 'peace' | 'history' | 'liveliness' | 'all';

const HomeScreen = () => {
  const responsive = useResponsive();
  const { state, visitLocation, startQuiz, completeQuiz, completePhotoChallenge, shareLocation, hideAchievement } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [likedLocations, setLikedLocations] = useState<Set<string>>(new Set());
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPhotoChallenge, setShowPhotoChallenge] = useState(false);
  const [selectedPhotoChallenge, setSelectedPhotoChallenge] = useState<any>(null);
  const [showReview, setShowReview] = useState(false);
  const [showAudioGuide, setShowAudioGuide] = useState(false);
  const [selectedAudioGuide, setSelectedAudioGuide] = useState<any>(null);
  const [showRating, setShowRating] = useState(false);

  const categories = [
    { key: 'peace', label: 'Peace', icon: '🌿' },
    { key: 'history', label: 'History', icon: '🏰' },
  
    // { key: 'all', label: 'All', icon: '🌟' },
  ];

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(location => location.category === selectedCategory);

  const toggleLike = (locationId: string) => {
    setLikedLocations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(locationId)) {
        newSet.delete(locationId);
      } else {
        newSet.add(locationId);
      }
      return newSet;
    });
  };

  const handleLocationPress = (location: Location) => {
    setSelectedLocation(location);
    setModalVisible(true);
    // Mark location as visited
    visitLocation(location.id);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedLocation(null);
  };

  const handleShare = async (location: Location) => {
    try {
      const Share = require('react-native-share');
      const result = await Share.default.open({
        title: 'Share Location',
        message: `Check out this amazing place: ${location.title}\n\n${location.description}\n\nCoordinates: ${location.coordinates.latitude.toFixed(4)}, ${location.coordinates.longitude.toFixed(4)}`,
        url: '', // Can add URL if available
      });
      // Award points for sharing
      shareLocation(location.id);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleStartQuiz = (locationId: string) => {
    startQuiz(locationId);
    setShowQuiz(true);
  };

  const handleCompleteQuiz = (quizId: string, score: number) => {
    completeQuiz(quizId, score);
    setShowQuiz(false);
  };

  const handleStartPhotoChallenge = (challenge: any) => {
    setSelectedPhotoChallenge(challenge);
    setShowPhotoChallenge(true);
  };

  const handleCompletePhotoChallenge = (challengeId: string, photoUri: string) => {
    completePhotoChallenge(challengeId, photoUri);
    setShowPhotoChallenge(false);
    setSelectedPhotoChallenge(null);
  };

  const handleStartAudioGuide = (locationId: string) => {
    const guide = audioGuides.find(ag => ag.locationId === locationId);
    if (guide) {
      setSelectedAudioGuide(guide);
      setShowAudioGuide(true);
    }
  };

  const handleCompleteAudioGuide = (guideId: string) => {
    // Award points for completing audio guide
    // This would be implemented in the game context
    setShowAudioGuide(false);
    setSelectedAudioGuide(null);
  };

  const handleWriteReview = () => {
    setShowReview(true);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    // Submit review logic would go here
    console.log('Review submitted:', { rating, comment });
    setShowReview(false);
  };

  const handleWeatherRecommendation = (recommendation: string) => {
    // Handle weather recommendation
    console.log('Weather recommendation:', recommendation);
  };

  const renderLocationCard = (location: Location) => (
    <TouchableOpacity 
      key={location.id} 
      style={[styles.locationCard, { width: responsive.cardWidth, maxWidth: responsive.cardMaxWidth }]}
      onPress={() => handleLocationPress(location)}
    >
      <View style={[styles.imagePlaceholder, { height: responsive.imageHeight }]}>
        <Image 
          source={location.image} 
          style={styles.placeholderImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.locationTitle, { fontSize: responsive.fontSize.large }]}>{location.title}</Text>
        <View style={styles.coordinatesContainer}>
          <Text style={styles.emoji}>📍</Text>
          <Text style={[styles.coordinates, { fontSize: responsive.fontSize.small }]}>
            {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
          </Text>
        </View>
        <Text style={[styles.locationDescription, { fontSize: responsive.fontSize.medium }]}>{location.description}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity style={[styles.moreButton, { height: responsive.buttonHeight }]} onPress={() => handleLocationPress(location)}>
            <Text style={[styles.moreButtonText, { fontSize: responsive.fontSize.small }]}>More</Text>
          </TouchableOpacity>
          
          {/* Game Actions */}
          <View style={styles.gameActions}>
            <TouchableOpacity 
              style={styles.gameButton} 
              onPress={() => handleStartQuiz(location.id)}
            >
              <Text style={styles.gameButtonEmoji}>🧠</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.gameButton} 
              onPress={() => {
                const challenge = state.photoChallenges.find(pc => pc.locationId === location.id);
                if (challenge) handleStartPhotoChallenge(challenge);
              }}
            >
              <Text style={styles.gameButtonEmoji}>📸</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.gameButton} 
              onPress={() => handleStartAudioGuide(location.id)}
            >
              <Text style={styles.gameButtonEmoji}>🎧</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.gameButton} 
              onPress={handleWriteReview}
            >
              <Text style={styles.gameButtonEmoji}>⭐</Text>
            </TouchableOpacity>
            {state.userProgress.visitedLocations.has(location.id) && (
              <View style={styles.visitedBadge}>
                <Text style={styles.visitedEmoji}>✅</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
    source={require('../assets/img/fb379a3b00e9da2a210056ff53d6130c4e9fc572.png')} 
    style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay for better content readability */}
      <View style={styles.overlay} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Image source={require('../assets/img/ico.png')} style={styles.logo} />
          </View>

          {/* Game Progress */}
          <GameProgress 
            userProgress={state.userProgress} 
            onPress={() => {/* Navigate to profile */}} 
          />

          {/* Weather Widget */}
          <WeatherWidget onRecommendationPress={handleWeatherRecommendation} />

          {/* AI Recommendations */}
          <AIRecommendations 
            locations={locations} 
            onLocationPress={handleLocationPress} 
          />

          {/* Category Filters */}
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.key as Category)}
              >
                <Text style={styles.categoryEmoji}>
                  {category.icon}
                </Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.categoryTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {filteredLocations.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={[styles.emptyCard, { maxWidth: responsive.cardMaxWidth }]}>
                  <View style={styles.avatarContainer}>
                    <View style={[styles.avatar, { width: responsive.buttonHeight * 2, height: responsive.buttonHeight * 2 }]}>
                      <Text style={[styles.avatarEmoji, { fontSize: responsive.fontSize.xlarge }]}>👋</Text>
                    </View>
                  </View>
                  <Text style={[styles.emptyText, { fontSize: responsive.fontSize.medium }]}>
                    To get started, choose the category you are interested in.
                  </Text>
                </View>
              </View>
            ) : (
              filteredLocations.map(renderLocationCard)
            )}
          </View>
        </ScrollView>

      {/* Location Detail Modal */}
      <LocationDetailModal
        visible={modalVisible}
        location={selectedLocation}
        onClose={handleCloseModal}
        onLike={toggleLike}
        onShare={handleShare}
        isLiked={selectedLocation ? likedLocations.has(selectedLocation.id) : false}
      />

      {/* Achievement Modal */}
      <AchievementModal
        visible={!!state.showAchievement}
        achievement={state.showAchievement}
        onClose={hideAchievement}
      />

      {/* Quiz Modal */}
      <QuizModal
        visible={showQuiz}
        question={state.currentQuiz}
        onClose={() => setShowQuiz(false)}
        onComplete={handleCompleteQuiz}
      />

      {/* Photo Challenge Modal */}
      <PhotoChallengeModal
        visible={showPhotoChallenge}
        challenge={selectedPhotoChallenge}
        onClose={() => {
          setShowPhotoChallenge(false);
          setSelectedPhotoChallenge(null);
        }}
        onComplete={handleCompletePhotoChallenge}
      />

      {/* Review Modal */}
      <ReviewModal
        visible={showReview}
        location={selectedLocation}
        onClose={() => setShowReview(false)}
        onSubmit={handleSubmitReview}
      />

      {/* Audio Guide Player */}
      <AudioGuidePlayer
        visible={showAudioGuide}
        audioGuide={selectedAudioGuide}
        onClose={() => {
          setShowAudioGuide(false);
          setSelectedAudioGuide(null);
        }}
        onComplete={handleCompleteAudioGuide}
      />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#ff4444',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    gap: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#ff4444',
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  locationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  coordinates: {
    color: '#cccccc',
    fontSize: 14,
  },
  locationDescription: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardActions: {
    alignItems: 'center',
  },
  moreButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333333',
  },
  moreButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    width: width - 40,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#ff4444',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  emoji: {
    fontSize: 16,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  tabletContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  phoneContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gameActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
    flexWrap: 'wrap',
  },
  gameButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitedBadge: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#1a3a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  gameButtonEmoji: {
    fontSize: 16,
  },
  visitedEmoji: {
    fontSize: 16,
  },
});

export default HomeScreen;
