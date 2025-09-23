import { Achievement, PhotoChallenge } from '../types/game';

export const achievements: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Steps',
    description: 'Visit your first place',
    icon: '👣',
    points: 10,
    unlocked: false,
    requirement: {
      type: 'visit_locations',
      value: 1
    }
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit 5 places',
    icon: '🗺️',
    points: 50,
    unlocked: false,
    requirement: {
      type: 'visit_locations',
      value: 5
    }
  },
  {
    id: 'historian',
    title: 'Historian',
    description: 'Visit all historical places',
    icon: '🏰',
    points: 100,
    unlocked: false,
    requirement: {
      type: 'visit_category',
      value: 3,
      category: 'history'
    }
  },
  {
    id: 'nature_lover',
    title: 'Nature Lover',
    description: 'Visit all peaceful places',
    icon: '🌿',
    points: 100,
    unlocked: false,
    requirement: {
      type: 'visit_category',
      value: 3,
      category: 'peace'
    }
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Visit all lively places',
    icon: '🎉',
    points: 100,
    unlocked: false,
    requirement: {
      type: 'visit_category',
      value: 3,
      category: 'liveliness'
    }
  },
  {
    id: 'photo_master',
    title: 'Photo Master',
    description: 'Complete 3 photo challenges',
    icon: '📸',
    points: 75,
    unlocked: false,
    requirement: {
      type: 'complete_photo_challenge',
      value: 3
    }
  },
  {
    id: 'photographer',
    title: 'Photographer',
    description: 'Complete 5 photo challenges',
    icon: '📸',
    points: 80,
    unlocked: false,
    requirement: {
      type: 'take_photos',
      value: 5
    }
  },
  {
    id: 'influencer',
    title: 'Influencer',
    description: 'Share 10 places',
    icon: '📱',
    points: 60,
    unlocked: false,
    requirement: {
      type: 'share_locations',
      value: 10
    }
  }
];


export const photoChallenges: PhotoChallenge[] = [
  {
    id: 'pc1',
    locationId: '1',
    title: 'River Panorama',
    description: 'Take a photo of the beautiful view of the River Ouse',
    points: 15,
    completed: false
  },
  {
    id: 'pc2',
    locationId: '4',
    title: 'Historical Moment',
    description: 'Take a photo of the Heritage Centre building from an interesting angle',
    points: 15,
    completed: false
  },
  {
    id: 'pc3',
    locationId: '7',
    title: 'Market Life',
    description: 'Take a photo of the lively market in action',
    points: 20,
    completed: false
  },
  {
    id: 'pc4',
    locationId: '5',
    title: 'Architectural Beauty',
    description: 'Take a photo of the carrstone details of Town Hall',
    points: 15,
    completed: false
  },
  {
    id: 'pc5',
    locationId: '3',
    title: 'Natural Harmony',
    description: 'Take a photo of the unique fen landscape',
    points: 20,
    completed: false
  }
];
