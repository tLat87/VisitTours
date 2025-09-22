export interface Review {
  id: string;
  locationId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
  photos?: string[];
}

export interface Rating {
  locationId: string;
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface SocialChallenge {
  id: string;
  title: string;
  description: string;
  locationId: string;
  points: number;
  participants: number;
  endDate: Date;
  requirements: {
    type: 'photo' | 'review' | 'checkin' | 'quiz';
    description: string;
  };
  rewards: {
    points: number;
    badge?: string;
  };
}
