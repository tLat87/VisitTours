import { AudioGuide } from '../types/audio';

export const audioGuides: AudioGuide[] = [
  {
    id: 'ag1',
    locationId: '1',
    title: 'Walk along Fen Rivers Way',
    description: 'Discover the beauty of the River Ouse and surrounding nature in this peaceful audio guide.',
    duration: 300, // 5 minutes
    audioUrl: 'https://example.com/audio/fen-rivers-way.mp3',
    transcript: 'Welcome to Fen Rivers Way - one of the most scenic trails in Downham Market. This 3-kilometer trail runs along the River Ouse, offering stunning views of traditional English countryside. You will see green banks, local boats, and perhaps even wild birds that inhabit these places. This is the perfect place for a quiet walk or bike ride after a busy day.',
    language: 'en',
    narrator: 'Anna Smith',
    points: 25,
    completed: false,
  },
  {
    id: 'ag2',
    locationId: '4',
    title: 'History of Heritage Centre',
    description: 'Immerse yourself in the rich history of Downham Market through exhibits and stories in the former fire station.',
    duration: 420, // 7 minutes
    audioUrl: 'https://example.com/audio/heritage-centre.mp3',
    transcript: 'Welcome to the Discover Downham Heritage Centre - a museum located in the building of a former fire station from 1887. Here are collected unique artifacts, photographs and interactive exhibits telling about the life of Downham Market over the centuries. You will learn about market traditions, ancient customs and the role of the city in English history. Special attention is paid to the city\'s nickname "Gingerbread Town" due to the characteristic carrstone from which many buildings are built.',
    language: 'en',
    narrator: 'John Wilson',
    points: 30,
    completed: false,
  },
  {
    id: 'ag3',
    locationId: '5',
    title: 'Architecture of Town Hall',
    description: 'Explore the unique architecture of Town Hall and learn why Downham Market is called "Gingerbread Town".',
    duration: 360, // 6 minutes
    audioUrl: 'https://example.com/audio/town-hall.mp3',
    transcript: 'Before you is Town Hall - a magnificent example of local carrstone architecture, built in 1887. This building gave Downham Market the nickname "Gingerbread Town" thanks to the characteristic brown stone from which it is built. Carrstone is a local building material that gives buildings a special warm hue. Today, Town Hall hosts exhibitions, events and cultural events, preserving the spirit of the past. Pay attention to the facade details and interior decoration that reflect the Victorian era.',
    language: 'en',
    narrator: 'Mary Brown',
    points: 25,
    completed: false,
  },
  {
    id: 'ag4',
    locationId: '7',
    title: 'Market Life',
    description: 'Feel the atmosphere of a real English market and learn about its traditions.',
    duration: 480, // 8 minutes
    audioUrl: 'https://example.com/audio/market-square.mp3',
    transcript: 'Welcome to Town Square - the heart of Downham Market, which comes alive every Friday and Saturday. Here, dozens of stalls sell fresh fruits, vegetables, pastries, flowers and handmade goods. This is a place where you can feel the true spirit of an English market: the ringing voices of traders, the aroma of fresh bread and meetings of friends. The market has been operating here for more than 200 years, and many trading families pass their business from generation to generation. This is not just a place for shopping - it is the center of the community where people meet, communicate and support local traditions.',
    language: 'en',
    narrator: 'Tom Johnson',
    points: 35,
    completed: false,
  },
  {
    id: 'ag5',
    locationId: '3',
    title: 'Nature of Boughton Fen',
    description: 'Explore the unique ecosystem of fen lands and discover rare species of plants and animals.',
    duration: 540, // 9 minutes
    audioUrl: 'https://example.com/audio/boughton-fen.mp3',
    transcript: 'Welcome to Boughton Fen - a unique nature reserve with fen landscapes that are rarely found in England. Fens are wetlands formed from decomposed plants over thousands of years. Rare species of birds, butterflies and plants that have adapted to this special environment live here. You can see herons, ducks, as well as rare orchids and other plants. This place is perfect for lovers of quiet walks and wildlife observation. The atmosphere here is completely special - you will feel complete harmony with nature.',
    language: 'en',
    narrator: 'Sarah Green',
    points: 40,
    completed: false,
  },
  {
    id: 'ag6',
    locationId: '8',
    title: 'History of The Whalebone',
    description: 'Learn about the rich history of this popular 18th century pub and its role in city life.',
    duration: 300, // 5 minutes
    audioUrl: 'https://example.com/audio/whalebone-pub.mp3',
    transcript: 'Welcome to The Whalebone - a popular pub in an 18th century building that attracts both locals and tourists. The name of the pub comes from the whale bone that once hung above the entrance - a symbol of the city\'s connection with the sea and trade. Inside, there is a lively atmosphere, serving classic English food and drinks at affordable prices. This is the perfect place to end the day after visiting the market or walking. The pub has retained its historical character while offering modern comfort.',
    language: 'en',
    narrator: 'Mike Taylor',
    points: 20,
    completed: false,
  },
];
