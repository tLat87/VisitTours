# Список изображений для VisitTours App

## Необходимые изображения для папки `src/assets/img/`

### Основные локации (14 изображений):

1. **fen_rivers_way.jpg** - Fen Rivers Way riverside walk
2. **church_farm.jpg** - Church Farm, Stow Bardolph  
3. **boughton_fen.jpg** - Boughton Fen
4. **heritage_centre.jpg** - Discover Downham Heritage Centre
5. **town_hall.jpg** - Downham Market Town Hall
6. **gingerbread_trail.jpg** - Gingerbread Town Trail
7. **market_square.jpg** - Downham Market Town Square (Market Days)
8. **whalebone_pub.jpg** - The Whalebone (Wetherspoons pub)
9. **cheese_delicatessen.jpg** - Norfolk Cheese Co & Delicatessen
10. **clock_tower.jpg** - Clock Tower
11. **market_square_main.jpg** - Market Square
12. **charles_i_mystery.jpg** - The Mystery of Charles I
13. **great_ouse_river.jpg** - The Great Ouse River
14. **discover_downham.jpg** - Discover Downham

### Блог посты (3 изображения):

15. **blog1.jpg** - Discovering Hidden Gems in Norfolk
16. **blog2.jpg** - The History of Downham Market  
17. **blog3.jpg** - Best Local Eateries in the Area

## Структура папки:
```
src/assets/img/
├── fen_rivers_way.jpg
├── church_farm.jpg
├── boughton_fen.jpg
├── heritage_centre.jpg
├── town_hall.jpg
├── gingerbread_trail.jpg
├── market_square.jpg
├── whalebone_pub.jpg
├── cheese_delicatessen.jpg
├── clock_tower.jpg
├── market_square_main.jpg
├── charles_i_mystery.jpg
├── great_ouse_river.jpg
├── discover_downham.jpg
├── blog1.jpg
├── blog2.jpg
└── blog3.jpg
```

## Примечания:
- Всего изображений: **17 файлов**
- Все изображения должны быть в формате JPG
- Рекомендуемое разрешение: 800x600 пикселей или больше
- Соотношение сторон: 4:3 или 16:9
- Размер файла: до 2MB каждое изображение

## Статус:
✅ **Все плейсхолдеры заменены на актуальные изображения**
- HomeScreen: использует `location.image`
- BlogScreen: использует `post.image` для блогов и `location.image` для локаций
- MapScreen: использует `selectedLocation.image`
- LocationDetailModal: использует `location.image`
