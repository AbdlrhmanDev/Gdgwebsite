import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { authService } from "../services/authService";
import { toast } from "sonner";

interface ForgotPasswordProps {
    onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await authService.forgotPassword(email);
            if (response.success) {
                setIsSent(true);
                toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "فشل إرسال البريد الإلكتروني. يرجى التحقق من البريد الإلكتروني.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
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
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Mail className="w-8 h-8 text-green-500" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-white">
                                تم الإرسال بنجاح
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={onBack}
                                className="w-full h-11 text-base font-medium bg-white/10 hover:bg-white/20 text-white"
                            >
                                العودة لتسجيل الدخول
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

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
                            نسيت كلمة المرور؟
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
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

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                                {isLoading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
                            </Button>
                        </form>

                        <div className="text-center">
                            <button
                                onClick={onBack}
                                className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mx-auto"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                العودة لتسجيل الدخول
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
