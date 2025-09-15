import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import BlogScreen from './src/screens/BlogScreen';
import AboutScreen from './src/screens/AboutScreen';
import OnboardingScreen from './src/components/OnboardingScreen';

// Import hooks
import { useOnboarding } from './src/hooks/useOnboarding';

// Import components
import TabBarIcon from './src/components/TabBarIcon';

const Tab = createBottomTabNavigator();

const App = () => {
  const { isOnboardingComplete, isLoading, completeOnboarding } = useOnboarding();

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
          <ActivityIndicator size="large" color="#ff4444" />
        </View>
      </SafeAreaProvider>
    );
  }

  if (!isOnboardingComplete) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <OnboardingScreen onComplete={completeOnboarding} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <TabBarIcon 
                focused={focused} 
                routeName={route.name} 
                size={size} 
              />
            ),
            tabBarActiveTintColor: 'transparent',
            tabBarInactiveTintColor: 'transparent',
            tabBarStyle: {
              // backgroundColor: '#1a1a1a',
              borderTopWidth: 0,
              height: 80,
              backgroundColor: '#000',
              paddingBottom: 15,
              paddingTop: 15,
              paddingHorizontal: 20,
            },
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              title: 'Places',
              headerShown: false 
            }} 
          />
          <Tab.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ 
              title: 'Map',
              headerShown: false 
            }} 
          />
          <Tab.Screen 
            name="Blog" 
            component={BlogScreen} 
            options={{ 
              title: 'Blog',
              headerShown: false 
            }} 
          />
          <Tab.Screen 
            name="About" 
            component={AboutScreen} 
            options={{ 
              title: 'About',
              headerShown: false 
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;