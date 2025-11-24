import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, ArrowRight, User, CreditCard, Mail, Lock } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner"; // Import toast

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
      toast.error("كلمات المرور غير متطابقة"); // Use toast.error
      return;
    }

    if (formData.password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); // Use toast.error
      return;
    }

    onRegister(formData.email, formData.password, formData.name, formData.studentId);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader className="space-y-3 text-center pb-8">
             <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex space-x-1 rtl:space-x-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285f4] animate-pulse"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-pulse delay-75"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f9ab00] animate-pulse delay-150"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea4335] animate-pulse delay-200"></span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              انضم إلى GDG
            </CardTitle>
            <CardDescription className="text-gray-400">
              أنشئ حسابك الجديد وابدأ رحلتك التقنية معنا
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">الاسم الكامل</Label>
                <div className="relative">
                    <User className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أحمد محمد"
                        required
                        className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-gray-300">الرقم الجامعي</Label>
                <div className="relative">
                    <CreditCard className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                    <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        placeholder="2024001234"
                        required
                        className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">البريد الإلكتروني </Label>
                <div className="relative">
                    <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@mustaqbal.edu"
                        required
                        className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">كلمة المرور</Label>
                    <div className="relative">
                        <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                        />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300">تأكيد كلمة المرور</Label>
                    <div className="relative">
                        <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                        />
                    </div>
                  </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-[#4285f4] hover:bg-[#3367d6] text-white font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                إنشاء حساب
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                لديك حساب بالفعل؟{" "}
                <button
                  onClick={onBackToLogin}
                  className="text-[#4285f4] hover:text-[#5d9af8] hover:underline font-medium transition-colors"
                >
                  تسجيل الدخول
                </button>
              </p>
            </div>

            <div className="p-4 bg-[#4285f4]/10 border border-[#4285f4]/20 rounded-xl">
              <p className="text-xs text-[#4285f4] text-center leading-relaxed">
                بالتسجيل، ستصبح <strong>عضواً</strong> في GDG وستتمكن من التسجيل في الفعاليات وجمع النقاط والحصول على الشهادات
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
