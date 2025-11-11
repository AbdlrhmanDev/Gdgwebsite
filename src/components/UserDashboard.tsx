import { Calendar, Users, Code, Award, TrendingUp, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#4285f4] to-[#34a853] rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2">مرحباً بك في GDG! 👋</h2>
            <p className="text-lg opacity-90 mb-4">
              استكشف الفعاليات القادمة وانضم إلى مجتمع المطورين
            </p>
            <p className="text-sm opacity-80">
              💡 نصيحة: سجل كعضو للحصول على الشهادات وجمع النقاط!
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {publicStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>الفعاليات القادمة</span>
            <Badge className="bg-[#4285f4]">جديد</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>لا توجد فعاليات قادمة حالياً</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <Badge style={{ backgroundColor: event.color }} className="mb-2">
                      {event.status}
                    </Badge>
                    <h3 className="text-lg mb-2">{event.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <p>📅 {event.date}</p>
                      <p>🕐 {event.time}</p>
                      <p>📍 {event.location}</p>
                    </div>
                    <Button 
                      className="w-full"
                      style={{ backgroundColor: event.color }}
                      onClick={() => onRegisterForEvent(event.id)}
                    >
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Why Join Section */}
      <Card>
        <CardHeader>
          <CardTitle>لماذا تنضم كعضو في GDG؟</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#4285f4] bg-opacity-5 rounded-xl">
              <div className="w-16 h-16 bg-[#4285f4] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#4285f4]" />
              </div>
              <h4 className="text-lg mb-2">احصل على شهادات</h4>
              <p className="text-sm text-gray-600">
                شهادات حضور معتمدة من Google Developers لكل فعالية تحضرها
              </p>
            </div>
            
            <div className="text-center p-6 bg-[#34a853] bg-opacity-5 rounded-xl">
              <div className="w-16 h-16 bg-[#34a853] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#34a853]" />
              </div>
              <h4 className="text-lg mb-2">اجمع النقاط</h4>
              <p className="text-sm text-gray-600">
                نظام نقاط وشارات لتتبع تقدمك والتنافس مع الأعضاء الآخرين
              </p>
            </div>
            
            <div className="text-center p-6 bg-[#f9ab00] bg-opacity-5 rounded-xl">
              <div className="w-16 h-16 bg-[#f9ab00] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-[#f9ab00]" />
              </div>
              <h4 className="text-lg mb-2">تنبيهات حصرية</h4>
              <p className="text-sm text-gray-600">
                كن أول من يعلم بالفعاليات والورش الجديدة عبر الإشعارات
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#ea4335] to-[#f9ab00] rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl mb-3">جاهز للانضمام؟</h3>
        <p className="text-lg mb-6 opacity-90">
          سجل الآن وابدأ رحلتك التعليمية مع GDG on Campus
        </p>
        <Button className="bg-white text-[#ea4335] hover:bg-gray-100" size="lg">
          إنشاء حساب مجاناً
        </Button>
      </div>
    </div>
  );
}
