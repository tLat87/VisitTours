import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Rating, Review } from '../types/social';

const { width } = Dimensions.get('window');

interface RatingDisplayProps {
  rating: Rating;
  reviews: Review[];
  onWriteReview: () => void;
  onViewAllReviews: () => void;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviews,
  onWriteReview,
  onViewAllReviews,
}) => {
  const renderStars = (averageRating: number, size: number = 20) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(averageRating) ? 'star' : 
              index < averageRating ? 'star-half' : 'star-border'}
        size={size}
        color="#FFD700"
        style={styles.star}
      />
    ));
  };

  const renderRatingBar = (stars: number, count: number, total: number) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    
    return (
      <View style={styles.ratingBarContainer}>
        <Text style={styles.starNumber}>{stars}</Text>
        <Icon name="star" size={12} color="#FFD700" />
        <View style={styles.ratingBar}>
          <View 
            style={[styles.ratingBarFill, { width: `${percentage}%` }]} 
          />
        </View>
        <Text style={styles.ratingCount}>{count}</Text>
      </View>
    );
  };

  const getRatingText = (averageRating: number) => {
    if (averageRating >= 4.5) return 'Excellent';
    if (averageRating >= 4.0) return 'Very Good';
    if (averageRating >= 3.5) return 'Good';
    if (averageRating >= 3.0) return 'Average';
    if (averageRating >= 2.0) return 'Poor';
    return 'Terrible';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingSummary}>
          <Text style={styles.averageRating}>{rating.averageRating.toFixed(1)}</Text>
          <View style={styles.starsContainer}>
            {renderStars(rating.averageRating, 24)}
          </View>
          <Text style={styles.ratingText}>{getRatingText(rating.averageRating)}</Text>
          <Text style={styles.totalRatings}>
            {rating.totalRatings} {rating.totalRatings === 1 ? 'review' : 'reviews'}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.writeReviewButton} onPress={onWriteReview}>
          <Icon name="edit" size={16} color="#ffffff" />
          <Text style={styles.writeReviewText}>Write Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ratingBreakdown}>
        <Text style={styles.breakdownTitle}>Rating Distribution</Text>
        {renderRatingBar(5, rating.ratingDistribution[5], rating.totalRatings)}
        {renderRatingBar(4, rating.ratingDistribution[4], rating.totalRatings)}
        {renderRatingBar(3, rating.ratingDistribution[3], rating.totalRatings)}
        {renderRatingBar(2, rating.ratingDistribution[2], rating.totalRatings)}
        {renderRatingBar(1, rating.ratingDistribution[1], rating.totalRatings)}
      </View>

      {reviews.length > 0 && (
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>Recent Reviews</Text>
            <TouchableOpacity onPress={onViewAllReviews}>
              <Text style={styles.viewAllText}>All Reviews</Text>
            </TouchableOpacity>
          </View>
          
          {reviews.slice(0, 3).map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewUser}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userInitial}>
                      {review.userName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.userName}>{review.userName}</Text>
                    <View style={styles.reviewRating}>
                      {renderStars(review.rating, 14)}
                      <Text style={styles.reviewDate}>
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.helpfulButton}>
                  <Icon name="thumb-up" size={16} color="#cccccc" />
                  <Text style={styles.helpfulText}>{review.helpful}</Text>
                </TouchableOpacity>
              </View>
              
              {review.comment && (
                <Text style={styles.reviewComment}>{review.comment}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingSummary: {
    alignItems: 'center',
    flex: 1,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    marginHorizontal: 1,
  },
  ratingText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalRatings: {
    fontSize: 14,
    color: '#cccccc',
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  writeReviewText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  ratingBreakdown: {
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starNumber: {
    color: '#ffffff',
    fontSize: 14,
    width: 20,
  },
  ratingBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  ratingCount: {
    color: '#cccccc',
    fontSize: 12,
    width: 30,
    textAlign: 'right',
  },
  reviewsSection: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  viewAllText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewItem: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewUser: {
    flexDirection: 'row',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userInitial: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    color: '#cccccc',
    fontSize: 12,
    marginLeft: 10,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    color: '#cccccc',
    fontSize: 12,
    marginLeft: 5,
  },
  reviewComment: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default RatingDisplay;
