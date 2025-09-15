# Настройка карты в приложении

## Проблемы и решения

### Карта не отображается

Если карта не отображается на экране MapScreen, выполните следующие шаги:

#### 1. Проверьте зависимости
Убедитесь, что установлены все необходимые пакеты:

```bash
npm install react-native-maps
```

#### 2. Настройка для iOS
Добавьте в `ios/VisitTours/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to location when open.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>This app needs access to location when open and in the background.</string>
```

#### 3. Настройка для Android
Добавьте в `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Google Maps API Key -->
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
```

#### 4. Получение Google Maps API Key

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите следующие API:
   - Maps SDK for Android
   - Maps SDK for iOS
4. Создайте API ключ
5. Ограничьте ключ для безопасности

#### 5. Установка API ключа

**Для Android:**
```xml
<!-- В android/app/src/main/AndroidManifest.xml -->
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_API_KEY_HERE"/>
```

**Для iOS:**
```xml
<!-- В ios/VisitTours/Info.plist -->
<key>GMSApiKey</key>
<string>YOUR_API_KEY_HERE</string>
```

## Функциональность карты

### Маркеры
- **Красные круглые маркеры** с смайликами категорий
- 🌿 для Peace and quiet
- 🏰 для History and heritage  
- 🎉 для Liveliness and Market

### Интерактивность
- **Нажатие на маркер** открывает карточку с информацией
- **Карточка содержит:**
  - Заголовок места
  - Координаты
  - Полное описание
  - Бейдж категории
  - Кнопки действий (карта, лайк, поделиться)

### Кнопки управления
- **←** - кнопка назад (левый верхний угол)
- **✕** - кнопка закрытия (правый верхний угол)
- **🗺️** - показать на карте
- **❤️/🤍** - добавить в избранное
- **📤** - поделиться

## Отладка

### Проверка данных
В консоли должно отображаться:
```
MapScreen locations: 14
```

Если количество мест равно 0, проверьте:
1. Импорт данных в MapScreen
2. Правильность пути к файлу locations.ts

### Проверка карты
Если карта не загружается:

1. **Проверьте API ключ** - убедитесь, что ключ правильный
2. **Проверьте разрешения** - убедитесь, что приложение имеет доступ к местоположению
3. **Проверьте интернет** - карта требует подключения к интернету
4. **Проверьте эмулятор** - на некоторых эмуляторах карты могут не работать

### Временные решения
Если карта все еще не работает:

1. **Уберите provider={PROVIDER_GOOGLE}** из MapView
2. **Отключите темную тему** (закомментируйте customMapStyle)
3. **Используйте стандартную карту** без кастомизации

## Восстановление темной темы

После того как карта заработает, можно восстановить темную тему:

```typescript
<MapView
  provider={PROVIDER_GOOGLE}
  customMapStyle={[
    // ... стили темной темы
  ]}
>
```

## Тестирование

### На устройстве
1. Запустите приложение на реальном устройстве
2. Перейдите на экран карты
3. Проверьте отображение маркеров
4. Нажмите на каждый маркер
5. Проверьте функциональность карточек

### На эмуляторе
1. Используйте эмулятор с Google Play Services
2. Убедитесь, что включена геолокация
3. Проверьте подключение к интернету

## Дополнительные настройки

### Изменение начальной области
```typescript
initialRegion={{
  latitude: 52.5765,    // Широта Downham Market
  longitude: 0.3920,    // Долгота Downham Market
  latitudeDelta: 0.05,  // Зум (меньше = ближе)
  longitudeDelta: 0.05, // Зум (меньше = ближе)
}}
```

### Добавление новых маркеров
```typescript
{locations.map((location) => (
  <Marker
    key={location.id}
    coordinate={location.coordinates}
    onPress={() => handleMarkerPress(location)}
    title={location.title}
    description={location.description}
  >
    <View style={styles.marker}>
      <Text style={styles.markerEmoji}>
        {location.category === 'peace' ? '🌿' : 
         location.category === 'history' ? '🏰' : '🎉'}
      </Text>
    </View>
  </Marker>
))}
```

