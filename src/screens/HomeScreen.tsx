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

const { width } = Dimensions.get('window');

type Category = 'peace' | 'history' | 'liveliness' | 'all';

const HomeScreen = () => {
  const responsive = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [likedLocations, setLikedLocations] = useState<Set<string>>(new Set());
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    { key: 'peace', label: 'Peace', icon: 'eco' },
    { key: 'history', label: 'History', icon: 'business' },
  
    // { key: 'all', label: 'All', icon: 'apps' },
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
        url: '', // Можно добавить URL если есть
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
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
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/img/ico.png')} style={styles.logo} />
        </View>

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
              {category.key === 'peace' ? '🌿' : 
               category.key === 'history' ? '🏰' : 
               category.key === 'liveliness' ? '🎉' : '🌟'}
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
          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={responsive.isTablet ? styles.tabletContentContainer : styles.phoneContentContainer}
          >
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
});

export default HomeScreen;
