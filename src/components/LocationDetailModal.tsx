import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Location } from '../data/locations';

const { width, height } = Dimensions.get('window');

interface LocationDetailModalProps {
  visible: boolean;
  location: Location | null;
  onClose: () => void;
  onLike?: (locationId: string) => void;
  onShare?: (location: Location) => void;
  isLiked?: boolean;
}

const LocationDetailModal: React.FC<LocationDetailModalProps> = ({
  visible,
  location,
  onClose,
  onLike,
  onShare,
  isLiked = false,
}) => {
  if (!location) return null;

  const handleLike = () => {
    if (onLike) {
      onLike(location.id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(location);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Main Card */}
        <View style={styles.card}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          {/* Image */}
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Image 
                source={location.image} 
                style={styles.placeholderImage}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{location.title}</Text>
            
            <Text style={styles.description}>{location.fullDescription}</Text>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)', // Dark brown overlay like AboutScreen
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: 'rgba(83, 9, 9, 0.95)', // Dark brown background like AboutScreen
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
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
  placeholderImage: {
    width: 400,
    height: 200,
  },
});

export default LocationDetailModal;
