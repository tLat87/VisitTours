# Настройка фоновых изображений для онбординга

## Требования к изображениям

Для каждого экрана онбординга нужны фоновые изображения в формате PNG:

### Размеры изображений
- **Рекомендуемый размер**: 1080x1920 пикселей (9:16 соотношение)
- **Минимальный размер**: 720x1280 пикселей
- **Максимальный размер**: 1440x2560 пикселей

### Имена файлов
Поместите ваши изображения в корневую папку проекта со следующими именами:

1. **onboarding_1.png** - для экрана "Discover Norfolk"
2. **onboarding_2.png** - для экрана "Find Your Perfect Spot"  
3. **onboarding_3.png** - для экрана "Plan Your Journey"

## Настройка путей к изображениям

Откройте файл `/src/components/OnboardingScreen.tsx` и найдите массив `onboardingData`:

```typescript
const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: 'Discover Norfolk',
    description: 'Explore the charm of Downham Market and discover hidden gems throughout Norfolk with our curated recommendations.',
    icon: 'explore',
    color: '#ff4444',
    backgroundImage: 'onboarding_1.png', // ← Замените на ваш путь
  },
  {
    id: 2,
    title: 'Find Your Perfect Spot',
    description: 'Filter locations by mood - whether you seek peace, history, or liveliness. Find exactly what you\'re looking for.',
    icon: 'filter-list',
    color: '#4CAF50',
    backgroundImage: 'onboarding_2.png', // ← Замените на ваш путь
  },
  {
    id: 3,
    title: 'Plan Your Journey',
    description: 'Save your favorite places, explore interactive maps, and dive into local stories through our blog.',
    icon: 'bookmark',
    color: '#2196F3',
    backgroundImage: 'onboarding_3.png', // ← Замените на ваш путь
  },
];
```

## Примеры путей

### Если изображения в корне проекта:
```typescript
backgroundImage: 'onboarding_1.png'
```

### Если изображения в папке assets:
```typescript
backgroundImage: 'assets/onboarding_1.png'
```

### Если изображения в папке images:
```typescript
backgroundImage: 'images/onboarding_1.png'
```

### Абсолютный путь:
```typescript
backgroundImage: '/Users/username/Desktop/VisitTours/images/onboarding_1.png'
```

## Рекомендации по дизайну

### Цветовая схема
- Используйте темные или приглушенные тона для лучшей читаемости текста
- Избегайте слишком ярких или контрастных изображений
- Текст будет белым с тенью для лучшей видимости

### Композиция
- Основные элементы должны быть в центре или в верхней части изображения
- Избегайте размещения важных деталей в нижней части (там будут кнопки)
- Учитывайте, что логотип будет в верхней части экрана

### Стиль изображений
- **Экран 1 (Discover Norfolk)**: Пейзажи, достопримечательности, общие виды
- **Экран 2 (Find Your Perfect Spot)**: Категории мест (исторические, природные, оживленные)
- **Экран 3 (Plan Your Journey)**: Карты, путешествия, планирование

## Тестирование

После добавления изображений:

1. Запустите приложение
2. Если онбординг уже был завершен, сбросьте его через About экран
3. Проверьте, что все изображения загружаются корректно
4. Убедитесь, что текст читается на всех фонах

## Устранение проблем

### Изображение не загружается
- Проверьте правильность пути к файлу
- Убедитесь, что файл существует и имеет правильное имя
- Проверьте права доступа к файлу

### Плохая читаемость текста
- Добавьте более темный оверлей в стилях
- Измените прозрачность оверлея: `backgroundColor: 'rgba(0, 0, 0, 0.6)'`
- Используйте изображения с менее контрастными деталями

