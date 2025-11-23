import { Calendar, Users, Code, Award, TrendingUp, Bell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  status: string;
  color: string;
}

interface UserDashboardProps {
  events: Event[];
  onRegisterForEvent: (eventId: string) => void;
}

export function UserDashboard({ events, onRegisterForEvent }: UserDashboardProps) {
  const publicStats = [
    { icon: Users, label: "الأعضاء", value: "500+", color: "#4285f4" },
    { icon: Calendar, label: "الفعاليات", value: "50+", color: "#34a853" },
    { icon: Code, label: "ورش العمل", value: "30+", color: "#f9ab00" },
    { icon: Award, label: "الشهادات", value: "342", color: "#ea4335" }
  ];

  const upcomingEvents = events.filter(e => e.status === "قريباً" || e.status === "التسجيل مفتوح").slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#4285f4] to-[#34a853] rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl -ml-16 -mb-16" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight">مرحباً بك في GDG! 👋</h2>
            <p className="text-xl opacity-90 font-light leading-relaxed">
              استكشف الفعاليات القادمة، انضم لورش العمل، وابدأ رحلتك في عالم تطوير البرمجيات مع نخبة من المبدعين.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
              <span className="text-yellow-300">💡</span>
              <span>نصيحة: سجل كعضو للحصول على الشهادات وجمع النقاط!</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner border border-white/20">
              <Code className="w-14 h-14 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {publicStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 hover:bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <Card className="border-border/50 bg-card/50 overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#4285f4]" />
                الفعاليات القادمة
            </span>
            <Badge className="bg-[#4285f4] hover:bg-[#3367d6]">جديد</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-muted/30 rounded-3xl border border-dashed border-border">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg">لا توجد فعاليات قادمة حالياً</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge style={{ backgroundColor: event.color }} className="absolute top-3 right-3 shadow-sm border-0">
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#4285f4] transition-colors">{event.title}</h3>
                    <div className="text-sm text-muted-foreground space-y-2 mb-6 flex-grow">
                      <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4285f4]" />
                          {event.date}
                      </p>
                      <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
                          {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f9ab00]" />
                          {event.location}
                      </p>
                    </div>
                    <Button 
                      className="w-full rounded-xl font-medium shadow-sm transition-all hover:scale-[1.02]"
                      style={{ backgroundColor: event.color }}
                      onClick={() => onRegisterForEvent(event.id)}
                    >
                      عرض التفاصيل
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Why Join Section */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl">لماذا تنضم كعضو في GDG؟</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
                { icon: Award, color: "#4285f4", title: "احصل على شهادات", desc: "شهادات حضور معتمدة من Google Developers لكل فعالية تحضرها" },
                { icon: TrendingUp, color: "#34a853", title: "اجمع النقاط", desc: "نظام نقاط وشارات لتتبع تقدمك والتنافس مع الأعضاء الآخرين" },
                { icon: Bell, color: "#f9ab00", title: "تنبيهات حصرية", desc: "كن أول من يعلم بالفعاليات والورش الجديدة عبر الإشعارات" }
            ].map((item, i) => {
                const Icon = item.icon;
                return (
                    <div key={i} className="text-center p-8 bg-muted/30 rounded-3xl border border-border/50 hover:bg-muted/50 transition-colors">
                    <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transition-transform hover:scale-110"
                        style={{ backgroundColor: `${item.color}15` }}
                    >
                        <Icon className="w-8 h-8" style={{ color: item.color }} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                    </p>
                    </div>
                );
            })}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#ea4335] to-[#f9ab00] rounded-3xl p-12 text-white text-center relative overflow-hidden shadow-xl">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">جاهز للانضمام؟</h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            سجل الآن وابدأ رحلتك التعليمية مع GDG on Campus. انضم لأكثر من 500 طالب شغوف بالتكنولوجيا.
            </p>
            <Button className="bg-white text-[#ea4335] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 font-bold">
            إنشاء حساب مجاناً
            </Button>
         </div>
      </div>
    </div>
  );
}
