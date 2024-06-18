const ar = {
  onboarding: {
    message: 'مرحبا بكم في موقع تطبيق obytes',
  },
  settings: {
    about: 'حول التطبيق ',
    app_name: 'اسم التطبيق',
    arabic: 'عربي',
    english: 'إنجليزي',
    generale: 'عام',
    github: 'جيثب',
    language: 'لغة',
    links: 'الروابط',
    logout: 'تسجيل خروج',
    more: 'أكثر',
    privacy: 'سياسة الخصوصية',
    rate: 'تقييم',
    share: 'شارك',
    support: 'الدعم',
    support_us: 'ادعمنا',
    terms: 'شروط الخدمة',
    theme: {
      dark: 'مظلم',
      light: 'خفيفة',
      system: 'System',
      title: 'سمة',
    },
    title: 'إعدادات',
    version: 'إصدار',
    website: 'موقع الكتروني',
  },
  welcome: 'test arabic',
};

const en = {
  onboarding: {
    message: 'Welcome to obytes app site',
  },
  settings: {
    about: 'About',
    app_name: 'App Name',
    arabic: 'Arabic',
    english: 'English',
    generale: 'General',
    github: 'Github',
    language: 'Language',
    links: 'Links',
    logout: 'Logout',
    more: 'More',
    privacy: 'Privacy Policy',
    rate: 'Rate',
    share: 'Share',
    support: 'Support',
    support_us: 'Support Us',
    terms: 'Terms of Service',
    theme: {
      dark: 'Dark',
      light: 'Light',
      system: 'System',
      title: 'Theme',
    },
    title: 'Settings',
    version: 'Version',
    website: 'Website',
  },
  welcome: 'Welcome to obytes app site',
};

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export type Language = keyof typeof resources;
