import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Определяем тип устройства
export const getDeviceType = () => {
  const aspectRatio = height / width;
  
  if (Platform.OS === 'ios') {
    if (width >= 1024) {
      return 'ipad';
    } else if (width >= 768) {
      return 'ipad-mini';
    } else if (width >= 414) {
      return 'iphone-plus';
    } else if (width >= 375) {
      return 'iphone';
    } else {
      return 'iphone-se';
    }
  } else {
    if (width >= 1024) {
      return 'tablet';
    } else if (width >= 600) {
      return 'tablet-small';
    } else {
      return 'phone';
    }
  }
};

// Определяем размеры для разных устройств
export const getResponsiveDimensions = () => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'ipad':
      return {
        isTablet: true,
        isIpad: true,
        screenWidth: width,
        screenHeight: height,
        cardWidth: Math.min(width * 0.4, 400),
        cardMaxWidth: 400,
        fontSize: {
          small: 14,
          medium: 16,
          large: 20,
          xlarge: 24,
          xxlarge: 32,
        },
        spacing: {
          small: 8,
          medium: 16,
          large: 24,
          xlarge: 32,
        },
        imageHeight: 250,
        buttonHeight: 50,
        borderRadius: 15,
      };
    case 'ipad-mini':
      return {
        isTablet: true,
        isIpad: true,
        screenWidth: width,
        screenHeight: height,
        cardWidth: Math.min(width * 0.45, 350),
        cardMaxWidth: 350,
        fontSize: {
          small: 13,
          medium: 15,
          large: 18,
          xlarge: 22,
          xxlarge: 28,
        },
        spacing: {
          small: 7,
          medium: 14,
          large: 21,
          xlarge: 28,
        },
        imageHeight: 220,
        buttonHeight: 45,
        borderRadius: 12,
      };
    case 'iphone-plus':
      return {
        isTablet: false,
        isIpad: false,
        screenWidth: width,
        screenHeight: height,
        cardWidth: width * 0.9,
        cardMaxWidth: 400,
        fontSize: {
          small: 12,
          medium: 14,
          large: 16,
          xlarge: 20,
          xxlarge: 24,
        },
        spacing: {
          small: 6,
          medium: 12,
          large: 18,
          xlarge: 24,
        },
        imageHeight: 200,
        buttonHeight: 40,
        borderRadius: 10,
      };
    default: // iPhone, iPhone SE, Android phones
      return {
        isTablet: false,
        isIpad: false,
        screenWidth: width,
        screenHeight: height,
        cardWidth: width * 0.9,
        cardMaxWidth: 350,
        fontSize: {
          small: 11,
          medium: 13,
          large: 15,
          xlarge: 18,
          xxlarge: 22,
        },
        spacing: {
          small: 5,
          medium: 10,
          large: 15,
          xlarge: 20,
        },
        imageHeight: 180,
        buttonHeight: 35,
        borderRadius: 8,
      };
  }
};

// Хук для использования в компонентах
export const useResponsive = () => {
  return getResponsiveDimensions();
};
