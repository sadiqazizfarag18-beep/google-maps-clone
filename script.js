// ===============================
// MAPS CLONE - MAIN JAVASCRIPT
// ===============================

// Global Variables
let map;
let currentMarker = null;
let selectedPlaceMarker = null;
let routePolyline = null;
let favorites = JSON.parse(localStorage.getItem('mapFavorites')) || [];
let mapStyle = localStorage.getItem('mapStyle') || 'light';

// Initialize Map on Page Load
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    loadFavorites();
});

// ===============================
// MAP INITIALIZATION
// ===============================

function initializeMap() {
    // إنشاء الخريطة
    map = L.map('map').setView([24.7136, 46.6753], 13); // Riyadh, Saudi Arabia

    // إضافة طبقة الخريطة
    if (mapStyle === 'dark') {
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            maxZoom: 19
        }).addTo(map);
    } else {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
    }

    // إضافة أيقونة موقعي
    document.getElementById('currentLocationBtn').addEventListener('click', getCurrentLocation);
}

// ===============================
// EVENT LISTENERS
// ===============================

function setupEventListeners() {
    // البحث
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // القائمة
    document.getElementById('menuBtn').addEventListener('click', openOptionsModal);

    // إغلاق الـ Modal
    const modal = document.getElementById('optionsModal');
    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================

async function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        showNotification('الرجاء إدخال اسم مكان', 'error');
        return;
    }

    showSearchLoading();

    try {
        // استخدام Nominatim API (مجاني وبدون مفتاح)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        
        if (!response.ok) throw new Error('خطأ في البحث');
        
        const results = await response.json();
        
        if (results.length === 0) {
            showNotification('لم يتم العثور على نتائج', 'error');
            return;
        }

        displaySearchResults(results);
        toggleSidebar();
    } catch (error) {
        console.error('Search Error:', error);
        showNotification('حدث خطأ في البحث، حاول مرة أخرى', 'error');
    }
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    results.forEach((result, index) => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result-item';
        resultElement.innerHTML = `
            <div class="result-name">${result.name}</div>
            <div class="result-address">${result.address_type}</div>
        `;
        resultElement.addEventListener('click', () => {
            selectPlace(result, index);
        });
        resultsContainer.appendChild(resultElement);
    });
}

function selectPlace(place, index) {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    // تحريك الخريطة إلى الموقع
    map.setView([lat, lon], 15);

    // إزالة العلم السابق
    if (selectedPlaceMarker) {
        map.removeLayer(selectedPlaceMarker);
    }

    // إضافة علم جديد
    selectedPlaceMarker = L.marker([lat, lon], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
    }).addTo(map);

    // عرض معلومات المكان
    displayPlaceInfo({
        name: place.name,
        address: place.display_name,
        lat: lat,
        lon: lon,
        type: place.type
    });

    // إخفاء قائمة البحث
    document.getElementById('searchResults').innerHTML = '';
}

function displayPlaceInfo(place) {
    const placeInfo = document.getElementById('placeInfo');
    document.getElementById('placeName').textContent = place.name;
    document.getElementById('placeAddress').textContent = place.address;
    
    // إضافة تقييم عشوائي للعرض (في التطبيق الحقيقي يأتي من API)
    const rating = (Math.random() * 2 + 3).toFixed(1);
    document.getElementById('placeRating').textContent = `⭐ ${rating}`;

    // معلومات افتراضية (يمكن استبدالها بـ API حقيقية)
    document.getElementById('placePhone').innerHTML = '<a href="tel:+966112222222">+966 11 2222 2222</a>';
    document.getElementById('placeWebsite').innerHTML = '<a href="#" target="_blank">website.com</a>';
    document.getElementById('placeHours').textContent = '09:00 - 22:00';

    // حفظ معلومات المكان الحالي
    window.currentPlace = place;

    placeInfo.style.display = 'block';

    // تحديث زر الحفظ
    updateSaveButton(place);
}

function updateSaveButton(place) {
    const saveBtn = document.getElementById('saveToFavorites');
    const isFavorite = favorites.some(fav => fav.name === place.name);
    
    if (isFavorite) {
        saveBtn.classList.add('saved');
        saveBtn.textContent = '❤️ محفوظ';
    } else {
        saveBtn.classList.remove('saved');
        saveBtn.textContent = '🤍 حفظ';
    }
}

// ===============================
// CURRENT LOCATION
// ===============================

function getCurrentLocation() {
    if (!navigator.geolocation) {
        showNotification('المتصفح لا يدعم تحديد الموقع', 'error');
        return;
    }

    showNotification('جاري تحديد موقعك...', 'info');

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            
            // تحريك الخريطة إلى الموقع الحالي
            map.setView([latitude, longitude], 15);

            // إزالة العلم السابق
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }

            // إضافة علم للموقع الحالي
            currentMarker = L.marker([latitude, longitude], {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                })
            }).addTo(map).bindPopup('📍 موقعك الحالي');

            showNotification('تم تحديد موقعك بنجاح', 'success');
        },
        (error) => {
            console.error('Geolocation Error:', error);
            showNotification('لم يتم إمكانية تحديد الموقع', 'error');
        }
    );
}

// ===============================
// FAVORITES
// ===============================

document.getElementById('saveToFavorites').addEventListener('click', function() {
    if (!window.currentPlace) return;

    const place = window.currentPlace;
    const index = favorites.findIndex(fav => fav.name === place.name);

    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('تم حذف من المفضلة', 'info');
    } else {
        favorites.push(place);
        showNotification('تم حفظ في المفضلة ✓', 'success');
    }

    localStorage.setItem('mapFavorites', JSON.stringify(favorites));
    updateSaveButton(place);
    loadFavorites();
});

function loadFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p style="color: #999; text-align: center;">لا توجد مفضلات بعد</p>';
        return;
    }

    favorites.forEach(fav => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            <div class="favorite-item-name">${fav.name}</div>
            <button class="favorite-remove" onclick="removeFavorite('${fav.name}')">✕</button>
        `;
        item.querySelector('.favorite-item-name').addEventListener('click', () => {
            selectPlace(fav, 0);
        });
        favoritesList.appendChild(item);
    });
}

function removeFavorite(placeName) {
    favorites = favorites.filter(fav => fav.name !== placeName);
    localStorage.setItem('mapFavorites', JSON.stringify(favorites));
    loadFavorites();
    showNotification('تم الحذف من المفضلة', 'info');
    if (window.currentPlace && window.currentPlace.name === placeName) {
        updateSaveButton(window.currentPlace);
    }
}

// ===============================
// DIRECTIONS
// ===============================

document.getElementById('getDirections').addEventListener('click', function() {
    if (!window.currentPlace) return;

    const destination = window.currentPlace;
    
    // محاكاة حساب المسافة والوقت
    const distance = (Math.random() * 15 + 1).toFixed(1);
    const duration = Math.ceil(distance * 2);

    const directionsInfo = `
        <div class="route-step">
            <div class="step-number">1</div>
            <div class="step-info">
                <div>تحرك نحو الشمال</div>
                <div class="step-distance">${distance} كم</div>
            </div>
        </div>
        <div class="route-step">
            <div class="step-number">2</div>
            <div class="step-info">
                <div>ستصل إلى الوجهة</div>
                <div class="step-distance">المدة المتوقعة: ${duration} دقيقة</div>
            </div>
        </div>
    `;

    document.getElementById('directionsInfo').innerHTML = directionsInfo;
    document.getElementById('bottomPanel').style.display = 'block';

    showNotification('تم حساب المسار', 'success');
});

function closeBottomPanel() {
    document.getElementById('bottomPanel').style.display = 'none';
}

// ===============================
// SIDEBAR TOGGLE
// ===============================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function toggleFavorites() {
    const favorites = document.getElementById('favorites');
    const searchResults = document.getElementById('searchResults');
    const placeInfo = document.getElementById('placeInfo');
    
    if (favorites.style.display === 'none') {
        favorites.style.display = 'block';
        searchResults.style.display = 'none';
        placeInfo.style.display = 'none';
        document.getElementById('optionsModal').style.display = 'none';
        toggleSidebar();
    } else {
        favorites.style.display = 'none';
    }
}

// ===============================
// OPTIONS MODAL
// ===============================

function openOptionsModal() {
    document.getElementById('optionsModal').style.display = 'block';
}

function changeMapStyle() {
    mapStyle = mapStyle === 'light' ? 'dark' : 'light';
    localStorage.setItem('mapStyle', mapStyle);
    location.reload();
}

function showAbout() {
    alert('🗺️ Maps Clone v1.0\n\nتطبيق خريطة متقدم يشبه Google Maps\n\n✨ الميزات:\n- البحث عن الأماكن\n- تحديد الموقع الحالي\n- حفظ المفضلة\n- حساب المسارات\n\n© 2024');
}

function clearAllData() {
    if (confirm('هل تريد حذف جميع البيانات المحفوظة؟')) {
        localStorage.clear();
        favorites = [];
        location.reload();
    }
}

// ===============================
// NOTIFICATIONS
// ===============================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        color: white;
        max-width: 300px;
    `;

    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showSearchLoading() {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">جاري البحث...</p>';
}

// ===============================
// CSS ANIMATIONS (injected)
// ===============================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
