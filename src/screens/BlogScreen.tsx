import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { locations, Location } from '../data/locations';
import { useResponsive } from '../utils/responsive';

const { width } = Dimensions.get('window');

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: any;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Discovering Hidden Gems in Norfolk',
    excerpt: 'Explore the lesser-known treasures that make Norfolk a truly special destination...',
    content: 'Norfolk is full of hidden gems waiting to be discovered. From quaint villages to stunning coastline, there\'s always something new to explore. In this guide, we\'ll take you through some of the most beautiful and lesser-known spots that locals love.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    image: require('../assets/img/wfqf/image7.png'),
    category: 'Travel Tips'
  },
  {
    id: '2',
    title: 'The History of Downham Market',
    excerpt: 'A journey through time in one of Norfolk\'s most charming market towns...',
    content: 'Downham Market has a rich history dating back centuries. From its origins as a medieval market town to its role in the agricultural revolution, this charming place has many stories to tell. Join us as we explore the historical landmarks and hidden stories.',
    author: 'Michael Brown',
    date: '2024-01-10',
    image: require('../assets/img/wfqf/image8.png'),
    category: 'History'
  },
  {
    id: '3',
    title: 'Best Local Eateries in the Area',
    excerpt: 'From traditional pubs to modern cafes, discover where locals love to dine...',
    content: 'Norfolk is home to some incredible local eateries that offer everything from traditional British fare to international cuisine. We\'ve compiled a list of the best places to eat, from cozy pubs to fine dining restaurants.',
    author: 'Emma Wilson',
    date: '2024-01-05',
    image: require('../assets/img/wfqf/image9.png'),
    category: 'Food & Drink'
  }
];

const BlogScreen = () => {
  const responsive = useResponsive();
  const [activeTab, setActiveTab] = useState<'recommended' | 'saved'>('recommended');

  // Берем первые 3 локации для Recommended
  const recommendedLocations = locations.slice(0, 3);

  const renderBlogPost = (post: BlogPost) => (
    <TouchableOpacity key={post.id} style={[styles.blogCard, { width: responsive.cardWidth, maxWidth: responsive.cardMaxWidth }]}>
      <View style={[styles.imageContainer, { height: responsive.imageHeight }]}>
        <View style={styles.imagePlaceholder}>
          <Image 
            source={post.image} 
            style={styles.placeholderImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.categoryBadge}>
          <Text style={[styles.categoryText, { fontSize: responsive.fontSize.small }]}>{post.category}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[styles.blogTitle, { fontSize: responsive.fontSize.large }]}>{post.title}</Text>
        <Text style={[styles.blogExcerpt, { fontSize: responsive.fontSize.medium }]}>{post.excerpt}</Text>
        
        <View style={styles.blogMeta}>
          <View style={styles.authorInfo}>
            <Text style={styles.metaEmoji}>👤</Text>
            <Text style={[styles.authorText, { fontSize: responsive.fontSize.small }]}>{post.author}</Text>
          </View>
          <View style={styles.dateInfo}>
            <Text style={styles.metaEmoji}>🕒</Text>
            <Text style={[styles.dateText, { fontSize: responsive.fontSize.small }]}>{post.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLocationCard = (location: Location) => (
    <TouchableOpacity key={location.id} style={[styles.locationCard, { width: responsive.cardWidth, maxWidth: responsive.cardMaxWidth }]}>
      <View style={[styles.imageContainer, { height: responsive.imageHeight }]}>
        <View style={styles.imagePlaceholder}>
          <Image 
            source={location.image} 
            style={styles.placeholderImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryEmoji}>
            {location.category === 'peace' ? '🌿' : 
             location.category === 'history' ? '🏰' : '🎉'}
          </Text>
          <Text style={[styles.categoryText, { fontSize: responsive.fontSize.small }]}>
            {location.category === 'peace' ? 'Peace' : 
             location.category === 'history' ? 'History' : 'Liveliness'}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[styles.blogTitle, { fontSize: responsive.fontSize.large }]}>{location.title}</Text>
        <Text style={[styles.blogExcerpt, { fontSize: responsive.fontSize.medium }]}>{location.description}</Text>
        
        <View style={styles.blogMeta}>
          <View style={styles.authorInfo}>
            <Text style={styles.metaEmoji}>📍</Text>
            <Text style={[styles.authorText, { fontSize: responsive.fontSize.small }]}>
              {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
            </Text>
          </View>
          <TouchableOpacity style={styles.dateInfo}>
            <Text style={styles.metaEmoji}>❤️</Text>
            <Text style={[styles.dateText, { fontSize: responsive.fontSize.small }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
    source={require('../assets/img/fb379a3b00e9da2a210056ff53d6130c4e9fc572.png')} 
    style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay for better content readability */}
      <View style={styles.overlay} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/img/ico.png')} style={styles.logo} />
          </View>
        </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'recommended' ? styles.tabActive : styles.tabInactive]}
          onPress={() => setActiveTab('recommended')}
        >
          <Text style={activeTab === 'recommended' ? styles.tabTextActive : styles.tabTextInactive}>Recommended</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'saved' ? styles.tabActive : styles.tabInactive]}
          onPress={() => setActiveTab('saved')}
        >
          <Text style={activeTab === 'saved' ? styles.tabTextActive : styles.tabTextInactive}>Saved</Text>
        </TouchableOpacity>
      </View>


            {/* Content */}
            <ScrollView 
              style={styles.content} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={responsive.isTablet ? styles.tabletContentContainer : styles.phoneContentContainer}
            >
              {activeTab === 'recommended' ? (
                recommendedLocations.map(renderLocationCard)
              ) : (
                blogPosts.map(renderBlogPost)
              )}
            </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#ff4444',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  tabActive: {
    borderBottomColor: '#ff4444',
  },
  tabInactive: {
    borderBottomColor: 'transparent',
  },
  tabTextActive: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  blogCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  locationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#444444',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  cardContent: {
    padding: 20,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  blogExcerpt: {
    color: '#cccccc',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorText: {
    color: '#cccccc',
    fontSize: 14,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    color: '#cccccc',
    fontSize: 14,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  placeholderImage: {
    width: 400,
    height: 200,
  },
  metaEmoji: {
    fontSize: 16,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabletContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  phoneContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default BlogScreen;
