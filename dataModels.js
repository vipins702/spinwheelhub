// Data Models and Local Storage Utilities
// COPPA-compliant - NO personal information stored

// Storage keys
const STORAGE_KEYS = {
  WHEELS: 'spinlearn_wheels',
  PROGRESS: 'spinlearn_progress', 
  SETTINGS: 'spinlearn_settings',
  PURCHASES: 'spinlearn_purchases'
};

// Default settings - privacy-first
const DEFAULT_SETTINGS = {
  sound: true,
  analytics: false, // Default OFF for privacy
  adPersonalizationDisabled: true, // Always true for COPPA compliance
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  parentalControlsEnabled: true
};

// Default purchases state
const DEFAULT_PURCHASES = {
  noAds: false,
  premiumWheels: false
};

// Wheel segment types
const SEGMENT_TYPES = {
  COLOR: 'color',
  NUMBER: 'number', 
  WORD: 'word',
  MATH: 'math',
  ACTION: 'action',
  QUIZ: 'quiz',
  CUSTOM: 'custom'
};

// Difficulty levels
const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium', 
  HARD: 'hard'
};

// Default wheel configurations
const DEFAULT_WHEELS = [
  {
    id: 'colors',
    name: 'Colors',
    icon: '🎨',
    description: 'Learn about colors',
    difficulty: DIFFICULTY_LEVELS.EASY,
    segments: [
      { id: 'red', label: 'Red', icon: '🔴', type: SEGMENT_TYPES.COLOR, color: '#FF5252' },
      { id: 'blue', label: 'Blue', icon: '🔵', type: SEGMENT_TYPES.COLOR, color: '#2196F3' },
      { id: 'green', label: 'Green', icon: '🟢', type: SEGMENT_TYPES.COLOR, color: '#4CAF50' },
      { id: 'yellow', label: 'Yellow', icon: '🟡', type: SEGMENT_TYPES.COLOR, color: '#FFEB3B' },
      { id: 'purple', label: 'Purple', icon: '🟣', type: SEGMENT_TYPES.COLOR, color: '#9C27B0' },
      { id: 'orange', label: 'Orange', icon: '🟠', type: SEGMENT_TYPES.COLOR, color: '#FF9800' },
      { id: 'pink', label: 'Pink', icon: '🩷', type: SEGMENT_TYPES.COLOR, color: '#E91E63' },
      { id: 'brown', label: 'Brown', icon: '🤎', type: SEGMENT_TYPES.COLOR, color: '#795548' }
    ],
    settings: {
      timeLimit: null,
      soundEnabled: true,
      showHints: true
    }
  },
  {
    id: 'counting',
    name: 'Counting',
    icon: '🔢',
    description: 'Practice numbers 1-10',
    difficulty: DIFFICULTY_LEVELS.EASY,
    segments: [
      { id: 'one', label: 'One', icon: '1️⃣', type: SEGMENT_TYPES.NUMBER, value: 1, color: '#FF5722' },
      { id: 'two', label: 'Two', icon: '2️⃣', type: SEGMENT_TYPES.NUMBER, value: 2, color: '#FF9800' },
      { id: 'three', label: 'Three', icon: '3️⃣', type: SEGMENT_TYPES.NUMBER, value: 3, color: '#FFC107' },
      { id: 'four', label: 'Four', icon: '4️⃣', type: SEGMENT_TYPES.NUMBER, value: 4, color: '#CDDC39' },
      { id: 'five', label: 'Five', icon: '5️⃣', type: SEGMENT_TYPES.NUMBER, value: 5, color: '#4CAF50' },
      { id: 'six', label: 'Six', icon: '6️⃣', type: SEGMENT_TYPES.NUMBER, value: 6, color: '#00BCD4' },
      { id: 'seven', label: 'Seven', icon: '7️⃣', type: SEGMENT_TYPES.NUMBER, value: 7, color: '#2196F3' },
      { id: 'eight', label: 'Eight', icon: '8️⃣', type: SEGMENT_TYPES.NUMBER, value: 8, color: '#9C27B0' }
    ],
    settings: {
      timeLimit: null,
      soundEnabled: true,
      showHints: true
    }
  },
  {
    id: 'words',
    name: 'Simple Words',
    icon: '📝',
    description: 'Learn simple words',
    difficulty: DIFFICULTY_LEVELS.EASY,
    segments: [
      { id: 'cat', label: 'Cat', icon: '🐱', type: SEGMENT_TYPES.WORD, color: '#FF5722' },
      { id: 'dog', label: 'Dog', icon: '🐶', type: SEGMENT_TYPES.WORD, color: '#FF9800' },
      { id: 'fish', label: 'Fish', icon: '🐠', type: SEGMENT_TYPES.WORD, color: '#2196F3' },
      { id: 'bird', label: 'Bird', icon: '🐦', type: SEGMENT_TYPES.WORD, color: '#4CAF50' },
      { id: 'sun', label: 'Sun', icon: '☀️', type: SEGMENT_TYPES.WORD, color: '#FFC107' },
      { id: 'moon', label: 'Moon', icon: '🌙', type: SEGMENT_TYPES.WORD, color: '#607D8B' },
      { id: 'star', label: 'Star', icon: '⭐', type: SEGMENT_TYPES.WORD, color: '#FFD700' },
      { id: 'tree', label: 'Tree', icon: '🌳', type: SEGMENT_TYPES.WORD, color: '#8BC34A' }
    ],
    settings: {
      timeLimit: null,
      soundEnabled: true,
      showHints: true
    }
  },
  {
    id: 'math',
    name: 'Simple Math',
    icon: '➕',
    description: 'Basic addition & subtraction',
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
    segments: [
      { id: 'add1', label: '1+1', icon: '➕', type: SEGMENT_TYPES.MATH, answer: 2, color: '#4CAF50' },
      { id: 'add2', label: '2+1', icon: '➕', type: SEGMENT_TYPES.MATH, answer: 3, color: '#8BC34A' },
      { id: 'add3', label: '2+2', icon: '➕', type: SEGMENT_TYPES.MATH, answer: 4, color: '#CDDC39' },
      { id: 'sub1', label: '3-1', icon: '➖', type: SEGMENT_TYPES.MATH, answer: 2, color: '#FF9800' },
      { id: 'sub2', label: '4-2', icon: '➖', type: SEGMENT_TYPES.MATH, answer: 2, color: '#FF5722' },
      { id: 'add4', label: '3+2', icon: '➕', type: SEGMENT_TYPES.MATH, answer: 5, color: '#2196F3' },
      { id: 'sub3', label: '5-1', icon: '➖', type: SEGMENT_TYPES.MATH, answer: 4, color: '#9C27B0' },
      { id: 'add5', label: '1+3', icon: '➕', type: SEGMENT_TYPES.MATH, answer: 4, color: '#E91E63' }
    ],
    settings: {
      timeLimit: 10, // 10 seconds for math
      soundEnabled: true,
      showHints: false
    }
  },
  {
    id: 'actions',
    name: 'Actions',
    icon: '🏃',
    description: 'Fun physical activities',
    difficulty: DIFFICULTY_LEVELS.EASY,
    segments: [
      { id: 'jump', label: 'Jump', icon: '🦘', type: SEGMENT_TYPES.ACTION, color: '#4CAF50' },
      { id: 'clap', label: 'Clap', icon: '👏', type: SEGMENT_TYPES.ACTION, color: '#FF9800' },
      { id: 'spin', label: 'Spin', icon: '🌪️', type: SEGMENT_TYPES.ACTION, color: '#2196F3' },
      { id: 'dance', label: 'Dance', icon: '💃', type: SEGMENT_TYPES.ACTION, color: '#E91E63' },
      { id: 'wave', label: 'Wave', icon: '👋', type: SEGMENT_TYPES.ACTION, color: '#9C27B0' },
      { id: 'march', label: 'March', icon: '🚶', type: SEGMENT_TYPES.ACTION, color: '#FF5722' },
      { id: 'stretch', label: 'Stretch', icon: '🧘', type: SEGMENT_TYPES.ACTION, color: '#8BC34A' },
      { id: 'wiggle', label: 'Wiggle', icon: '🐛', type: SEGMENT_TYPES.ACTION, color: '#FFC107' }
    ],
    settings: {
      timeLimit: 15, // 15 seconds for actions
      soundEnabled: true,
      showHints: true
    }
  }
];

// Local Storage Utilities with encryption support
class LocalStorageManager {
  constructor() {
    this.isSupported = this.checkSupport();
  }

  checkSupport() {
    try {
      const testKey = 'spinlearn_test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('LocalStorage not supported:', e);
      return false;
    }
  }

  // Simple encryption for local data (not cryptographically secure, just obfuscation)
  encrypt(data) {
    return btoa(JSON.stringify(data));
  }

  decrypt(encryptedData) {
    try {
      return JSON.parse(atob(encryptedData));
    } catch (e) {
      console.warn('Failed to decrypt data:', e);
      return null;
    }
  }

  get(key, defaultValue = null, encrypted = false) {
    if (!this.isSupported) return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      
      if (encrypted) {
        return this.decrypt(item) || defaultValue;
      }
      
      return JSON.parse(item);
    } catch (e) {
      console.warn(`Failed to get ${key} from localStorage:`, e);
      return defaultValue;
    }
  }

  set(key, value, encrypted = false) {
    if (!this.isSupported) return false;
    
    try {
      const dataToStore = encrypted ? this.encrypt(value) : JSON.stringify(value);
      localStorage.setItem(key, dataToStore);
      return true;
    } catch (e) {
      console.warn(`Failed to set ${key} in localStorage:`, e);
      return false;
    }
  }

  remove(key) {
    if (!this.isSupported) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn(`Failed to remove ${key} from localStorage:`, e);
      return false;
    }
  }

  clear() {
    if (!this.isSupported) return false;
    
    try {
      // Only clear our app's data
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (e) {
      console.warn('Failed to clear localStorage:', e);
      return false;
    }
  }
}

// Data Access Layer
class DataManager {
  constructor() {
    this.storage = new LocalStorageManager();
    this.initializeData();
  }

  initializeData() {
    // Initialize with default wheels if none exist
    const wheels = this.getWheels();
    if (!wheels || wheels.length === 0) {
      this.setWheels(DEFAULT_WHEELS);
    }

    // Initialize settings if none exist
    const settings = this.getSettings();
    if (!settings) {
      this.setSettings(DEFAULT_SETTINGS);
    }

    // Initialize purchases if none exist
    const purchases = this.getPurchases();
    if (!purchases) {
      this.setPurchases(DEFAULT_PURCHASES);
    }
  }

  // Wheels management
  getWheels() {
    return this.storage.get(STORAGE_KEYS.WHEELS, DEFAULT_WHEELS);
  }

  setWheels(wheels) {
    return this.storage.set(STORAGE_KEYS.WHEELS, wheels);
  }

  getWheel(wheelId) {
    const wheels = this.getWheels();
    return wheels.find(wheel => wheel.id === wheelId);
  }

  updateWheel(wheelId, updates) {
    const wheels = this.getWheels();
    const wheelIndex = wheels.findIndex(wheel => wheel.id === wheelId);
    
    if (wheelIndex !== -1) {
      wheels[wheelIndex] = { ...wheels[wheelIndex], ...updates };
      return this.setWheels(wheels);
    }
    return false;
  }

  addWheel(wheel) {
    const wheels = this.getWheels();
    const newWheel = {
      id: wheel.id || `custom_${Date.now()}`,
      ...wheel,
      createdAt: new Date().toISOString()
    };
    wheels.push(newWheel);
    return this.setWheels(wheels);
  }

  deleteWheel(wheelId) {
    const wheels = this.getWheels();
    const filteredWheels = wheels.filter(wheel => wheel.id !== wheelId);
    return this.setWheels(filteredWheels);
  }

  // Progress tracking (anonymous - no PII)
  getProgress() {
    return this.storage.get(STORAGE_KEYS.PROGRESS, []);
  }

  addProgress(wheelId, outcome) {
    const progress = this.getProgress();
    const entry = {
      id: `progress_${Date.now()}`,
      wheelId,
      date: new Date().toISOString().split('T')[0], // Date only, no time
      outcome, // 'success' or 'attempt'
      starsEarned: outcome === 'success' ? 1 : 0
    };
    
    progress.push(entry);
    
    // Keep only last 30 days of progress for privacy
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentProgress = progress.filter(entry => 
      new Date(entry.date) >= thirtyDaysAgo
    );
    
    return this.storage.set(STORAGE_KEYS.PROGRESS, recentProgress);
  }

  getProgressStats(wheelId = null) {
    const progress = this.getProgress();
    const filtered = wheelId ? 
      progress.filter(entry => entry.wheelId === wheelId) : 
      progress;
    
    return {
      totalSpins: filtered.length,
      totalStars: filtered.reduce((sum, entry) => sum + entry.starsEarned, 0),
      successRate: filtered.length > 0 ? 
        (filtered.filter(entry => entry.outcome === 'success').length / filtered.length) * 100 : 0
    };
  }

  // Settings management
  getSettings() {
    return this.storage.get(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  setSettings(settings) {
    return this.storage.set(STORAGE_KEYS.SETTINGS, { ...DEFAULT_SETTINGS, ...settings });
  }

  updateSetting(key, value) {
    const settings = this.getSettings();
    settings[key] = value;
    return this.setSettings(settings);
  }

  // Purchases management (for ad-free, etc.)
  getPurchases() {
    return this.storage.get(STORAGE_KEYS.PURCHASES, DEFAULT_PURCHASES, true); // Encrypted
  }

  setPurchases(purchases) {
    return this.storage.set(STORAGE_KEYS.PURCHASES, purchases, true); // Encrypted
  }

  updatePurchase(key, value) {
    const purchases = this.getPurchases();
    purchases[key] = value;
    return this.setPurchases(purchases);
  }

  // Analytics (anonymous only)
  logEvent(eventType, data = {}) {
    const settings = this.getSettings();
    if (!settings.analytics) return; // Respect user preference
    
    // Only log non-identifying aggregate data
    const event = {
      type: eventType,
      timestamp: Date.now(),
      data: {
        // Remove any potentially identifying information
        wheelType: data.wheelType,
        difficulty: data.difficulty,
        outcome: data.outcome,
        // NO user IDs, device IDs, or personal data
      }
    };
    
    // In a real app, this would send to analytics service
    // configured for COPPA compliance
    console.log('Analytics Event (Anonymous):', event);
  }

  // Data export for parents (behind parental gate)
  exportData() {
    return {
      wheels: this.getWheels(),
      progress: this.getProgressStats(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString(),
      // NO personal information included
    };
  }

  // Reset all data (behind parental gate)
  resetAllData() {
    return this.storage.clear();
  }
}

// Global data manager instance
window.dataManager = new DataManager();

// Export for use in other files
window.DataManager = DataManager;
window.SEGMENT_TYPES = SEGMENT_TYPES;
window.DIFFICULTY_LEVELS = DIFFICULTY_LEVELS;
window.DEFAULT_WHEELS = DEFAULT_WHEELS;