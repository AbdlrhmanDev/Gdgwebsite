// طرق التسجيل المختلفة في الفعاليات

export type RegistrationMethod = 
  | 'internal'        // التسجيل المباشر داخل الموقع
  | 'google-form'     // Google Forms
  | 'typeform'        // Typeform
  | 'microsoft-form'  // Microsoft Forms
  | 'external-link'   // رابط خارجي مخصص
  | 'email';          // عبر البريد الإلكتروني

export interface RegistrationConfig {
  method: RegistrationMethod;
  url?: string;                    // للروابط الخارجية
  formId?: string;                 // معرف النموذج
  emailTemplate?: string;          // قالب البريد
  requiresApproval?: boolean;      // يحتاج موافقة
  customFields?: CustomField[];    // حقول إضافية
  autoConfirm?: boolean;          // تأكيد تلقائي
  redirectAfterSubmit?: string;   // إعادة توجيه بعد التسجيل
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: string[];  // للـ select
  placeholder?: string;
  validation?: string; // regex للتحقق
}

// أمثلة على التكوينات

export const internalRegistration: RegistrationConfig = {
  method: 'internal',
  autoConfirm: true,
  requiresApproval: false,
  customFields: [
    {
      id: 'dietary',
      label: 'قيود غذائية',
      type: 'select',
      required: false,
      options: ['لا يوجد', 'نباتي', 'حساسية معينة', 'أخرى']
    },
    {
      id: 'experience',
      label: 'مستوى الخبرة',
      type: 'select',
      required: true,
      options: ['مبتدئ', 'متوسط', 'متقدم', 'خبير']
    }
  ]
};

export const googleFormRegistration: RegistrationConfig = {
  method: 'google-form',
  url: 'https://forms.gle/YOUR_FORM_ID',
  formId: 'YOUR_FORM_ID',
  requiresApproval: true,
  autoConfirm: false,
  redirectAfterSubmit: '/events/thank-you'
};

export const typeformRegistration: RegistrationConfig = {
  method: 'typeform',
  url: 'https://form.typeform.com/to/YOUR_FORM_ID',
  formId: 'YOUR_FORM_ID',
  autoConfirm: false
};

export const emailRegistration: RegistrationConfig = {
  method: 'email',
  emailTemplate: 'registration-request',
  requiresApproval: true,
  autoConfirm: false
};

// دوال مساعدة

export const getRegistrationUrl = (config: RegistrationConfig, eventId: string, userId?: string): string => {
  switch (config.method) {
    case 'google-form':
      // يمكن إضافة معاملات مسبقة الملء
      return `${config.url}?entry.email=${userId || ''}&entry.event_id=${eventId}`;
    
    case 'typeform':
      return `${config.url}#email=${userId || ''}&event_id=${eventId}`;
    
    case 'microsoft-form':
      return config.url || '#';
    
    case 'external-link':
      return config.url || '#';
    
    case 'email':
      return `mailto:gdg@mustaqbal.edu?subject=التسجيل في الفعالية ${eventId}`;
    
    case 'internal':
    default:
      return '#'; // يتم التعامل معه داخل التطبيق
  }
};

export const getRegistrationButtonText = (method: RegistrationMethod, lang: 'ar' | 'en' = 'ar'): string => {
  const texts = {
    ar: {
      'internal': 'سجل الآن',
      'google-form': 'املأ النموذج',
      'typeform': 'املأ النموذج',
      'microsoft-form': 'املأ النموذج',
      'external-link': 'سجل عبر الرابط',
      'email': 'سجل عبر البريد'
    },
    en: {
      'internal': 'Register Now',
      'google-form': 'Fill Form',
      'typeform': 'Fill Form',
      'microsoft-form': 'Fill Form',
      'external-link': 'Register via Link',
      'email': 'Register via Email'
    }
  };
  
  return texts[lang][method];
};

export const getRegistrationMethodIcon = (method: RegistrationMethod): string => {
  const icons = {
    'internal': '✓',
    'google-form': '📝',
    'typeform': '📋',
    'microsoft-form': '📄',
    'external-link': '🔗',
    'email': '📧'
  };
  
  return icons[method];
};

export const getRegistrationMethodDescription = (method: RegistrationMethod, lang: 'ar' | 'en' = 'ar'): string => {
  const descriptions = {
    ar: {
      'internal': 'التسجيل المباشر في الموقع - سريع وسهل',
      'google-form': 'املأ نموذج Google - يتطلب حساب Google',
      'typeform': 'نموذج تفاعلي جميل - تجربة أفضل',
      'microsoft-form': 'نموذج Microsoft Forms',
      'external-link': 'التسجيل عبر رابط خارجي',
      'email': 'أرسل طلب تسجيل عبر البريد الإلكتروني'
    },
    en: {
      'internal': 'Direct registration on site - fast and easy',
      'google-form': 'Fill Google Form - requires Google account',
      'typeform': 'Beautiful interactive form - better experience',
      'microsoft-form': 'Microsoft Forms',
      'external-link': 'Register via external link',
      'email': 'Send registration request via email'
    }
  };
  
  return descriptions[lang][method];
};
