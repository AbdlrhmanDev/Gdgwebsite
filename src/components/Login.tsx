import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lock, Mail } from "lucide-react";
import { motion } from "motion/react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export function Login({ onLogin, onRegister, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setIsLoading(false);
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
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">كلمة المرور</Label>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-xs text-[#4285f4] hover:text-[#5d9af8] hover:underline transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 pr-10 focus:border-[#4285f4] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isLoading ? "جاري تسجيل الدخول..." : "دخول"}
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
