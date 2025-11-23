import { useState } from "react";
import { 
  Settings, 
  Bell, 
  Mail, 
  Shield, 
  Palette, 
  Database, 
  Link as LinkIcon,
  Save,
  Download,
  Upload,
  RefreshCw,
  Award,
  Globe,
  Zap
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "GDG on Campus - جامعة المستقبل",
    siteDescription: "مجتمع مطوري Google في جامعة المستقبل",
    contactEmail: "gdg@mustaqbal.edu",
    contactPhone: "+966 XX XXX XXXX",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    weeklyDigest: true,
    
    // Email Settings
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "gdg@mustaqbal.edu",
    smtpPassword: "",
    
    // Permissions
    allowMemberRegistration: true,
    requireEmailVerification: true,
    autoApproveMembers: false,
    allowEventCreation: false,
    
    // Appearance
    primaryColor: "#4285f4",
    secondaryColor: "#34a853",
    darkMode: false,
    rtlSupport: true,
    
    // Integrations
    googleAnalyticsId: "",
    googleCalendarSync: false,
    googleDriveIntegration: false,
    googleMeetIntegration: true,
    
    // Certificate Settings
    certificateTemplate: "default",
    autoGenerateCertificates: true,
    certificateSignature: "Dr. Ahmed Al-Rashid",
    
    // Advanced
    backupFrequency: "daily",
    dataRetention: "1year",
    apiAccess: false
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("تم حفظ الإعدادات بنجاح!");
  };

  const handleBackup = () => {
    alert("جاري إنشاء نسخة احتياطية...");
  };

  const handleRestore = () => {
    alert("جاري استعادة البيانات...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl mb-2">الإعدادات</h2>
          <p className="text-gray-600">إدارة إعدادات النظام والتكامل</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#4285f4] hover:bg-[#3367d6]"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" dir="rtl">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 ml-1" />
            عام
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 ml-1" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="w-4 h-4 ml-1" />
            البريد
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="w-4 h-4 ml-1" />
            الصلاحيات
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 ml-1" />
            المظهر
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <LinkIcon className="w-4 h-4 ml-1" />
            التكامل
          </TabsTrigger>
          <TabsTrigger value="certificates">
            <Award className="w-4 h-4 ml-1" />
            الشهادات
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Database className="w-4 h-4 ml-1" />
            متقدم
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إدارة المعلومات الأساسية للموقع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">اسم الموقع</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="siteDescription">وصف الموقع</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">البريد الإلكتروني</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">رقم الهاتف</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>تخصيص طريقة استلام الإشعارات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">إشعارات البريد الإلكتروني</p>
                  <p className="text-sm text-gray-600">استقبال التحديثات عبر البريد</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">الإشعارات الفورية</p>
                  <p className="text-sm text-gray-600">استقبال إشعارات فورية على المتصفح</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">تذكير الفعاليات</p>
                  <p className="text-sm text-gray-600">تنبيه قبل بدء الفعاليات</p>
                </div>
                <Switch
                  checked={settings.eventReminders}
                  onCheckedChange={(checked) => setSettings({ ...settings, eventReminders: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">النشرة الأسبوعية</p>
                  <p className="text-sm text-gray-600">ملخص أسبوعي للنشاطات</p>
                </div>
                <Switch
                  checked={settings.weeklyDigest}
                  onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات خادم البريد (SMTP)</CardTitle>
              <CardDescription>تكوين خادم البريد الإلكتروني</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpServer">خادم SMTP</Label>
                  <Input
                    id="smtpServer"
                    value={settings.smtpServer}
                    onChange={(e) => setSettings({ ...settings, smtpServer: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">المنفذ</Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="smtpUsername">اسم المستخدم</Label>
                <Input
                  id="smtpUsername"
                  value={settings.smtpUsername}
                  onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="smtpPassword">كلمة المرور</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <Button variant="outline">
                <Zap className="w-4 h-4 ml-2" />
                اختبار الاتصال
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الصلاحيات</CardTitle>
              <CardDescription>التحكم في صلاحيات الأعضاء</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">السماح بالتسجيل الجديد</p>
                  <p className="text-sm text-gray-600">السماح للأعضاء الجدد بالتسجيل</p>
                </div>
                <Switch
                  checked={settings.allowMemberRegistration}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowMemberRegistration: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">التحقق من البريد الإلكتروني</p>
                  <p className="text-sm text-gray-600">طلب تأكيد البريد قبل التفعيل</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">الموافقة التلقائية</p>
                  <p className="text-sm text-gray-600">قبول الأعضاء الجدد تلقائياً</p>
                </div>
                <Switch
                  checked={settings.autoApproveMembers}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoApproveMembers: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">السماح للأعضاء بإنشاء فعاليات</p>
                  <p className="text-sm text-gray-600">تمكين الأعضاء من إضافة فعاليات</p>
                </div>
                <Switch
                  checked={settings.allowEventCreation}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowEventCreation: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تخصيص المظهر</CardTitle>
              <CardDescription>تعديل ألوان وشكل الموقع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">اللون الأساسي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      placeholder="#4285f4"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      placeholder="#34a853"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">الوضع الليلي افتراضي</p>
                  <p className="text-sm text-gray-600">تفعيل الوضع الليلي للمستخدمين الجدد</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">دعم RTL</p>
                  <p className="text-sm text-gray-600">تفعيل الاتجاه من اليمين لليسار</p>
                </div>
                <Switch
                  checked={settings.rtlSupport}
                  onCheckedChange={(checked) => setSettings({ ...settings, rtlSupport: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>التكامل مع خدمات Google</CardTitle>
              <CardDescription>ربط النظام مع خدمات Google</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                <Input
                  id="googleAnalytics"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">Google Calendar</p>
                  <p className="text-sm text-gray-600">مزامنة الفعاليات مع Google Calendar</p>
                </div>
                <Switch
                  checked={settings.googleCalendarSync}
                  onCheckedChange={(checked) => setSettings({ ...settings, googleCalendarSync: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">Google Drive</p>
                  <p className="text-sm text-gray-600">تخزين الملفات على Google Drive</p>
                </div>
                <Switch
                  checked={settings.googleDriveIntegration}
                  onCheckedChange={(checked) => setSettings({ ...settings, googleDriveIntegration: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">Google Meet</p>
                  <p className="text-sm text-gray-600">إنشاء روابط Meet للفعاليات الافتراضية</p>
                </div>
                <Switch
                  checked={settings.googleMeetIntegration}
                  onCheckedChange={(checked) => setSettings({ ...settings, googleMeetIntegration: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates */}
        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الشهادات</CardTitle>
              <CardDescription>تخصيص نظام إصدار الشهادات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="certificateTemplate">قالب الشهادة</Label>
                <select
                  id="certificateTemplate"
                  value={settings.certificateTemplate}
                  onChange={(e) => setSettings({ ...settings, certificateTemplate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="default">القالب الافتراضي</option>
                  <option value="modern">قالب عصري</option>
                  <option value="classic">قالب كلاسيكي</option>
                  <option value="minimal">قالب بسيط</option>
                </select>
              </div>
              <div>
                <Label htmlFor="certificateSignature">توقيع الشهادة</Label>
                <Input
                  id="certificateSignature"
                  value={settings.certificateSignature}
                  onChange={(e) => setSettings({ ...settings, certificateSignature: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">الإصدار التلقائي</p>
                  <p className="text-sm text-gray-600">إصدار شهادات تلقائياً عند إتمام الفعالية</p>
                </div>
                <Switch
                  checked={settings.autoGenerateCertificates}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoGenerateCertificates: checked })}
                />
              </div>
              <Button variant="outline" className="w-full">
                <Award className="w-4 h-4 ml-2" />
                معاينة الشهادة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>النسخ الاحتياطي والاستعادة</CardTitle>
              <CardDescription>إدارة نسخ البيانات الاحتياطية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="backupFrequency">تكرار النسخ الاحتياطي</Label>
                <select
                  id="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="daily">يومياً</option>
                  <option value="weekly">أسبوعياً</option>
                  <option value="monthly">شهرياً</option>
                </select>
              </div>
              <div>
                <Label htmlFor="dataRetention">مدة الاحتفاظ بالبيانات</Label>
                <select
                  id="dataRetention"
                  value={settings.dataRetention}
                  onChange={(e) => setSettings({ ...settings, dataRetention: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="6months">6 أشهر</option>
                  <option value="1year">سنة واحدة</option>
                  <option value="2years">سنتان</option>
                  <option value="forever">دائماً</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Button onClick={handleBackup} variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  إنشاء نسخة احتياطية
                </Button>
                <Button onClick={handleRestore} variant="outline">
                  <Upload className="w-4 h-4 ml-2" />
                  استعادة من نسخة
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الإعدادات المتقدمة</CardTitle>
              <CardDescription>خيارات متقدمة للنظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">الوصول لواجهة API</p>
                  <p className="text-sm text-gray-600">السماح بالوصول البرمجي للبيانات</p>
                </div>
                <Switch
                  checked={settings.apiAccess}
                  onCheckedChange={(checked) => setSettings({ ...settings, apiAccess: checked })}
                />
              </div>
              {settings.apiAccess && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm mb-2">مفتاح API</p>
                  <div className="flex gap-2">
                    <Input value="gdg_sk_test_xxxxxxxxxxxxxxxx" readOnly />
                    <Button variant="outline" size="sm">نسخ</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
