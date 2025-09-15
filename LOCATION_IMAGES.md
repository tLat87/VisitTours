# Настройка изображений для мест

## Новые места в приложении

Добавлено 9 новых мест в Downham Market, разделенных по категориям:

### 🌿 Peace and quiet (3 места)
1. **Fen Rivers Way riverside walk** - `fen_rivers_way.jpg`
2. **Church Farm, Stow Bardolph** - `church_farm.jpg`
3. **Boughton Fen** - `boughton_fen.jpg`

### 🏰 History and heritage (3 места)
4. **Discover Downham Heritage Centre** - `heritage_centre.jpg`
5. **Downham Market Town Hall** - `town_hall.jpg`
6. **Gingerbread Town Trail** - `gingerbread_trail.jpg`

### 🎉 Liveliness and Market (3 места)
7. **Downham Market Town Square (Market Days)** - `market_square.jpg`
8. **The Whalebone (Wetherspoons pub)** - `whalebone_pub.jpg`
9. **Norfolk Cheese Co & Delicatessen** - `cheese_delicatessen.jpg`

## Настройка путей к изображениям

### Способ 1: В корне проекта
Поместите изображения в корневую папку проекта и обновите пути в `/src/data/locations.ts`:

```typescript
// Пример для Fen Rivers Way
image: 'fen_rivers_way.jpg', // Файл в корне проекта
```

### Способ 2: В папке assets
Поместите изображения в папку `src/assets/img/locations/` и обновите пути:

```typescript
// Пример для Fen Rivers Way
image: 'src/assets/img/locations/fen_rivers_way.jpg',
```

### Способ 3: Использование require()
Для статических изображений используйте require():

```typescript
// Пример для Fen Rivers Way
image: require('../assets/img/locations/fen_rivers_way.jpg'),
```

## Требования к изображениям

### Размеры
- **Рекомендуемый размер**: 400x300 пикселей (4:3 соотношение)
- **Минимальный размер**: 300x200 пикселей
- **Максимальный размер**: 800x600 пикселей

### Формат
- **Формат**: JPG или PNG
- **Качество**: Высокое (для JPG - 85-95%)
- **Цветовая модель**: RGB

### Стиль
- **Композиция**: Основной объект в центре или по правилу третей
- **Освещение**: Хорошее освещение, избегайте переэкспонированных областей
- **Резкость**: Четкое изображение без размытости
- **Цвета**: Естественные, приятные цвета

## Рекомендации по съемке

### Для Peace and quiet мест:
- Природные пейзажи
- Спокойные, умиротворяющие сцены
- Зеленые тона, вода, небо
- Избегайте людей в кадре

### Для History and heritage мест:
- Архитектурные детали
- Исторические здания
- Традиционные элементы
- Можно включить людей для масштаба

### Для Liveliness and Market мест:
- Оживленные сцены
- Люди, активность
- Яркие цвета
- Атмосфера рынка или паба

## Обновление путей в коде

Откройте файл `/src/data/locations.ts` и замените пути к изображениям:

```typescript
// Найти и заменить для каждого места
image: 'your_path_here/fen_rivers_way.jpg',
image: 'your_path_here/church_farm.jpg',
image: 'your_path_here/boughton_fen.jpg',
// ... и так далее для всех 9 мест
```

## Тестирование

После добавления изображений:

1. Запустите приложение
2. Проверьте все категории (Peace, History, Liveliness)
3. Убедитесь, что изображения загружаются корректно
4. Проверьте отображение на разных размерах экранов

## Устранение проблем

### Изображение не загружается
- Проверьте правильность пути к файлу
- Убедитесь, что файл существует
- Проверьте права доступа к файлу
- Убедитесь, что формат файла поддерживается

### Плохое качество изображения
- Увеличьте разрешение изображения
- Проверьте настройки сжатия
- Используйте исходные файлы высокого качества

### Медленная загрузка
- Оптимизируйте размер файлов
- Используйте сжатие без потери качества
- Рассмотрите использование WebP формата

## Дополнительные настройки

### Кэширование изображений
Для лучшей производительности можно добавить кэширование:

```typescript
// В HomeScreen.tsx
<Image 
  source={{ uri: `file://${location.image}` }} 
  style={styles.locationImage}
  resizeMode="cover"
  cache="force-cache" // Добавить кэширование
/>
```

### Плейсхолдеры
Можно добавить плейсхолдеры для загрузки:

```typescript
<Image 
  source={{ uri: `file://${location.image}` }} 
  style={styles.locationImage}
  resizeMode="cover"
  defaultSource={require('../assets/img/placeholder.jpg')} // Плейсхолдер
/>
```

