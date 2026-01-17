import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { authService } from "../services/authService";
import { toast } from "sonner";

interface ResetPasswordProps {
    token: string;
    onSuccess: () => void;
}

export function ResetPassword({ token, onSuccess }: ResetPasswordProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("كلمات المرور غير متطابقة");
            return;
        }

        if (password.length < 6) {
            toast.error("يجب أن تكون كلمة المرور 6 أحرف على الأقل");
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.resetPassword(token, password);
            if (response.success) {
                toast.success("تم تغيير كلمة المرور بنجاح");
                onSuccess();
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "فشل تغيير كلمة المرور. الرابط قد يكون منتهي الصلاحية.";
            toast.error(message);
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
                        <CardTitle className="text-2xl font-bold text-white">
                            تعيين كلمة المرور الجديدة
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            أدخل كلمة المرور الجديدة لحسابك
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-300">كلمة المرور الجديدة</Label>
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

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-gray-300">تأكيد كلمة المرور</Label>
                                    <div className="relative">
                                        <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                {isLoading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
