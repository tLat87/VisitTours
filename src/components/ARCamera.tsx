import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

interface Treasure {
  id: string;
  name: string;
  description: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  location: {
    x: number;
    y: number;
  };
  found: boolean;
}

interface ARCameraProps {
  visible: boolean;
  locationId: string;
  onClose: () => void;
  onTreasureFound?: (treasure: Treasure) => void;
}

const ARCamera: React.FC<ARCameraProps> = ({
  visible,
  locationId,
  onClose,
  onTreasureFound,
}) => {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [scanning, setScanning] = useState(false);
  const [foundTreasure, setFoundTreasure] = useState<Treasure | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [showFoundModal, setShowFoundModal] = useState(false);

  const scanAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (visible) {
      generateTreasures();
      startScanning();
    } else {
      setTreasures([]);
      setFoundTreasure(null);
      setShowFoundModal(false);
      setScanProgress(0);
    }
  }, [visible, locationId]);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setScanning(false);
            checkForTreasures();
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [scanning]);

  const generateTreasures = () => {
    // Generate random treasures for the location
    const possibleTreasures: Omit<Treasure, 'id' | 'found' | 'location'>[] = [
      {
        name: 'Ancient Coin',
        description: 'Victorian coin found in this historical place',
        points: 10,
        rarity: 'common',
      },
      {
        name: 'Carrstone Fragment',
        description: 'Piece of the famous "Gingerbread Town" stone',
        points: 25,
        rarity: 'rare',
      },
      {
        name: 'Rare Butterfly',
        description: 'Beautiful butterfly living in the fen lands',
        points: 50,
        rarity: 'epic',
      },
      {
        name: 'Golden Artifact',
        description: 'Ancient artifact hidden for centuries',
        points: 100,
        rarity: 'legendary',
      },
    ];

    const generatedTreasures: Treasure[] = possibleTreasures.map((treasure, index) => ({
      ...treasure,
      id: `treasure_${locationId}_${index}`,
      found: false,
      location: {
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 200) + 100,
      },
    }));

    setTreasures(generatedTreasures);
  };

  const startScanning = () => {
    setScanning(true);
    setScanProgress(0);
    
    // Start scanning animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const checkForTreasures = () => {
    // Simulate finding a random treasure
    const availableTreasures = treasures.filter(t => !t.found);
    if (availableTreasures.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableTreasures.length);
      const treasure = availableTreasures[randomIndex];
      
      setFoundTreasure(treasure);
      setShowFoundModal(true);
      
      // Mark as found
      setTreasures(prev => prev.map(t => 
        t.id === treasure.id ? { ...t, found: true } : t
      ));
    } else {
      Alert.alert(
        'Scanning Complete',
        'No more treasures in this location. Try another place!',
        [{ text: 'OK', onPress: onClose }]
      );
    }
  };

  const handleTreasureFound = () => {
    if (foundTreasure) {
      onTreasureFound?.(foundTreasure);
      setShowFoundModal(false);
      setFoundTreasure(null);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#cccccc';
      case 'rare': return '#4CAF50';
      case 'epic': return '#9C27B0';
      case 'legendary': return '#FFD700';
      default: return '#cccccc';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return 'Common';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* AR Camera View */}
        <View style={styles.cameraView}>
          {/* Scanning Overlay */}
          {scanning && (
            <View style={styles.scanningOverlay}>
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, height - 100],
                        }),
                      },
                    ],
                  },
                ]}
              />
              
              <View style={styles.scanProgress}>
                <Text style={styles.scanText}>Scanning...</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${scanProgress}%` }]} 
                  />
                </View>
                <Text style={styles.progressText}>{scanProgress}%</Text>
              </View>
            </View>
          )}

          {/* Treasure Markers */}
          {treasures.map((treasure) => (
            <Animated.View
              key={treasure.id}
              style={[
                styles.treasureMarker,
                {
                  left: treasure.location.x,
                  top: treasure.location.y,
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <Icon 
                name="star" 
                size={30} 
                color={getRarityColor(treasure.rarity)} 
              />
              {!treasure.found && (
                <View style={styles.treasureGlow} />
              )}
            </Animated.View>
          ))}

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              {scanning ? 'Point camera at location and wait...' : 'Press "Scan" to search for treasures'}
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.scanButton, scanning && styles.scanButtonActive]}
            onPress={startScanning}
            disabled={scanning}
          >
            <Icon name="camera-alt" size={24} color="#ffffff" />
            <Text style={styles.scanButtonText}>
              {scanning ? 'Scanning...' : 'Scan'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Found Treasure Modal */}
        <Modal
          visible={showFoundModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowFoundModal(false)}
        >
          <View style={styles.treasureModalOverlay}>
            <View style={styles.treasureModal}>
              <View style={styles.treasureHeader}>
                <Icon 
                  name="star" 
                  size={40} 
                  color={getRarityColor(foundTreasure?.rarity || 'common')} 
                />
                <Text style={styles.treasureTitle}>Treasure Found!</Text>
              </View>

              {foundTreasure && (
                <>
                  <Text style={styles.treasureName}>{foundTreasure.name}</Text>
                  <Text style={styles.treasureDescription}>{foundTreasure.description}</Text>
                  
                  <View style={styles.treasureStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Rarity:</Text>
                      <Text style={[styles.statValue, { color: getRarityColor(foundTreasure.rarity) }]}>
                        {getRarityText(foundTreasure.rarity)}
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Points:</Text>
                      <Text style={styles.statValue}>+{foundTreasure.points}</Text>
                    </View>
                  </View>

                  <View style={styles.treasureActions}>
                    <TouchableOpacity 
                      style={styles.collectButton}
                      onPress={handleTreasureFound}
                    >
                      <Icon name="check" size={20} color="#ffffff" />
                      <Text style={styles.collectButtonText}>Collect</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraView: {
    flex: 1,
    position: 'relative',
  },
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ff00',
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  scanProgress: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
  },
  scanText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff00',
    borderRadius: 2,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  treasureMarker: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treasureGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    top: -5,
    left: -5,
  },
  instructions: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
  },
  instructionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scanButtonActive: {
    backgroundColor: '#666666',
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  treasureModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  treasureModal: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    alignItems: 'center',
    maxWidth: width - 40,
  },
  treasureHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  treasureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  treasureName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  treasureDescription: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  treasureStats: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  treasureActions: {
    width: '100%',
  },
  collectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 25,
  },
  collectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ARCamera;
