import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { QuizQuestion } from '../types/game';

const { width } = Dimensions.get('window');

interface QuizModalProps {
  visible: boolean;
  question: QuizQuestion | null;
  onClose: () => void;
  onComplete: (quizId: string, score: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({
  visible,
  question,
  onClose,
  onComplete,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const slideAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible && question) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
      
      // Reset state
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setScore(0);
    } else {
      slideAnim.setValue(0);
    }
  }, [visible, question]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question?.correctAnswer;
    setIsCorrect(correct);
    setScore(correct ? question?.points || 0 : 0);
    setShowResult(true);
  };

  const handleNext = () => {
    if (question) {
      onComplete(question.id, score);
    }
    onClose();
  };

  if (!question) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
        <View style={styles.header}>
          <Text style={styles.title}>Quiz</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeEmoji}>❌</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.content}>
            <Text style={styles.question}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => {
                let buttonStyle = styles.optionButton;
                let textStyle = styles.optionText;
                
                if (showResult) {
                  if (index === question.correctAnswer) {
                    buttonStyle = [styles.optionButton, styles.correctOption];
                    textStyle = [styles.optionText, styles.correctText];
                  } else if (index === selectedAnswer && !isCorrect) {
                    buttonStyle = [styles.optionButton, styles.wrongOption];
                    textStyle = [styles.optionText, styles.wrongText];
                  }
                } else if (index === selectedAnswer) {
                  buttonStyle = [styles.optionButton, styles.selectedOption];
                  textStyle = [styles.optionText, styles.selectedText];
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={buttonStyle}
                    onPress={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <Text style={textStyle}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {showResult && (
              <View style={styles.resultContainer}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultEmoji}>
                  {isCorrect ? '✅' : '❌'}
                </Text>
                <Text style={[
                  styles.resultText,
                  { color: isCorrect ? '#4CAF50' : '#F44336' }
                ]}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </Text>
              </View>
                
                <Text style={styles.explanation}>{question.explanation}</Text>
                
                <View style={styles.scoreContainer}>
                  <Text style={styles.starEmoji}>⭐</Text>
                  <Text style={styles.scoreText}>+{score} points</Text>
                </View>
                
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.nextButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get('window');

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
    maxHeight: height * 0.8,
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
  question: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#ff4444',
    backgroundColor: '#3a1a1a',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#1a3a1a',
  },
  wrongOption: {
    borderColor: '#F44336',
    backgroundColor: '#3a1a1a',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  selectedText: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  correctText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  wrongText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  explanation: {
    color: '#cccccc',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  scoreText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  nextButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeEmoji: {
    fontSize: 16,
  },
  resultEmoji: {
    fontSize: 30,
    marginRight: 10,
  },
  starEmoji: {
    fontSize: 20,
    marginRight: 5,
  },
});

export default QuizModal;
