// ===============================
// CONFIGURATION FILE
// ===============================

const APP_CONFIG = {
    name: 'Maps Clone',
    version: '1.0.0',
    description: 'تطبيق خريطة متقدم يشبه Google Maps',

    map: {
        defaultCenter: [24.7136, 46.6753],
        defaultZoom: 13,
        maxZoom: 19,
        minZoom: 2
    },

    search: {
        minChars: 2,
        maxResults: 5,
        debounceDelay: 300
    },

    geolocation: {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 300000
    },

    storage: {
        favoritesKey: 'mapFavorites',
        styleKey: 'mapStyle',
        settingsKey: 'mapSettings'
    },

    colors: {
        primary: '#1f2937',
        secondary: '#3b82f6',
        accent: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
        info: '#3b82f6'
    },

    mapStyles: {
        light: {
            name: 'فاتح',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; OpenStreetMap contributors'
        },
        dark: {
            name: 'داكن',
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }
    },

    markers: {
        current: {
            color: 'blue',
            icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'
        },
        selected: {
            color: 'red',
            icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        },
        favorite: {
            color: 'green',
            icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
        }
    },

    messages: {
        searchEmpty: 'الرجاء إدخال اسم مكان',
        searchNoResults: 'لم يتم العثور على نتائج',
        searchError: 'حدث خطأ في البحث',
        locationFound: 'تم تحديد موقعك بنجاح',
        locationError: 'لم يتم إمكانية تحديد الموقع',
        addedToFavorites: 'تم حفظ في المفضلة ✓',
        removedFromFavorites: 'تم حذف من المفضلة',
        routeCalculated: 'تم حساب المسار'
    }
};

const API_ENDPOINTS = {
    nominatim: {
        search: 'https://nominatim.openstreetmap.org/search',
        reverse: 'https://nominatim.openstreetmap.org/reverse',
        format: 'json'
    },

    routing: {
        base: 'https://api.openrouteservice.org/v2/directions',
        profiles: {
            car: 'driving-car',
            bike: 'cycling-regular',
            pedestrian: 'foot-walking'
        }
    }
};

function saveSettings(key, value) {
    try {
        localStorage.setItem(APP_CONFIG.storage.settingsKey + '_' + key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving settings:', error);
        return false;
    }
}

function getSettings(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(APP_CONFIG.storage.settingsKey + '_' + key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error('Error getting settings:', error);
        return defaultValue;
    }
}

function deleteSettings(key) {
    try {
        localStorage.removeItem(APP_CONFIG.storage.settingsKey + '_' + key);
        return true;
    } catch (error) {
        console.error('Error deleting settings:', error);
        return false;
    }
}

function getMessage(key) {
    return APP_CONFIG.messages[key] || 'حدث خطأ غير معروف';
}

function getColor(type) {
    return APP_CONFIG.colors[type] || APP_CONFIG.colors.primary;
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
}

function formatTime(minutes) {
    if (minutes < 60) {
        return minutes + ' د��يقة';
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours + ' ساعة ' + (mins > 0 ? mins + ' دقيقة' : '');
}

function formatDistance(km) {
    if (km < 1) {
        return (km * 1000).toFixed(0) + ' متر';
    }
    return km + ' كم';
}

function checkFeatures() {
    const features = {
        geolocation: 'geolocation' in navigator,
        localStorage: typeof(Storage) !== 'undefined',
        offline: navigator.onLine
    };
    return features;
}

console.log('Maps Clone v' + APP_CONFIG.version + ' - Configuration Loaded ✓');