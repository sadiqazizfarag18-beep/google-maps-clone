# دليل التخصيص 🎨

## تغيير الألوان

عدّل في `styles.css`:
```css
:root {
    --primary-color: #1f2937;
    --secondary-color: #3b82f6;
    --accent-color: #ef4444;
}
```

## تغيير الموقع الافتراضي

عدّل في `config.js`:
```javascript
map: {
    defaultCenter: [24.7136, 46.6753], // Riyadh
    defaultZoom: 13
}
```

## تغيير النص والرسائل

عدّل في `config.js`:
```javascript
messages: {
    searchEmpty: 'النص الجديد',
    searchNoResults: 'النص الجديد'
}
```

## إضافة ميزات جديدة

1. أضف الـ HTML في `index.html`
2. أضف الـ CSS في `styles.css`
3. أضف الـ JavaScript في `script.js`
