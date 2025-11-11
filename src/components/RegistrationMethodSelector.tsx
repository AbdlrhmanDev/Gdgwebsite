import { useState } from "react";
import { ExternalLink, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { 
  RegistrationMethod, 
  RegistrationConfig,
  getRegistrationMethodIcon,
  getRegistrationMethodDescription,
  internalRegistration,
  googleFormRegistration
} from "../lib/registration-methods";

interface RegistrationMethodSelectorProps {
  value: RegistrationConfig;
  onChange: (config: RegistrationConfig) => void;
}

export function RegistrationMethodSelector({ value, onChange }: RegistrationMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<RegistrationMethod>(value.method);

  const methods: Array<{
    id: RegistrationMethod;
    name: string;
    icon: string;
    description: string;
    color: string;
  }> = [
    {
      id: 'internal',
      name: 'التسجيل المباشر',
      icon: '✓',
      description: 'التسجيل داخل الموقع - سريع وسهل',
      color: '#4285f4'
    },
    {
      id: 'google-form',
      name: 'Google Forms',
      icon: '📝',
      description: 'نموذج Google - مرن ومتكامل',
      color: '#34a853'
    },
    {
      id: 'typeform',
      name: 'Typeform',
      icon: '📋',
      description: 'نموذج تفاعلي جميل',
      color: '#f9ab00'
    },
    {
      id: 'external-link',
      name: 'رابط خارجي',
      icon: '🔗',
      description: 'استخدم نظام تسجيل خارجي',
      color: '#ea4335'
    },
    {
      id: 'email',
      name: 'عبر البريد',
      icon: '📧',
      description: 'التسجيل عبر البريد الإلكتروني',
      color: '#9333ea'
    }
  ];

  const handleMethodChange = (method: RegistrationMethod) => {
    setSelectedMethod(method);
    
    // تطبيق الإعدادات الافتراضية حسب الطريقة
    let newConfig: RegistrationConfig;
    
    switch (method) {
      case 'google-form':
        newConfig = { ...googleFormRegistration };
        break;
      case 'internal':
        newConfig = { ...internalRegistration };
        break;
      default:
        newConfig = {
          method,
          url: '',
          autoConfirm: false,
          requiresApproval: true
        };
    }
    
    onChange(newConfig);
  };

  const handleUrlChange = (url: string) => {
    onChange({ ...value, url });
  };

  return (
    <div className="space-y-6">
      {/* اختيار الطريقة */}
      <div>
        <Label className="text-base mb-3 block">طريقة التسجيل</Label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {methods.map((method) => (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all border-2 ${
                selectedMethod === method.id
                  ? 'border-[#4285f4] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleMethodChange(method.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{method.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{method.name}</p>
                      {selectedMethod === method.id && (
                        <Check className="w-5 h-5 text-[#4285f4]" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{method.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* إعدادات إضافية حسب الطريقة */}
      {(selectedMethod === 'google-form' || 
        selectedMethod === 'typeform' || 
        selectedMethod === 'external-link') && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <Label htmlFor="registration-url">
              رابط {selectedMethod === 'google-form' ? 'Google Form' : 
                     selectedMethod === 'typeform' ? 'Typeform' : 'التسجيل'}
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="registration-url"
                type="url"
                value={value.url || ''}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={
                  selectedMethod === 'google-form' 
                    ? 'https://forms.gle/your-form-id'
                    : selectedMethod === 'typeform'
                    ? 'https://form.typeform.com/to/your-form-id'
                    : 'https://example.com/register'
                }
                dir="ltr"
              />
              {value.url && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(value.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {selectedMethod === 'google-form' && (
              <div className="mt-3 p-3 bg-blue-50 rounded text-sm space-y-2">
                <p className="font-medium text-[#4285f4]">💡 نصائح Google Forms:</p>
                <ul className="space-y-1 text-gray-700 mr-4">
                  <li>• استخدم الرابط المختصر (forms.gle) للسهولة</li>
                  <li>• فعّل "جمع عناوين البريد الإلكتروني" في الإعدادات</li>
                  <li>• أضف حقول: الاسم، البريد، الرقم الجامعي</li>
                  <li>• يمكنك ربط النموذج مع Google Sheets تلقائياً</li>
                </ul>
              </div>
            )}

            {selectedMethod === 'typeform' && (
              <div className="mt-3 p-3 bg-yellow-50 rounded text-sm">
                <p className="text-gray-700">
                  ℹ️ Typeform يوفر تجربة تفاعلية جميلة لكنه يحتاج اشتراك للمزايا المتقدمة
                </p>
              </div>
            )}
          </div>

          {/* خيارات إضافية */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value.requiresApproval || false}
                onChange={(e) => onChange({ ...value, requiresApproval: e.target.checked })}
                className="w-4 h-4"
              />
              <span>يتطلب موافقة المدير</span>
            </Label>

            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value.autoConfirm || false}
                onChange={(e) => onChange({ ...value, autoConfirm: e.target.checked })}
                className="w-4 h-4"
              />
              <span>تأكيد تلقائي بعد التسجيل</span>
            </Label>
          </div>
        </div>
      )}

      {selectedMethod === 'internal' && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">✨</div>
            <div className="flex-1">
              <p className="font-medium text-green-800 mb-2">
                التسجيل المباشر في الموقع
              </p>
              <ul className="space-y-1 text-sm text-green-700">
                <li>✓ تجربة سلسة للمستخدم</li>
                <li>✓ إدارة كاملة للبيانات</li>
                <li>✓ QR Code تلقائي</li>
                <li>✓ إحصائيات فورية</li>
                <li>✓ تكامل مع نظام النقاط</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'email' && (
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📧</div>
            <div className="flex-1">
              <p className="font-medium text-purple-800 mb-2">
                التسجيل عبر البريد الإلكتروني
              </p>
              <p className="text-sm text-purple-700 mb-2">
                المستخدمون سيرسلون طلب تسجيل إلى:
              </p>
              <div className="flex items-center gap-2">
                <code className="px-3 py-1 bg-white rounded border text-sm">
                  gdg@mustaqbal.edu
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText('gdg@mustaqbal.edu')}
                >
                  نسخ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
