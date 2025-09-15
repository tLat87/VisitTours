# Visit Norfolk Ladbrokes Tours

A React Native app for discovering Norfolk's hidden gems, historic landmarks, and vibrant market life.

## Features

- **Onboarding Experience**: 3 beautiful onboarding screens that introduce the app features
- **Dark Theme Design**: Modern dark UI with red accents matching the design specifications
- **Category Filtering**: Filter locations by Peace, History, Liveliness, or view All
- **Interactive Map**: View locations on a dark-themed map with custom markers
- **Location Details**: Detailed information about each location with full descriptions
- **Blog Section**: Articles and stories about local attractions
- **About Page**: App information with share functionality and onboarding reset
- **Bottom Navigation**: Easy navigation between Places, Map, Blog, and About sections
- **Persistent Storage**: Remembers if user has completed onboarding

## Screens

1. **Onboarding Screens**: 3 introductory screens that show on first launch
   - Discover Norfolk: Introduction to the app's purpose
   - Find Your Perfect Spot: Category filtering explanation
   - Plan Your Journey: Features overview
2. **Home Screen**: Main screen with category filters and location cards
3. **Map Screen**: Interactive map showing all locations with markers
4. **Blog Screen**: Articles and stories about Norfolk attractions
5. **About Screen**: App information, sharing functionality, and onboarding reset

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **iOS Setup**:
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android Setup**:
   - Ensure you have Android Studio and SDK installed
   - No additional setup required

4. **Run the App**:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

## Image Setup

The app uses background images for all screens and local images for locations.

### Background Images
All screens have custom background images located in `src/assets/img/ihi/`:

- `image1.png` - HomeScreen background
- `image2.png` - MapScreen background  
- `image6.png` - BlogScreen background
- `image7.png` - AboutScreen background
- `image3.png` - Onboarding screen 1
- `image4.png` - Onboarding screen 2
- `image5.png` - Onboarding screen 3

See `BACKGROUND_IMAGES.md` for detailed setup instructions.

### Icons
The app uses emoji icons throughout the interface for simplicity and universal compatibility:

- **Navigation**: 🏠/🏡 (Home), 🗺️/📍 (Map), 📝/📄 (Blog), ℹ️/❓ (About)
- **Categories**: 🌿 (Peace), 🏰 (History), 🎉 (Liveliness), 🌟 (All)
- **Actions**: 📍 (Location), 🖼️ (Image), ❤️/🤍 (Like), 📤 (Share)

See `EMOJI_ICONS.md` for complete emoji reference.

### Location Images
The app includes 9 real locations in Downham Market:

**🌿 Peace and quiet (3 places):**
- Fen Rivers Way riverside walk
- Church Farm, Stow Bardolph  
- Boughton Fen

**🏰 History and heritage (3 places):**
- Discover Downham Heritage Centre
- Downham Market Town Hall
- Gingerbread Town Trail

**🎉 Liveliness and Market (3 places):**
- Downham Market Town Square (Market Days)
- The Whalebone (Wetherspoons pub)
- Norfolk Cheese Co & Delicatessen

To add your own location images:

1. Place your images in the project root directory
2. Update the `image` property in `/src/data/locations.ts` with your image filenames
3. The app will automatically load images using the `file://` protocol

See `LOCATION_IMAGES.md` for detailed setup instructions.

Example:
```typescript
{
  id: '1',
  title: 'Fen Rivers Way riverside walk',
  // ... other properties
  image: 'fen_rivers_way.jpg', // Place this file in project root
}
```

## Dependencies

- React Native 0.80.0
- React Navigation 6.x
- React Native Maps
- React Native Vector Icons
- React Native Share
- React Native Safe Area Context
- AsyncStorage (for onboarding persistence)

## Design Features

- **Color Scheme**: Dark background (#1a1a1a) with red accents (#ff4444)
- **Typography**: Clean, modern fonts with proper contrast
- **Cards**: Rounded corners with subtle shadows
- **Navigation**: Bottom tab navigation with icons
- **Responsive**: Adapts to different screen sizes

## Customization

You can easily customize:
- Colors in the StyleSheet objects
- Location data in `/src/data/locations.ts`
- Blog posts in the BlogScreen component
- App information in the AboutScreen component

## Onboarding

The app includes 3 onboarding screens that are shown only on the first launch:

1. **Discover Norfolk** - Introduces the app's purpose and main features
2. **Find Your Perfect Spot** - Explains the category filtering system
3. **Plan Your Journey** - Shows how to use maps, save places, and read the blog

- Onboarding state is saved using AsyncStorage
- Users can reset onboarding from the About screen for testing
- Each screen has a unique color, icon, and background image
- Progress indicators show current position
- Skip option available on first two screens
- Custom background images support (see ONBOARDING_IMAGES.md for setup)

## Map Setup

The app includes an interactive map showing all 14 locations in Downham Market. If the map doesn't display:

1. **Get Google Maps API Key** from Google Cloud Console
2. **Add API key** to Android/iOS configuration
3. **Enable location permissions**
4. **Check internet connection**

See `MAP_SETUP.md` for detailed setup instructions.

## Troubleshooting

### Map not displaying
- Verify Google Maps API key is correctly configured
- Check location permissions are granted
- Ensure internet connection is available
- Try running on a real device instead of simulator

### Images not loading
- Check file paths in `/src/data/locations.ts`
- Ensure image files exist in the specified directories
- Verify file permissions

## Notes

- The app uses placeholder images that can be replaced with actual photos
- All coordinates are set for Norfolk, UK area
- The map shows 14 real locations in Downham Market
- Interactive markers with category emojis (🌿🏰🎉)
- Share functionality is implemented using React Native Share