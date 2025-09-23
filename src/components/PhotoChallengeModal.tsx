import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { PhotoChallenge } from '../types/game';

const { width } = Dimensions.get('window');

interface PhotoChallengeModalProps {
  visible: boolean;
  challenge: PhotoChallenge | null;
  onClose: () => void;
  onComplete: (challengeId: string, photoUri: string) => void;
}

const PhotoChallengeModal: React.FC<PhotoChallengeModalProps> = ({
  visible,
  challenge,
  onClose,
  onComplete,
}) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    Alert.alert(
      'Camera',
      'Camera function will be added in the next version.',
      [
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  };

  const handleCompleteChallenge = () => {
    if (photoUri && challenge) {
      onComplete(challenge.id, photoUri);
      onClose();
    }
  };

  if (!challenge) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Photo Challenge</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeEmoji}>❌</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.content}>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>{challenge.description}</Text>
              
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>📸 Photo Challenge Instructions:</Text>
                <Text style={styles.instructionText}>
                  • Take a photo at this location
                </Text>
                <Text style={styles.instructionText}>
                  • Post it on your social media
                </Text>
                <Text style={styles.instructionText}>
                  • Tag the location and use hashtags
                </Text>
                <Text style={styles.instructionText}>
                  • Share your experience with others
                </Text>
              </View>
              
              <View style={styles.pointsContainer}>
                <Text style={styles.starEmoji}>⭐</Text>
                <Text style={styles.pointsText}>+{challenge.points} points</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => {
                  onComplete(challenge.id, 'social_media_post');
                  onClose();
                }}
              >
                <Text style={styles.completeButtonText}>Mark as Completed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    margin: 20,
    maxWidth: width - 40,
    maxHeight: '80%',
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
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  challengeInfo: {
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 10,
  },
  challengeDescription: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 22,
    marginBottom: 15,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  pointsText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  photoContainer: {
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: '#333333',
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff4444',
    borderStyle: 'dashed',
  },
  cameraButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  photoPreview: {
    position: 'relative',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoSuccessText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  actions: {
    alignItems: 'center',
  },
  takePhotoButton: {
    backgroundColor: '#ff4444',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  takePhotoButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeEmoji: {
    fontSize: 16,
  },
  starEmoji: {
    fontSize: 20,
    marginRight: 5,
  },
  cameraEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  checkEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  cameraButtonEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  instructionsContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  instructionsTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instructionText: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default PhotoChallengeModal;
