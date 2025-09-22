import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Location } from '../data/locations';

const { width, height } = Dimensions.get('window');

interface OfflineMapProps {
  locations: Location[];
  onLocationPress: (location: Location) => void;
  userLocation?: { latitude: number; longitude: number };
}

const OfflineMap: React.FC<OfflineMapProps> = ({
  locations,
  onLocationPress,
  userLocation,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapScale, setMapScale] = useState(1);
  const [showRoute, setShowRoute] = useState(false);
  const [routeTo, setRouteTo] = useState<Location | null>(null);

  // Map bounds (simplified coordinates for Downham Market area)
  const mapBounds = {
    minLat: 52.57,
    maxLat: 52.61,
    minLng: 0.38,
    maxLng: 0.50,
  };

  const mapWidth = width - 40;
  const mapHeight = height * 0.6;

  const convertToMapCoordinates = (location: Location) => {
    const x = ((location.coordinates.longitude - mapBounds.minLng) / 
              (mapBounds.maxLng - mapBounds.minLng)) * mapWidth;
    const y = ((mapBounds.maxLat - location.coordinates.latitude) / 
              (mapBounds.maxLat - mapBounds.minLat)) * mapHeight;
    return { x, y };
  };

  const calculateDistance = (loc1: Location, loc2: Location) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (loc2.coordinates.latitude - loc1.coordinates.latitude) * Math.PI / 180;
    const dLng = (loc2.coordinates.longitude - loc1.coordinates.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.coordinates.latitude * Math.PI / 180) * 
              Math.cos(loc2.coordinates.latitude * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getNearestLocations = (currentLocation: Location, limit: number = 3) => {
    return locations
      .filter(loc => loc.id !== currentLocation.id)
      .map(loc => ({
        ...loc,
        distance: calculateDistance(currentLocation, loc),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    onLocationPress(location);
  };

  const handleNavigateTo = (location: Location) => {
    setRouteTo(location);
    setShowRoute(true);
    Alert.alert(
      'Navigation',
      `Direction to ${location.title}. Distance: ${calculateDistance(selectedLocation!, location).toFixed(1)} km`,
      [{ text: 'OK' }]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'peace': return '🌿';
      case 'history': return '🏰';
      case 'liveliness': return '🎉';
      default: return '📍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'peace': return '#4CAF50';
      case 'history': return '#FF9800';
      case 'liveliness': return '#E91E63';
      default: return '#2196F3';
    }
  };

  return (
    <View style={styles.container}>
      {/* Map Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Offline Map</Text>
        <View style={styles.mapControls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setMapScale(Math.max(0.5, mapScale - 0.2))}
          >
            <Icon name="zoom-out" size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.scaleText}>{Math.round(mapScale * 100)}%</Text>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setMapScale(Math.min(2, mapScale + 0.2))}
          >
            <Icon name="zoom-in" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <View style={[styles.map, { width: mapWidth * mapScale, height: mapHeight * mapScale }]}>
          {/* Map Background */}
          <View style={styles.mapBackground}>
            <Text style={styles.mapTitle}>Downham Market</Text>
            <Text style={styles.mapSubtitle}>Offline Map</Text>
          </View>

          {/* Location Markers */}
          {locations.map((location) => {
            const coords = convertToMapCoordinates(location);
            return (
              <TouchableOpacity
                key={location.id}
                style={[
                  styles.locationMarker,
                  {
                    left: coords.x - 15,
                    top: coords.y - 15,
                    backgroundColor: getCategoryColor(location.category),
                  },
                  selectedLocation?.id === location.id && styles.selectedMarker,
                ]}
                onPress={() => handleLocationSelect(location)}
              >
                <Text style={styles.markerIcon}>
                  {getCategoryIcon(location.category)}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* User Location */}
          {userLocation && (
            <View style={[styles.userMarker, {
              left: ((userLocation.longitude - mapBounds.minLng) / 
                    (mapBounds.maxLng - mapBounds.minLng)) * mapWidth - 10,
              top: ((mapBounds.maxLat - userLocation.latitude) / 
                   (mapBounds.maxLat - mapBounds.minLat)) * mapHeight - 10,
            }]}>
              <Icon name="my-location" size={20} color="#ff4444" />
            </View>
          )}

          {/* Route Line */}
          {showRoute && selectedLocation && routeTo && (
            <View style={styles.routeContainer}>
              <View style={[styles.routeLine, {
                left: convertToMapCoordinates(selectedLocation).x,
                top: convertToMapCoordinates(selectedLocation).y,
                width: Math.abs(convertToMapCoordinates(routeTo).x - convertToMapCoordinates(selectedLocation).x),
                height: 2,
                transform: [{
                  rotate: `${Math.atan2(
                    convertToMapCoordinates(routeTo).y - convertToMapCoordinates(selectedLocation).y,
                    convertToMapCoordinates(routeTo).x - convertToMapCoordinates(selectedLocation).x
                  ) * 180 / Math.PI}deg`
                }],
              }]} />
            </View>
          )}
        </View>
      </View>

      {/* Location Info */}
      {selectedLocation && (
        <View style={styles.locationInfo}>
          <View style={styles.locationHeader}>
            <Text style={styles.locationTitle}>{selectedLocation.title}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedLocation(null)}
            >
              <Icon name="close" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.locationDescription}>{selectedLocation.description}</Text>
          
          <View style={styles.locationMeta}>
            <View style={styles.metaItem}>
              <Icon name="place" size={16} color="#cccccc" />
              <Text style={styles.metaText}>
                {selectedLocation.coordinates.latitude.toFixed(4)}, {selectedLocation.coordinates.longitude.toFixed(4)}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="category" size={16} color={getCategoryColor(selectedLocation.category)} />
              <Text style={[styles.metaText, { color: getCategoryColor(selectedLocation.category) }]}>
                {selectedLocation.category === 'peace' ? 'Peaceful place' :
                 selectedLocation.category === 'history' ? 'Historical place' :
                 'Lively place'}
              </Text>
            </View>
          </View>

          <View style={styles.locationActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleNavigateTo(selectedLocation)}
            >
              <Icon name="directions" size={16} color="#ffffff" />
              <Text style={styles.actionButtonText}>Navigation</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => onLocationPress(selectedLocation)}
            >
              <Icon name="info" size={16} color="#ff4444" />
              <Text style={[styles.actionButtonText, { color: '#ff4444' }]}>Details</Text>
            </TouchableOpacity>
          </View>

          {/* Nearest Locations */}
          <View style={styles.nearestLocations}>
            <Text style={styles.nearestTitle}>Nearest places:</Text>
            {getNearestLocations(selectedLocation).map((location) => (
              <TouchableOpacity
                key={location.id}
                style={styles.nearestItem}
                onPress={() => handleLocationSelect(location)}
              >
                <Text style={styles.nearestIcon}>{getCategoryIcon(location.category)}</Text>
                <View style={styles.nearestInfo}>
                  <Text style={styles.nearestName}>{location.title}</Text>
                  <Text style={styles.nearestDistance}>{location.distance.toFixed(1)} km</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#cccccc" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Map Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend:</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <Text style={styles.legendIcon}>🌿</Text>
            <Text style={styles.legendText}>Peaceful places</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={styles.legendIcon}>🏰</Text>
            <Text style={styles.legendText}>Historical places</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={styles.legendIcon}>🎉</Text>
            <Text style={styles.legendText}>Lively places</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mapControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  controlButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  map: {
    position: 'relative',
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#333333',
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  mapSubtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  locationMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedMarker: {
    borderWidth: 3,
    borderColor: '#FFD700',
    transform: [{ scale: 1.2 }],
  },
  markerIcon: {
    fontSize: 16,
  },
  userMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  routeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  routeLine: {
    position: 'absolute',
    backgroundColor: '#ff4444',
    height: 2,
  },
  locationInfo: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: height * 0.4,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  locationMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#cccccc',
    fontSize: 12,
    marginLeft: 5,
  },
  locationActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    borderRadius: 20,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  nearestLocations: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 15,
  },
  nearestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  nearestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  nearestIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  nearestInfo: {
    flex: 1,
  },
  nearestName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  nearestDistance: {
    color: '#cccccc',
    fontSize: 12,
  },
  legend: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  legendText: {
    color: '#cccccc',
    fontSize: 12,
  },
});

export default OfflineMap;
