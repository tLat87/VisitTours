import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  backgroundImage: any;
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: 'Discover Norfolk',
    description: 'I will guide you through the streets of Downham Market, an old market town with its own charm. Ready to go?',
    icon: 'explore',
    color: '#ff4444',
    backgroundImage: require('../assets/img/ihi/image3.png'),
  },
  {
    id: 2,
    title: 'Find Your Perfect Spot',
    description: 'I will suggest places to suit your mood: 🌿 for peace, 🏰 for history or 🎉 for vivid impressions.',
    icon: 'filter-list',
    color: '#ff4444',
    backgroundImage: require('../assets/img/ihi/image4.png'),
  },
  {
    id: 3,
    title: 'Plan Your Journey',
    description: 'I will help you create your own personal route through Downham Market.',
    icon: 'bookmark',
    color: '#ff4444',
    backgroundImage: require('../assets/img/ihi/image5.png'),
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <ImageBackground 
      source={currentSlide.backgroundImage} 
      style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay for better text readability */}
      {/* <View style={styles.overlay} /> */}
      
      <SafeAreaView style={styles.safeArea}>
  

        {/* Content */}
        <View style={styles.content}>
        
          {/* Title */}
          {/* <Text style={styles.title}>{currentSlide.title}</Text> */}

          {/* Description */}
          <Text style={styles.description}>{currentSlide.description}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentIndex && styles.progressDotActive,
                  { backgroundColor: index === currentIndex ? currentSlide.color : '#ffffff' }
                ]}
              />
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {currentIndex < onboardingData.length - 1 ? (
              <>
                <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
                  <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.nextButton, { backgroundColor: currentSlide.color }]} onPress={nextSlide}>
                  <Text style={styles.nextButtonText}>Next</Text>
                  {/* <Icon name="arrow-forward" size={20} color="#ffffff" /> */}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={[styles.getStartedButton, { backgroundColor: currentSlide.color }]} onPress={onComplete}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
                {/* <Icon name="arrow-forward" size={20} color="#ffffff" /> */}
              </TouchableOpacity>
            )}
          </View>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#ff4444',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    padding: 40,
    fontWeight: 'bold',
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 12,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressDotActive: {
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  skipButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    gap: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    gap: 8,
    flex: 1,
  },
  getStartedButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
