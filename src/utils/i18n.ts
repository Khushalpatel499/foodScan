/**
 * Lightweight i18n utility.
 * Pure functions — no React, no external library.
 * Add new languages by adding a new translations object.
 */

export type Locale = 'en' | 'hi' | 'es' | 'fr';

export interface Translations {
  // App
  appName: string;
  appTagline: string;

  // Navigation
  navScan: string;
  navSearch: string;
  navCompare: string;
  navHistory: string;
  navFavorites: string;
  navSettings: string;

  // Scan page
  scanTitle: string;
  scanSubtitle: string;
  scanButton: string;
  stopScanner: string;
  orManually: string;
  enterBarcode: string;
  search: string;
  scanAnother: string;

  // Product
  healthScore: string;
  healthy: string;
  moderate: string;
  avoid: string;
  allergens: string;
  nutritionPer100g: string;
  ingredients: string;
  tapToLearn: string;
  readAloud: string;
  share: string;
  generating: string;
  shared: string;
  healthierAlternatives: string;
  findingOptions: string;

  // Health insights
  veryHighSugar: string;
  highSugar: string;
  highSatFat: string;
  highSalt: string;
  goodProfile: string;
  considerAlternatives: string;

  // Nutrition labels
  calories: string;
  fat: string;
  sugars: string;
  salt: string;
  protein: string;
  fiber: string;

  // History
  historyTitle: string;
  noHistory: string;
  clearAll: string;
  swipeToDelete: string;

  // Favorites
  favoritesTitle: string;
  noFavorites: string;
  swipeToRemove: string;

  // Search
  searchTitle: string;
  searchPlaceholder: string;
  typeToSearch: string;
  noResults: string;

  // Compare
  compareTitle: string;
  compareSubtitle: string;
  productA: string;
  productB: string;
  reset: string;
  winner: string;
  tie: string;
  winsBy: string;
  orPickHistory: string;
  visualComparison: string;

  // Settings
  settingsTitle: string;
  darkMode: string;
  darkModeDesc: string;
  language: string;
  languageDesc: string;
  productsScanned: string;
  favorites: string;
  about: string;
  aboutDesc: string;

  // Common
  startScanning: string;
  productNotFound: string;
  networkError: string;
  tryAgain: string;
  cameraDenied: string;

  // Onboarding
  onboardSkip: string;
  onboardNext: string;
  onboardStart: string;
  onboard1Title: string;
  onboard1Desc: string;
  onboard2Title: string;
  onboard2Desc: string;
  onboard3Title: string;
  onboard3Desc: string;
}

const en: Translations = {
  appName: 'FoodScan',
  appTagline: 'Scan a barcode to get instant health insights',
  navScan: 'Scan',
  navSearch: 'Search',
  navCompare: 'Compare',
  navHistory: 'History',
  navFavorites: 'Favorites',
  navSettings: 'Settings',
  scanTitle: 'FoodScan',
  scanSubtitle: 'Scan a barcode to get instant health insights',
  scanButton: 'Scan Barcode',
  stopScanner: 'Stop Scanner',
  orManually: 'or enter manually',
  enterBarcode: 'Enter barcode manually...',
  search: 'Search',
  scanAnother: '← Scan Another',
  healthScore: 'Health Score',
  healthy: 'Healthy',
  moderate: 'Moderate',
  avoid: 'Avoid',
  allergens: 'Allergens',
  nutritionPer100g: 'Nutrition per 100g',
  ingredients: 'Ingredients',
  tapToLearn: '(tap to learn)',
  readAloud: '🔊 Read Aloud',
  share: '📤 Share',
  generating: '⏳ Generating...',
  shared: '✅ Shared!',
  healthierAlternatives: '🌿 Healthier Alternatives',
  findingOptions: 'Finding healthier options...',
  veryHighSugar: '⚠️ Very high sugar content',
  highSugar: '⚠️ High sugar content',
  highSatFat: '⚠️ High in saturated fat',
  highSalt: '⚠️ High salt content',
  goodProfile: '✅ Good nutritional profile',
  considerAlternatives: '🚫 Consider healthier alternatives',
  calories: 'Calories',
  fat: 'Fat',
  sugars: 'Sugars',
  salt: 'Salt',
  protein: 'Protein',
  fiber: 'Fiber',
  historyTitle: 'History',
  noHistory: 'No scan history yet',
  clearAll: 'Clear All',
  swipeToDelete: '← Swipe left to delete',
  favoritesTitle: 'Favorites',
  noFavorites: 'No favorites yet',
  swipeToRemove: '← Swipe left to remove',
  searchTitle: 'Search Products',
  searchPlaceholder: 'Search by product name...',
  typeToSearch: 'Type at least 2 characters to search',
  noResults: 'No products found for',
  compareTitle: 'Compare Products',
  compareSubtitle: 'Select two products to compare side-by-side',
  productA: 'Product A',
  productB: 'Product B',
  reset: '↻ Reset',
  winner: '🏆',
  tie: "🤝 It's a tie!",
  winsBy: 'wins by',
  orPickHistory: 'Or pick from history',
  visualComparison: 'Visual Comparison',
  settingsTitle: 'Settings',
  darkMode: 'Dark Mode',
  darkModeDesc: 'Easier on the eyes at night',
  language: 'Language',
  languageDesc: 'Choose your preferred language',
  productsScanned: 'Products Scanned',
  favorites: 'Favorites',
  about: 'About FoodScan',
  aboutDesc: 'A free, open-source food scanner that helps you make healthier choices. Data powered by Open Food Facts.',
  startScanning: 'Start Scanning',
  productNotFound: 'Product not found. Try manual entry.',
  networkError: 'Network error. Please check your connection.',
  tryAgain: 'Try Again',
  cameraDenied: 'Camera permission denied. Please allow camera access.',
  onboardSkip: 'Skip',
  onboardNext: 'Next',
  onboardStart: 'Get Started 🚀',
  onboard1Title: 'Scan Any Barcode',
  onboard1Desc: 'Point your camera at any food product barcode to instantly get health insights',
  onboard2Title: 'Know What You Eat',
  onboard2Desc: 'Get a health score, allergen warnings, and ingredient explanations for every product',
  onboard3Title: 'Make Better Choices',
  onboard3Desc: 'Compare products, find healthier alternatives, and track your food habits',
};

const hi: Translations = {
  appName: 'FoodScan',
  appTagline: 'तुरंत स्वास्थ्य जानकारी के लिए बारकोड स्कैन करें',
  navScan: 'स्कैन',
  navSearch: 'खोजें',
  navCompare: 'तुलना',
  navHistory: 'इतिहास',
  navFavorites: 'पसंदीदा',
  navSettings: 'सेटिंग्स',
  scanTitle: 'FoodScan',
  scanSubtitle: 'तुरंत स्वास्थ्य जानकारी के लिए बारकोड स्कैन करें',
  scanButton: 'बारकोड स्कैन करें',
  stopScanner: 'स्कैनर बंद करें',
  orManually: 'या मैन्युअल दर्ज करें',
  enterBarcode: 'बारकोड मैन्युअल दर्ज करें...',
  search: 'खोजें',
  scanAnother: '← दूसरा स्कैन करें',
  healthScore: 'स्वास्थ्य स्कोर',
  healthy: 'स्वस्थ',
  moderate: 'मध्यम',
  avoid: 'बचें',
  allergens: 'एलर्जी',
  nutritionPer100g: 'पोषण प्रति 100g',
  ingredients: 'सामग्री',
  tapToLearn: '(जानने के लिए टैप करें)',
  readAloud: '🔊 पढ़ें',
  share: '📤 शेयर',
  generating: '⏳ बना रहे हैं...',
  shared: '✅ शेयर हुआ!',
  healthierAlternatives: '🌿 स्वस्थ विकल्प',
  findingOptions: 'स्वस्थ विकल्प खोज रहे हैं...',
  veryHighSugar: '⚠️ बहुत अधिक चीनी',
  highSugar: '⚠️ अधिक चीनी',
  highSatFat: '⚠️ अधिक संतृप्त वसा',
  highSalt: '⚠️ अधिक नमक',
  goodProfile: '✅ अच्छा पोषण प्रोफ़ाइल',
  considerAlternatives: '🚫 स्वस्थ विकल्प चुनें',
  calories: 'कैलोरी',
  fat: 'वसा',
  sugars: 'चीनी',
  salt: 'नमक',
  protein: 'प्रोटीन',
  fiber: 'फाइबर',
  historyTitle: 'इतिहास',
  noHistory: 'अभी तक कोई स्कैन इतिहास नहीं',
  clearAll: 'सब हटाएं',
  swipeToDelete: '← हटाने के लिए स्वाइप करें',
  favoritesTitle: 'पसंदीदा',
  noFavorites: 'अभी तक कोई पसंदीदा नहीं',
  swipeToRemove: '← हटाने के लिए स्वाइप करें',
  searchTitle: 'उत्पाद खोजें',
  searchPlaceholder: 'उत्पाद का नाम खोजें...',
  typeToSearch: 'खोजने के लिए कम से कम 2 अक्षर टाइप करें',
  noResults: 'कोई उत्पाद नहीं मिला',
  compareTitle: 'उत्पाद तुलना',
  compareSubtitle: 'तुलना के लिए दो उत्पाद चुनें',
  productA: 'उत्पाद A',
  productB: 'उत्पाद B',
  reset: '↻ रीसेट',
  winner: '🏆',
  tie: '🤝 बराबरी!',
  winsBy: 'अंकों से जीता',
  orPickHistory: 'या इतिहास से चुनें',
  visualComparison: 'दृश्य तुलना',
  settingsTitle: 'सेटिंग्स',
  darkMode: 'डार्क मोड',
  darkModeDesc: 'रात में आंखों के लिए आसान',
  language: 'भाषा',
  languageDesc: 'अपनी पसंदीदा भाषा चुनें',
  productsScanned: 'स्कैन किए गए उत्पाद',
  favorites: 'पसंदीदा',
  about: 'FoodScan के बारे में',
  aboutDesc: 'एक मुफ्त, ओपन-सोर्स फूड स्कैनर जो आपको स्वस्थ विकल्प चुनने में मदद करता है।',
  startScanning: 'स्कैन शुरू करें',
  productNotFound: 'उत्पाद नहीं मिला। मैन्युअल प्रविष्टि आज़माएं।',
  networkError: 'नेटवर्क त्रुटि। कृपया कनेक्शन जांचें।',
  tryAgain: 'पुनः प्रयास करें',
  cameraDenied: 'कैमरा अनुमति अस्वीकृत। कृपया कैमरा एक्सेस दें।',
  onboardSkip: 'छोड़ें',
  onboardNext: 'अगला',
  onboardStart: 'शुरू करें 🚀',
  onboard1Title: 'कोई भी बारकोड स्कैन करें',
  onboard1Desc: 'तुरंत स्वास्थ्य जानकारी पाने के लिए किसी भी खाद्य उत्पाद के बारकोड पर कैमरा लगाएं',
  onboard2Title: 'जानें आप क्या खा रहे हैं',
  onboard2Desc: 'हर उत्पाद के लिए स्वास्थ्य स्कोर, एलर्जी चेतावनी और सामग्री विवरण पाएं',
  onboard3Title: 'बेहतर विकल्प चुनें',
  onboard3Desc: 'उत्पादों की तुलना करें, स्वस्थ विकल्प खोजें और अपनी खाद्य आदतों को ट्रैक करें',
};

const es: Translations = {
  appName: 'FoodScan',
  appTagline: 'Escanea un código de barras para obtener información de salud',
  navScan: 'Escanear',
  navSearch: 'Buscar',
  navCompare: 'Comparar',
  navHistory: 'Historial',
  navFavorites: 'Favoritos',
  navSettings: 'Ajustes',
  scanTitle: 'FoodScan',
  scanSubtitle: 'Escanea un código de barras para obtener información de salud',
  scanButton: 'Escanear Código',
  stopScanner: 'Detener Escáner',
  orManually: 'o ingresa manualmente',
  enterBarcode: 'Ingresa el código de barras...',
  search: 'Buscar',
  scanAnother: '← Escanear Otro',
  healthScore: 'Puntuación de Salud',
  healthy: 'Saludable',
  moderate: 'Moderado',
  avoid: 'Evitar',
  allergens: 'Alérgenos',
  nutritionPer100g: 'Nutrición por 100g',
  ingredients: 'Ingredientes',
  tapToLearn: '(toca para saber más)',
  readAloud: '🔊 Leer',
  share: '📤 Compartir',
  generating: '⏳ Generando...',
  shared: '✅ ¡Compartido!',
  healthierAlternatives: '🌿 Alternativas Más Saludables',
  findingOptions: 'Buscando opciones más saludables...',
  veryHighSugar: '⚠️ Contenido de azúcar muy alto',
  highSugar: '⚠️ Alto contenido de azúcar',
  highSatFat: '⚠️ Alto en grasas saturadas',
  highSalt: '⚠️ Alto contenido de sal',
  goodProfile: '✅ Buen perfil nutricional',
  considerAlternatives: '🚫 Considera alternativas más saludables',
  calories: 'Calorías',
  fat: 'Grasa',
  sugars: 'Azúcares',
  salt: 'Sal',
  protein: 'Proteína',
  fiber: 'Fibra',
  historyTitle: 'Historial',
  noHistory: 'Sin historial de escaneos',
  clearAll: 'Borrar Todo',
  swipeToDelete: '← Desliza para eliminar',
  favoritesTitle: 'Favoritos',
  noFavorites: 'Sin favoritos aún',
  swipeToRemove: '← Desliza para quitar',
  searchTitle: 'Buscar Productos',
  searchPlaceholder: 'Buscar por nombre...',
  typeToSearch: 'Escribe al menos 2 caracteres para buscar',
  noResults: 'No se encontraron productos para',
  compareTitle: 'Comparar Productos',
  compareSubtitle: 'Selecciona dos productos para comparar',
  productA: 'Producto A',
  productB: 'Producto B',
  reset: '↻ Reiniciar',
  winner: '🏆',
  tie: '🤝 ¡Empate!',
  winsBy: 'gana por',
  orPickHistory: 'O elige del historial',
  visualComparison: 'Comparación Visual',
  settingsTitle: 'Ajustes',
  darkMode: 'Modo Oscuro',
  darkModeDesc: 'Más fácil para los ojos de noche',
  language: 'Idioma',
  languageDesc: 'Elige tu idioma preferido',
  productsScanned: 'Productos Escaneados',
  favorites: 'Favoritos',
  about: 'Acerca de FoodScan',
  aboutDesc: 'Un escáner de alimentos gratuito y de código abierto que te ayuda a elegir opciones más saludables.',
  startScanning: 'Empezar a Escanear',
  productNotFound: 'Producto no encontrado. Intenta entrada manual.',
  networkError: 'Error de red. Verifica tu conexión.',
  tryAgain: 'Intentar de Nuevo',
  cameraDenied: 'Permiso de cámara denegado. Por favor permite el acceso.',
  onboardSkip: 'Omitir',
  onboardNext: 'Siguiente',
  onboardStart: '¡Empezar! 🚀',
  onboard1Title: 'Escanea Cualquier Código',
  onboard1Desc: 'Apunta tu cámara a cualquier código de barras de alimentos para obtener información de salud',
  onboard2Title: 'Conoce Lo Que Comes',
  onboard2Desc: 'Obtén puntuación de salud, alertas de alérgenos y explicación de ingredientes',
  onboard3Title: 'Elige Mejor',
  onboard3Desc: 'Compara productos, encuentra alternativas más saludables y rastrea tus hábitos',
};

const fr: Translations = {
  appName: 'FoodScan',
  appTagline: 'Scannez un code-barres pour des infos santé instantanées',
  navScan: 'Scanner',
  navSearch: 'Chercher',
  navCompare: 'Comparer',
  navHistory: 'Historique',
  navFavorites: 'Favoris',
  navSettings: 'Réglages',
  scanTitle: 'FoodScan',
  scanSubtitle: 'Scannez un code-barres pour des infos santé instantanées',
  scanButton: 'Scanner Code',
  stopScanner: 'Arrêter Scanner',
  orManually: 'ou entrez manuellement',
  enterBarcode: 'Entrez le code-barres...',
  search: 'Chercher',
  scanAnother: '← Scanner un Autre',
  healthScore: 'Score Santé',
  healthy: 'Sain',
  moderate: 'Modéré',
  avoid: 'À Éviter',
  allergens: 'Allergènes',
  nutritionPer100g: 'Nutrition pour 100g',
  ingredients: 'Ingrédients',
  tapToLearn: '(appuyez pour en savoir plus)',
  readAloud: '🔊 Lire',
  share: '📤 Partager',
  generating: '⏳ Génération...',
  shared: '✅ Partagé!',
  healthierAlternatives: '🌿 Alternatives Plus Saines',
  findingOptions: 'Recherche d\'options plus saines...',
  veryHighSugar: '⚠️ Teneur en sucre très élevée',
  highSugar: '⚠️ Teneur en sucre élevée',
  highSatFat: '⚠️ Riche en graisses saturées',
  highSalt: '⚠️ Teneur en sel élevée',
  goodProfile: '✅ Bon profil nutritionnel',
  considerAlternatives: '🚫 Envisagez des alternatives plus saines',
  calories: 'Calories',
  fat: 'Graisses',
  sugars: 'Sucres',
  salt: 'Sel',
  protein: 'Protéines',
  fiber: 'Fibres',
  historyTitle: 'Historique',
  noHistory: 'Pas encore d\'historique',
  clearAll: 'Tout Effacer',
  swipeToDelete: '← Glissez pour supprimer',
  favoritesTitle: 'Favoris',
  noFavorites: 'Pas encore de favoris',
  swipeToRemove: '← Glissez pour retirer',
  searchTitle: 'Rechercher des Produits',
  searchPlaceholder: 'Rechercher par nom...',
  typeToSearch: 'Tapez au moins 2 caractères pour chercher',
  noResults: 'Aucun produit trouvé pour',
  compareTitle: 'Comparer les Produits',
  compareSubtitle: 'Sélectionnez deux produits à comparer',
  productA: 'Produit A',
  productB: 'Produit B',
  reset: '↻ Réinitialiser',
  winner: '🏆',
  tie: '🤝 Égalité!',
  winsBy: 'gagne par',
  orPickHistory: 'Ou choisir dans l\'historique',
  visualComparison: 'Comparaison Visuelle',
  settingsTitle: 'Réglages',
  darkMode: 'Mode Sombre',
  darkModeDesc: 'Plus facile pour les yeux la nuit',
  language: 'Langue',
  languageDesc: 'Choisissez votre langue préférée',
  productsScanned: 'Produits Scannés',
  favorites: 'Favoris',
  about: 'À Propos de FoodScan',
  aboutDesc: 'Un scanner alimentaire gratuit et open-source qui vous aide à faire des choix plus sains.',
  startScanning: 'Commencer à Scanner',
  productNotFound: 'Produit non trouvé. Essayez l\'entrée manuelle.',
  networkError: 'Erreur réseau. Vérifiez votre connexion.',
  tryAgain: 'Réessayer',
  cameraDenied: 'Permission caméra refusée. Veuillez autoriser l\'accès.',
  onboardSkip: 'Passer',
  onboardNext: 'Suivant',
  onboardStart: 'Commencer 🚀',
  onboard1Title: 'Scannez N\'importe Quel Code',
  onboard1Desc: 'Pointez votre caméra vers n\'importe quel code-barres alimentaire pour des infos santé',
  onboard2Title: 'Sachez Ce Que Vous Mangez',
  onboard2Desc: 'Obtenez un score santé, des alertes allergènes et des explications d\'ingrédients',
  onboard3Title: 'Faites de Meilleurs Choix',
  onboard3Desc: 'Comparez les produits, trouvez des alternatives plus saines et suivez vos habitudes',
};

const translations: Record<Locale, Translations> = { en, hi, es, fr };

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
};

/** Get translations for a locale */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en;
}
