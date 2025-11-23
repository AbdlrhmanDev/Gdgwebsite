import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lock, Mail, Key } from "lucide-react";
import { motion } from "motion/react";

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
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-500/10 blur-3xl" />

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
              تسجيل الدخول
            </CardTitle>
            <CardDescription className="text-gray-400">
              اختر نوع الحساب وسجل دخولك إلى مجتمع GDG
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="role" className="text-gray-300">نوع الحساب</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['user', 'member', 'admin'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`py-2 px-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        selectedRole === role
                          ? 'border-transparent text-white shadow-lg scale-105'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                      style={selectedRole === role ? {
                        backgroundColor: roleInfo[role].color,
                        boxShadow: `0 4px 12px ${roleInfo[role].color}40`
                      } : {}}
                    >
                      {roleInfo[role].title}
                    </button>
                  ))}
                </div>
                <motion.p 
                  key={selectedRole}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-gray-500 text-center h-4"
                >
                  {roleInfo[selectedRole].description}
                </motion.p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">كلمة المرور</Label>
                  <div className="relative">
                    <Key className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: roleInfo[selectedRole].color,
                  boxShadow: `0 4px 12px ${roleInfo[selectedRole].color}40`
                }}
              >
                دخول
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/50 backdrop-blur px-2 text-gray-500">
                  أو
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                ليس لديك حساب؟{" "}
                <button
                  onClick={onRegister}
                  className="text-[#4285f4] hover:text-[#5d9af8] hover:underline font-medium transition-colors"
                >
                  إنشاء حساب جديد
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                <Lock className="w-3 h-3" />
                بيانات تجريبية
              </div>
              <div className="grid gap-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-500 hover:text-gray-300 transition-colors">
                  <span>User:</span>
                  <span>{demoCredentials.user.email}</span>
                </div>
                <div className="flex justify-between text-gray-500 hover:text-gray-300 transition-colors">
                  <span>Member:</span>
                  <span>{demoCredentials.member.email}</span>
                </div>
                <div className="flex justify-between text-gray-500 hover:text-gray-300 transition-colors">
                  <span>Admin:</span>
                  <span>{demoCredentials.admin.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
