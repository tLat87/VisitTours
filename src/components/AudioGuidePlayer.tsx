import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AudioGuide } from '../types/audio';

const { width } = Dimensions.get('window');

interface AudioGuidePlayerProps {
  visible: boolean;
  audioGuide: AudioGuide | null;
  onClose: () => void;
  onComplete: (guideId: string) => void;
}

const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  visible,
  audioGuide,
  onClose,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (audioGuide) {
      setDuration(audioGuide.duration);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [audioGuide]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause audio
      setIsPlaying(false);
    } else {
      // Play audio
      setIsPlaying(true);
      // Simulate audio playback
      simulatePlayback();
    }
  };

  const simulatePlayback = () => {
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          setIsPlaying(false);
          clearInterval(interval);
          onComplete(audioGuide!.id);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleSeek = (position: number) => {
    setCurrentTime(position);
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const handleComplete = () => {
    Alert.alert(
      'Audio Guide Completed!',
      `You received ${audioGuide?.points} points for listening to the audio guide.`,
      [
        {
          text: 'OK',
          onPress: () => {
            onComplete(audioGuide!.id);
            onClose();
          },
        },
      ]
    );
  };

  if (!audioGuide) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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
            <View style={styles.headerLeft}>
              <Icon name="headphones" size={24} color="#ff4444" />
              <Text style={styles.title}>Audio Guide</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.guideInfo}>
              <Text style={styles.guideTitle}>{audioGuide.title}</Text>
              <Text style={styles.guideDescription}>{audioGuide.description}</Text>
              
              <View style={styles.guideMeta}>
                <View style={styles.metaItem}>
                  <Icon name="person" size={16} color="#cccccc" />
                  <Text style={styles.metaText}>{audioGuide.narrator}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="schedule" size={16} color="#cccccc" />
                  <Text style={styles.metaText}>{formatTime(audioGuide.duration)}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.metaText}>+{audioGuide.points} points</Text>
                </View>
              </View>
            </View>

            <View style={styles.playerContainer}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${progress}%` }]} 
                  />
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                  <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
              </View>

              <View style={styles.controlsContainer}>
                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={handleSpeedChange}
                >
                  <Text style={styles.speedText}>{playbackSpeed}x</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={handlePlayPause}
                >
                  <Icon 
                    name={isPlaying ? 'pause' : 'play-arrow'} 
                    size={32} 
                    color="#ffffff" 
                  />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={() => setShowTranscript(!showTranscript)}
                >
                  <Icon 
                    name={showTranscript ? 'visibility-off' : 'visibility'} 
                    size={20} 
                    color="#ffffff" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {showTranscript && (
              <View style={styles.transcriptContainer}>
                <Text style={styles.transcriptTitle}>Transcript</Text>
                <ScrollView style={styles.transcriptScroll}>
                  <Text style={styles.transcriptText}>{audioGuide.transcript}</Text>
                </ScrollView>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.completeButton}
              onPress={handleComplete}
              disabled={currentTime < duration}
            >
              <Icon name="check-circle" size={20} color="#ffffff" />
              <Text style={styles.completeButtonText}>
                {currentTime >= duration ? 'Complete' : 'Listen first'}
              </Text>
            </TouchableOpacity>
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
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
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
  guideInfo: {
    marginBottom: 20,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  guideDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  guideMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
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
  playerContainer: {
    backgroundColor: '#333333',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff4444',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#cccccc',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcriptContainer: {
    backgroundColor: '#333333',
    borderRadius: 15,
    padding: 15,
  },
  transcriptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  transcriptScroll: {
    maxHeight: 200,
  },
  transcriptText: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 25,
    opacity: 1,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AudioGuidePlayer;
