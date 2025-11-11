import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, ArrowRight } from "lucide-react";

interface RegisterProps {
  onRegister: (email: string, password: string, name: string, studentId: string) => void;
  onBackToLogin: () => void;
}

export function Register({ onRegister, onBackToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    if (formData.password.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    onRegister(formData.email, formData.password, formData.name, formData.studentId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4285f4] via-[#34a853] to-[#f9ab00] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              <span className="w-3 h-3 rounded-full bg-[#4285f4]"></span>
              <span className="w-3 h-3 rounded-full bg-[#34a853] -mr-1"></span>
              <span className="w-3 h-3 rounded-full bg-[#f9ab00] -mr-1"></span>
              <span className="w-3 h-3 rounded-full bg-[#ea4335] -mr-1"></span>
            </div>
            <UserPlus className="w-5 h-5 text-gray-700" />
          </div>
          <CardTitle className="text-2xl text-center">انضم إلى GDG</CardTitle>
          <CardDescription className="text-center">
            أنشئ حسابك الجديد وابدأ رحلتك التقنية معنا
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أحمد محمد"
                required
              />
            </div>

            <div>
              <Label htmlFor="studentId">الرقم الجامعي</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="2024001234"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">البريد الإلكتروني الجامعي</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@mustaqbal.edu"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#4285f4] hover:bg-[#3367d6]">
              إنشاء حساب
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{" "}
              <button
                onClick={onBackToLogin}
                className="text-[#4285f4] hover:underline"
              >
                تسجيل الدخول
              </button>
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#4285f4] bg-opacity-10 rounded-lg">
            <p className="text-xs text-gray-700 text-center">
              بالتسجيل، ستصبح <strong>عضواً</strong> في GDG وستتمكن من التسجيل في الفعاليات وجمع النقاط والحصول على الشهادات
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
