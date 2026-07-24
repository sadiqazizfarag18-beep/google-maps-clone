# دليل استخدام API 🔌

## Nominatim API (البحث)

### البحث عن مكان
```javascript
const query = 'برج الفيصل';
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
);
const results = await response.json();
```

### الحصول على معلومات الموقع
```javascript
const lat = 24.7136;
const lon = 46.6753;
const response = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
);
const place = await response.json();
```

## Geolocation API (الموقع)

### الحصول على الموقع الحالي
```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log('Lat:', latitude, 'Lon:', longitude);
  },
  (error) => {
    console.error('Error:', error);
  }
);
```

## LocalStorage (التخزين)

### حفظ البيانات
```javascript
const favorites = [{name: 'المكان', lat: 0, lon: 0}];
localStorage.setItem('mapFavorites', JSON.stringify(favorites));
```

### استرجاع البيانات
```javascript
const favorites = JSON.parse(localStorage.getItem('mapFavorites')) || [];
```
