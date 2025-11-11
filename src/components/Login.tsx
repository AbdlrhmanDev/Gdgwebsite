import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lock } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string, role: 'admin' | 'member' | 'user') => void;
  onRegister: () => void;
}

export function Login({ onLogin, onRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<'admin' | 'member' | 'user'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, selectedRole);
  };

  // Demo credentials info
  const demoCredentials = {
    admin: { email: "admin@gdg.com", password: "admin123" },
    member: { email: "member@gdg.com", password: "member123" },
    user: { email: "user@gdg.com", password: "user123" }
  };

  const roleInfo = {
    user: {
      title: "مستخدم",
      description: "عرض الفعاليات والمحتوى العام",
      color: "#9e9e9e"
    },
    member: {
      title: "عضو",
      description: "التسجيل في الفعاليات وجمع النقاط",
      color: "#4285f4"
    },
    admin: {
      title: "مدير",
      description: "صلاحيات كاملة لإدارة النظام",
      color: "#34a853"
    }
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
            <Lock className="w-5 h-5 text-gray-700" />
          </div>
          <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
          <CardDescription className="text-center">
            اختر نوع الحساب وسجل دخولك إلى GDG
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="role">نوع الحساب</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {(['user', 'member', 'admin'] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-3 px-2 rounded-lg border-2 transition-all text-sm ${
                      selectedRole === role
                        ? `border-[${roleInfo[role].color}] bg-[${roleInfo[role].color}] text-white`
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={selectedRole === role ? {
                      borderColor: roleInfo[role].color,
                      backgroundColor: roleInfo[role].color
                    } : {}}
                  >
                    {roleInfo[role].title}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                {roleInfo[selectedRole].description}
              </p>
            </div>

            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              style={{
                backgroundColor: roleInfo[selectedRole].color
              }}
            >
              تسجيل الدخول كـ {roleInfo[selectedRole].title}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟{" "}
              <button
                onClick={onRegister}
                className="text-[#4285f4] hover:underline"
              >
                إنشاء حساب جديد
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <p className="text-sm text-gray-700">بيانات تجريبية:</p>
            <div className="text-xs space-y-1">
              <p className="text-gray-600">
                <strong>مستخدم:</strong> {demoCredentials.user.email} / {demoCredentials.user.password}
              </p>
              <p className="text-gray-600">
                <strong>عضو:</strong> {demoCredentials.member.email} / {demoCredentials.member.password}
              </p>
              <p className="text-gray-600">
                <strong>مدير:</strong> {demoCredentials.admin.email} / {demoCredentials.admin.password}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}