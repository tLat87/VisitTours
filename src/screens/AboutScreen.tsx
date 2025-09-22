import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '../hooks/useOnboarding';
import { useResponsive } from '../utils/responsive';

const { width, height } = Dimensions.get('window');

const AboutScreen = () => {
  const responsive = useResponsive();
  const { resetOnboarding } = useOnboarding();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out Visit Norfolk Ladbrokes Tours - Discover Norfolk like never before!',
        title: 'Visit Norfolk Ladbrokes Tours',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share at this time');
    }
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Onboarding',
      'This will show the onboarding screens again on next app launch. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', onPress: resetOnboarding },
      ]
    );
  };

  return (
    <ImageBackground 
      source={require('../assets/img/fb379a3b00e9da2a210056ff53d6130c4e9fc572.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay for better content readability */}
      <View style={styles.overlay} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Main Card */}
        <View style={[styles.card, { 
          width: responsive.isTablet ? responsive.cardWidth : width * 0.9,
          maxWidth: responsive.cardMaxWidth,
          maxHeight: responsive.isTablet ? height * 0.8 : height * 0.85
        }]}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => {}}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          {/* Image */}
          <View style={[styles.imageContainer, { height: responsive.imageHeight }]}>
            <ImageBackground 
              source={require('../assets/img/fb379a3b00e9da2a210056ff53d6130c4e9fc572.png')} // Temporary placeholder - replace with Clock Tower image
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={[styles.title, { fontSize: responsive.fontSize.xlarge }]}>Clock tower</Text>
            
            <Text style={[styles.description, { fontSize: responsive.fontSize.medium }]}>
              In the center of the city stands a unique clock tower, built in 1878. It was a gift to the city from a local businessman and is still the main landmark of Downham. Tourists and residents often arrange meetings here. The tower looks especially charming in the evening, when it is illuminated by street lamps. It is an ideal place for photos and the first point of the route, which is worth visiting.
            </Text>

            <TouchableOpacity style={[styles.shareButton, { height: responsive.buttonHeight }]} onPress={handleShare}>
              <Text style={[styles.shareButtonText, { fontSize: responsive.fontSize.medium }]}>Share</Text>
            </TouchableOpacity>

            {/* Hidden Reset Button for development */}
            {/* <TouchableOpacity style={styles.resetButton} onPress={handleResetOnboarding}>
              <Text style={styles.resetButtonText}>Reset Onboarding</Text>
            </TouchableOpacity> */}
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
    // backgroundColor: 'rgba(139, 69, 19, 0.7)', // Dark brown overlay like in the photo
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: 'rgba(0, 0, 0, 0.95)', // Dark brown background like in photo
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backArrow: {
    fontSize: 24,
    color: '#333333',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'left',
  },
  shareButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shareButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
    opacity: 0.7, // Make it less prominent for development
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AboutScreen;
