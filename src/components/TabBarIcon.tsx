import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface TabBarIconProps {
  focused: boolean;
  routeName: string;
  size?: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, routeName, size = 24 }) => {
  const getIconSource = () => {
    // Replace paths with your PNG images
    switch (routeName) {
      case 'Home':
        return focused 
          ? require('../assets/img/fqwfqwf/Vector-1.png')  // Active icon
          : require('../assets/img/fqwfqwf/Vector-1.png'); // Inactive icon
      case 'Map':
        return focused 
          ? require('../assets/img/fqwfqwf/Vector-2.png')
          : require('../assets/img/fqwfqwf/Vector-2.png');
      case 'Blog':
        return focused 
          ? require('../assets/img/fqwfqwf/Vector-3.png')
          : require('../assets/img/fqwfqwf/Vector-3.png');
      case 'About':
        return focused 
          ? require('../assets/img/fqwfqwf/Vector.png')
          : require('../assets/img/fqwfqwf/Vector.png');
      case 'Profile':
        return focused 
          ? require('../assets/img/fqwfqwf/Vector-1.png') // Using existing icon for profile
          : require('../assets/img/fqwfqwf/Vector-1.png');
      default:
        return require('../assets/img/fqwfqwf/Vector-1.png');
    }
  };

  return (
    <View style={[styles.container, focused ? styles.activeButton : styles.inactiveButton]}>
      <Image
        source={getIconSource()}
        style={[styles.icon, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: '#ffffff',
    borderColor: '#333333',
  },
  inactiveButton: {
    backgroundColor: '#8B4513', // Dark brown color as in photo
    borderColor: '#ffffff',
  },
  icon: {
    // Additional styles for icons if needed
  },
});

export default TabBarIcon;

