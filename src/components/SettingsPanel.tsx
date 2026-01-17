import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { settingsService } from "../services/settingsService";

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    attendancePoints: 50,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsService.getSettings();
      if (response.success) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings = async () => {
    try {
      const response = await settingsService.updateSettings(settings);
      if (response.success) {
        toast.success('تم تحديث الإعدادات بنجاح');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل في تحديث الإعدادات');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285f4] mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات النقاط</CardTitle>
          <CardDescription>
            تحديد عدد النقاط التي يتم منحها للمستخدمين عند حضور الفعاليات.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="attendancePoints">نقاط الحضور</Label>
              <Input
                id="attendancePoints"
                type="number"
                value={settings.attendancePoints}
                onChange={(e) => setSettings({ ...settings, attendancePoints: parseInt(e.target.value) })}
                placeholder="أدخل عدد النقاط"
              />
            </div>
            <Button onClick={handleUpdateSettings} className="bg-[#4285f4]">
              حفظ التغييرات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}