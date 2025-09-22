import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherWidgetProps {
  onRecommendationPress: (recommendation: string) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onRecommendationPress }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather API call
    setTimeout(() => {
      const mockWeather: WeatherData = {
        temperature: 18,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: 'partly-cloudy-day',
      };
      setWeather(mockWeather);
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'partly cloudy':
      case 'partly-cloudy-day':
        return '⛅';
      case 'cloudy':
      case 'overcast':
        return '☁️';
      case 'rainy':
      case 'rain':
        return '🌧️';
      case 'stormy':
      case 'thunderstorm':
        return '⛈️';
      case 'snowy':
      case 'snow':
        return '❄️';
      case 'foggy':
      case 'fog':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  const getWeatherRecommendation = (weather: WeatherData) => {
    const temp = weather.temperature;
    const condition = weather.condition.toLowerCase();
    
    if (temp > 20 && (condition.includes('sunny') || condition.includes('clear'))) {
      return {
        type: 'perfect',
        message: 'Perfect weather for walking!',
        recommendation: 'We recommend visiting open places and parks',
        places: ['Fen Rivers Way', 'Boughton Fen', 'Downham Market Town Square']
      };
    } else if (condition.includes('rain') || condition.includes('storm')) {
      return {
        type: 'indoor',
        message: 'Better stay indoors',
        recommendation: 'Visit museums and indoor attractions',
        places: ['Discover Downham Heritage Centre', 'The Whalebone pub', 'Norfolk Cheese Co']
      };
    } else if (temp < 10) {
      return {
        type: 'cold',
        message: 'Cool weather',
        recommendation: 'Dress warmly and visit cozy places',
        places: ['The Whalebone pub', 'Norfolk Cheese Co', 'Downham Market Town Hall']
      };
    } else {
      return {
        type: 'good',
        message: 'Good weather for walking',
        recommendation: 'You can visit any places',
        places: ['All places available']
      };
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>☁️</Text>
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      </View>
    );
  }

  if (!weather) return null;

  const recommendation = getWeatherRecommendation(weather);

  return (
    <View style={styles.container}>
      <View style={styles.weatherHeader}>
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherIcon}>{getWeatherIcon(weather.condition)}</Text>
          <View style={styles.weatherDetails}>
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
            <Text style={styles.condition}>{weather.condition}</Text>
          </View>
        </View>
        <View style={styles.weatherStats}>
          <View style={styles.stat}>
            <Text style={styles.statEmoji}>💧</Text>
            <Text style={styles.statText}>{weather.humidity}%</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statEmoji}>💨</Text>
            <Text style={styles.statText}>{weather.windSpeed} km/h</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.recommendationCard, styles[recommendation.type]]}
        onPress={() => onRecommendationPress(recommendation.recommendation)}
      >
        <View style={styles.recommendationHeader}>
          <Text style={styles.recommendationEmoji}>
            {recommendation.type === 'perfect' ? '☀️' : 
             recommendation.type === 'indoor' ? '🏠' : 
             recommendation.type === 'cold' ? '❄️' : '✅'}
          </Text>
          <Text style={styles.recommendationTitle}>{recommendation.message}</Text>
        </View>
        <Text style={styles.recommendationText}>{recommendation.recommendation}</Text>
        <View style={styles.recommendedPlaces}>
          {recommendation.places.map((place, index) => (
            <Text key={index} style={styles.placeText}>• {place}</Text>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: '#cccccc',
    marginLeft: 10,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  weatherDetails: {
    flex: 1,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  condition: {
    fontSize: 14,
    color: '#cccccc',
  },
  weatherStats: {
    flexDirection: 'row',
    gap: 15,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  recommendationCard: {
    borderRadius: 10,
    padding: 15,
  },
  perfect: {
    backgroundColor: '#4CAF50',
  },
  indoor: {
    backgroundColor: '#2196F3',
  },
  cold: {
    backgroundColor: '#FF9800',
  },
  good: {
    backgroundColor: '#9C27B0',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  recommendationText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 10,
  },
  recommendedPlaces: {
    marginTop: 5,
  },
  placeText: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 2,
  },
  loadingEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  statEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  recommendationEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
});

export default WeatherWidget;
