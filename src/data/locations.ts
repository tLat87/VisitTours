export interface Location {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: 'peace' | 'history' | 'liveliness';
  image: any;
  isLiked?: boolean;
}

export const locations: Location[] = [
  // Peace and quiet places
  {
    id: '1',
    title: 'Fen Rivers Way riverside walk',
    description: 'This scenic route runs alongside the River Ouse, offering views of the green banks, boats and traditional English countryside...',
    fullDescription: 'This scenic route runs alongside the River Ouse, offering views of the green banks, boats and traditional English countryside. It is a leisurely walk or cycle route, enjoying the peace and quiet. Locals often come here to relax after a day at work.',
    coordinates: {
      latitude: 52.5730,
      longitude: 0.3930
    },
    category: 'peace',
    image: require('../assets/img/vgv/1.png'),
    isLiked: false
  },
  {
    id: '2',
    title: 'Church Farm, Stow Bardolph',
    description: 'A family-run farm just minutes from Downham, where you can see rare breeds of farm animals, pet rabbits and even ride a pony...',
    fullDescription: 'A family-run farm just minutes from Downham, where you can see rare breeds of farm animals, pet rabbits and even ride a pony. It is a great place for a relaxing holiday with children, with a warm atmosphere and a sense of country life.',
    coordinates: {
      latitude: 52.6080,
      longitude: 0.4630
    },
    category: 'peace',
    image: require('../assets/img/vgv/2.png'),
    isLiked: false
  },
  {
    id: '3',
    title: 'Boughton Fen',
    description: 'A nature reserve with unique fen-like landscapes, home to rare species of birds and butterflies...',
    fullDescription: 'A nature reserve with unique fen-like landscapes, home to rare species of birds and butterflies. This is a great place for lovers of quiet walks and wildlife observation. The atmosphere here is completely different - you can feel complete harmony with nature.',
    coordinates: {
      latitude: 52.6010,
      longitude: 0.4980
    },
    category: 'peace',
    image: require('../assets/img/vgv/3.png'),
    isLiked: false
  },
  
  // History and heritage places
  {
    id: '4',
    title: 'Discover Downham Heritage Centre',
    description: 'A museum in the building of a former fire station, which collects artifacts, photographs and interactive exhibits about the life of Downham over the centuries...',
    fullDescription: 'A museum in the building of a former fire station, which collects artifacts, photographs and interactive exhibits about the life of Downham over the centuries. Here you can learn about the history of markets, ancient traditions and the role of the town in English history. The atmosphere is created in such a way that it will be interesting for both adults and children.',
    coordinates: {
      latitude: 52.5785,
      longitude: 0.3935
    },
    category: 'history',
    image: require('../assets/img/vgv/4.png'),
    isLiked: false
  },
  {
    id: '5',
    title: 'Downham Market Town Hall',
    description: 'Built in 1887, the town hall is a fine example of local carrstone architecture, which has earned the town the nickname "Gingerbread Town"...',
    fullDescription: 'Built in 1887, the town hall is a fine example of local carrstone architecture, which has earned the town the nickname "Gingerbread Town". Today, it hosts exhibitions, events and cultural events, preserving the spirit of the past.',
    coordinates: {
      latitude: 52.5770,
      longitude: 0.3925
    },
    category: 'history',
    image: require('../assets/img/vgv/5.png'),
    isLiked: false
  },
  {
    id: '6',
    title: 'Gingerbread Town Trail',
    description: 'A walking route that will take you past historic buildings built of the characteristic brownstone...',
    fullDescription: 'A walking route that will take you past historic buildings built of the characteristic brownstone. This is a great opportunity to feel the special atmosphere of the town and understand why it was called the "Gingerbread Town". The route is suitable for both a short walk and a full day of discovery.',
    coordinates: {
      latitude: 52.5775,
      longitude: 0.3928
    },
    category: 'history',
    image: require('../assets/img/vgv/6.png'),
    isLiked: false
  },
  
  // Liveliness and Market places
  {
    id: '7',
    title: 'Downham Market Town Square (Market Days)',
    description: 'The heart of the town comes alive every Friday and Saturday, when dozens of stalls selling fruit, vegetables, pastries, flowers and artisan goods appear here...',
    fullDescription: 'The heart of the town comes alive every Friday and Saturday, when dozens of stalls selling fruit, vegetables, pastries, flowers and artisan goods appear here. The atmosphere of a true English market: the ringing voices of traders, the aroma of fresh bread and the gathering of friends. This is a place where you can feel the spirit of the community.',
    coordinates: {
      latitude: 52.5765,
      longitude: 0.3920
    },
    category: 'liveliness',
    image: require('../assets/img/vgv/7.png'),
    isLiked: false
  },
  {
    id: '8',
    title: 'The Whalebone (Wetherspoons pub)',
    description: 'A popular pub in an 18th century building, attracting both locals and tourists...',
    fullDescription: 'A popular pub in an 18th century building, attracting both locals and tourists. Inside, there is a lively atmosphere, serving classic English food and drinks at affordable prices. The perfect place to end the day after the market or a walk.',
    coordinates: {
      latitude: 52.5768,
      longitude: 0.3922
    },
    category: 'liveliness',
    image: require('../assets/img/vgv/8.png'),
    isLiked: false
  },
  {
    id: '9',
    title: 'Norfolk Cheese Co & Delicatessen',
    description: 'A small delicatessen in the heart of Downham, stocking the finest local cheeses, delicatessens and coffee...',
    fullDescription: 'A small delicatessen in the heart of Downham, stocking the finest local cheeses, delicatessens and coffee. It\'s not just a place to shop, it\'s also a place to experience Norfolk\'s culinary heritage. The owners often give advice on what to try for tourists.',
    coordinates: {
      latitude: 52.5769,
      longitude: 0.3923
    },
    category: 'liveliness',
    image: require('../assets/img/vgv/9.png'),
    isLiked: false
  },

  // Additional places for Map screen

];
