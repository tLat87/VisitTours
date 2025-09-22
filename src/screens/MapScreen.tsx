import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { locations, Location } from '../data/locations';
import { useResponsive } from '../utils/responsive';
import ARCamera from '../components/ARCamera';

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
  const responsive = useResponsive();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>();

  // Debug: log locations
  console.log('MapScreen locations:', locations.length);

  const handleMarkerPress = (location: Location) => {
    setSelectedLocation(location);
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setSelectedLocation(null);
  };

  const handleShare = async (location: Location) => {
    try {
      const Share = require('react-native-share');
      const result = await Share.default.open({
        title: 'Share Location',
        message: `Check out this amazing place: ${location.title}\n\n${location.fullDescription}\n\nCoordinates: ${location.coordinates.latitude.toFixed(4)}, ${location.coordinates.longitude.toFixed(4)}`,
        url: '', // Can add URL if available
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };


  const handleLocationPress = (location: Location) => {
    setSelectedLocation(location);
    setShowCard(true);
  };

  const renderLocationCard = () => {
    if (!selectedLocation || !showCard) return null;

    return (
      <View style={[styles.locationCard, { 
        width: responsive.isTablet ? responsive.cardWidth : width * 0.9,
        maxWidth: responsive.cardMaxWidth,
        maxHeight: responsive.isTablet ? height * 0.6 : height * 0.7
      }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleCloseCard}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Image */}
        <View style={[styles.cardImageContainer, { height: responsive.imageHeight }]}>
          <View style={styles.cardImagePlaceholder}>
            <Image 
              source={selectedLocation.image} 
              style={styles.placeholderImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { fontSize: responsive.fontSize.xlarge }]}>{selectedLocation.title}</Text>
          
          <Text style={[styles.cardDescription, { fontSize: responsive.fontSize.medium }]}>{selectedLocation.fullDescription}</Text>

          <TouchableOpacity style={[styles.shareButton, { height: responsive.buttonHeight }]} onPress={() => handleShare(selectedLocation)}>
            <Text style={[styles.shareButtonText, { fontSize: responsive.fontSize.medium }]}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/img/ico.png')} style={styles.logo} />
          
          {/* AR Button */}
          {/* <TouchableOpacity
            style={styles.arButton}
            onPress={() => setShowAR(true)}
          >
            <Text style={styles.arEmoji}>📸</Text>
          </TouchableOpacity> */}
        </View>


      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 52.5765,
            longitude: 0.3920,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          mapType="standard"
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              coordinate={location.coordinates}
              onPress={() => handleMarkerPress(location)}
              title={location.title}
              description={location.description}
            >
              <View style={styles.marker}>
                <Text style={styles.markerEmoji}>
                  {location.category === 'peace' ? '🌿' : 
                   location.category === 'history' ? '🏰' : '🎉'}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Location Card Overlay */}
      {renderLocationCard()}

      {/* AR Camera */}
      <ARCamera
        visible={showAR}
        locationId={selectedLocation?.id || '1'}
        onClose={() => setShowAR(false)}
        onTreasureFound={() => {}}
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arEmoji: {
    fontSize: 20,
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
  mapContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    minHeight: 400,
  },
  map: {
    width: '100%',
    height: '100%',
    minHeight: 400,
  },
  marker: {
    width: 40,
    height: 40,
    backgroundColor: '#ff4444',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  markerEmoji: {
    fontSize: 20,
  },
  locationCard: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(37, 37, 37, 0.95)', // Dark brown background like AboutScreen
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff',
    maxHeight: height * 0.7,
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
  cardImageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'left',
  },
  cardDescription: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30,
    textAlign: 'left',
  },
  backEmoji: {
    fontSize: 24,
    color: '#333333',
  },
  placeholderImage: {
    width: 400,
    height: 200,
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
});

export default MapScreen;
