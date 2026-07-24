# 🗺️ Maps Clone - تطبيق خريطة متقدم

تطبيق خريطة تفاعلي يشبه Google Maps، مبني باستخدام HTML5, CSS3, JavaScript و Leaflet.js

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

---

## ✨ الميزات

✅ **خريطة تفاعلية** - استخدام Leaflet.js مع OpenStreetMap
✅ **البحث عن الأماكن** - بحث قوي عن أي مكان في العالم
✅ **تحديد الموقع الحالي** - تحديد موقعك باستخدام GPS
✅ **المفضلة** - حفظ الأماكس المفضلة محليًا
✅ **حساب المسارات** - معلومات عن المسافة والوقت
✅ **أنماط خريطة متعددة** - نمط فاتح وداكن
✅ **واجهة سهلة الاستخدام** - تصميم عصري وسهل
✅ **دعم الموبايل** - تصميم متجاوب تماماً

---

## 🚀 البدء السريع

### 1️⃣ المتطلبات
- متصفح حديث (Chrome, Firefox, Safari, Edge)
- اتصال إنترنت
- لا توجد متطلبات تثبيت

### 2️⃣ التثبيت

```bash
# استنسخ المستودع
git clone https://github.com/sadiqazizfarag18-beep/google-maps-clone.git

# انتقل إلى المجلد
cd google-maps-clone

# افتح الملف في المتصفح
open index.html
```

أو ببساطة افتح `index.html` مباشرة في متصفحك! 🌐

### 3️⃣ الاستخدام

1. **البحث عن مكان** 🔍
   - أدخل اسم المكان في شريط البحث
   - اضغط Enter أو اضغط زر البحث
   - اختر من النتائج

2. **تحديد موقعك** 📍
   - اضغط زر الموقع الأزرق في الأعلى
   - سيتم تحديد موقعك تلقائياً

3. **حفظ المفضلة** ❤️
   - اختر مكان
   - اضغط "حفظ"
   - سيتم حفظه محليًا

4. **حساب المسار** 🚗
   - اختر وجهة
   - اضغط "احصل على المسار"
   - سيظهر المسار والمدة المتوقعة

---

## 📁 هيكل المشروع

```
google-maps-clone/
├── index.html           # الملف الرئيسي
├── styles.css           # أنماط CSS
├── script.js            # منطق JavaScript
├── config.js            # إعدادات التطبيق
├── README.md            # التوثيق
└── assets/              # الصور والموارد
    └── icons/          # أيقونات التطبيق
```

---

## 🛠️ التقنيات المستخدمة

| التقنية | الوصف |
|---------|-------|
| **HTML5** | بناء الهيكل |
| **CSS3** | التصميم والتنسيق |
| **JavaScript** | منطق التطبيق |
| **Leaflet.js** | مكتبة الخرائط |
| **OpenStreetMap** | مصدر بيانات الخريطة |
| **Nominatim API** | محرك البحث الجغرافي |
| **Geolocation API** | تحديد الموقع |
| **LocalStorage** | تخزين البيانات |

---

## 📖 دليل الاستخدام التفصيلي

### البحث عن الأماكس 🔍

```javascript
// البحث يتم تلقائياً عند إدخال اسم المكان
// يدعم الأسماء بالعربية والإنجليزية
// مثال: "برج الفيصل" أو "Eiffel Tower"
```

### تحديد الموقع الحالي 📍

```javascript
// استخدام Geolocation API
// يطلب إذن من المستخدم
// يحفظ الموقع تلقائياً
```

### حفظ المفضلة 💾

```javascript
// البيانات تُحفظ محليًا في LocalStorage
// تبقى المفضلة حتى بعد إغلاق المتصفح
// يمكن حذفها في أي وقت
```

---

## ⚙️ الإعدادات

يمكنك تخصيص التطبيق من خلال `config.js`:

```javascript
// المدينة الافتراضية عند الفتح
DEFAULT_CENTER: [24.7136, 46.6753]

// مستوى التكبير الافتراضي
DEFAULT_ZOOM: 13

// اللغة الافتراضية
DEFAULT_LANGUAGE: 'ar'
```

---

## 🌐 واجهات API المستخدمة

### 1. Nominatim (OpenStreetMap)
- **الغرض**: البحث عن الأماكس
- **الرابط**: `https://nominatim.openstreetmap.org/search`
- **بدون تفويض**: لا يتطلب مفتاح API

### 2. Geolocation API
- **الغرض**: تحديد الموقع الحالي
- **المتصفح**: مدعوم في جميع المتصفحات الحديثة

### 3. LocalStorage
- **الغرض**: حفظ المفضلة
- **التخزين**: محلي على الجهاز

---

## 📱 التوافقية

| المتصفح | الإصدار | التوافق |
|---------|---------|---------|
| Chrome | 90+ | ✅ كامل |
| Firefox | 88+ | ✅ كامل |
| Safari | 14+ | ✅ كامل |
| Edge | 90+ | ✅ كامل |
| Opera | 76+ | ✅ كامل |

---

## 🎨 الألوان والأنماط

### الألوان الأساسية

```css
--primary-color: #1f2937    /* رمادي داكن */
--secondary-color: #3b82f6  /* أزرق */
--accent-color: #ef4444     /* أحمر */
```

### الأنماط المتاحة

1. **نمط فاتح** (Light) - الافتراضي
2. **نمط داكن** (Dark) - اقتصادي للبطارية

---

## 🔐 الأمان والخصوصية

✅ **بدون تتبع** - التطبيق لا يجمع أي بيانات شخصية
✅ **بدون إعلانات** - تطبيق نظيف وخالي من الإزعاج
✅ **مفتوح المصدر** - يمكنك مراجعة جميع الأكواد
✅ **محلي تماماً** - البيانات تُحفظ محليًا فقط

---

## 🐛 حل المشاكل

### المشكلة: الخريطة لا تظهر
**الحل**: تأكد من اتصال الإنترنت وعدم حجب Leaflet و OpenStreetMap

### المشكلة: البحث لا يعمل
**الحل**: قد يكون هناك تأخير في الاتصال، جرب مرة أخرى

### المشكلة: الموقع الحالي لا يظهر
**الحل**: تأكد من منح إذن الموقع للمتصفح

### المشكلة: المفضلة لم تُحفظ
**الحل**: تأكد من عدم حظر LocalStorage

---

## 🚀 التحسينات المستقبلية

- [ ] دعم التنقيب عن الطرق (Routing Engine)
- [ ] عرض المطاعم والمتاجر القريبة
- [ ] المشاركة عبر وسائل التواصل
- [ ] التنبيهات والتذكيرات
- [ ] الوضع بدون إنترنت (Offline Mode)
- [ ] دعم لغات إضافية
- [ ] تطبيق موبايل (React Native/Flutter)

---

## 👨‍💻 المساهمة

نرحب بمساهمتك! للمساهمة:

1. Fork المستودع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 الترخيص

هذا المشروع مرخص تحت MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

## 💬 التواصل والدعم

- **GitHub Issues**: [فتح issue جديد](https://github.com/sadiqazizfarag18-beep/google-maps-clone/issues)
- **البريد الإلكتروني**: sadiqazizfarag18@gmail.com
- **Twitter**: [@sadiq_dev](https://twitter.com/sadiq_dev)

---

## 📊 الإحصائيات

- ⭐ Stars: سيتم التحديث
- 🍴 Forks: سيتم التحديث
- 👁️ Watchers: سيتم التحديث
- 📦 Size: ~50KB
- ⚡ Load Time: < 2 seconds

---

## 🎓 تعليمات للمبتدئين

### فهم الكود

1. **HTML** - قراءة `index.html`
   - القسم العلوي (Top Bar)
   - الخريطة (Map Container)
   - الشريط الجانبي (Sidebar)

2. **CSS** - قراءة `styles.css`
   - المتغيرات الأساسية (Variables)
   - التخطيط (Layout)
   - الاستجابة (Responsive)

3. **JavaScript** - قراءة `script.js`
   - تهيئة الخريطة (Initialization)
   - معالجة الأحداث (Events)
   - التفاعلات (Interactions)

---

## 📚 موارد إضافية

- [Leaflet Documentation](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Nominatim API](https://nominatim.org/)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)

---

## 🙏 شكر وتقدير

شكراً لاستخدام Maps Clone! إذا أعجبك المشروع، لا تنسى إعطاؤه ⭐

---

**صُنع بـ ❤️ من قِبل [Sadiq Aziz Farag](https://github.com/sadiqazizfarag18-beep)**

**آخر تحديث**: 24 يوليو 2026
