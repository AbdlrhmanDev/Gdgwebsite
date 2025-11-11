import { Users, Calendar, Award, TrendingUp, ArrowUp, ArrowDown, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export function DashboardOverview() {
  const stats = [
    {
      title: "إجمالي الأعضاء",
      value: "524",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "#4285f4",
      subtitle: "منذ الشهر الماضي"
    },
    {
      title: "الفعاليات النشطة",
      value: "8",
      change: "+2",
      trend: "up",
      icon: Calendar,
      color: "#34a853",
      subtitle: "هذا الشهر"
    },
    {
      title: "معدل الحضور",
      value: "87%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "#f9ab00",
      subtitle: "معدل عام"
    },
    {
      title: "الشهادات الممنوحة",
      value: "342",
      change: "+28",
      trend: "up",
      icon: Award,
      color: "#ea4335",
      subtitle: "هذا الفصل"
    }
  ];

  const recentActivities = [
    {
      type: "event",
      title: "تم إنشاء فعالية جديدة: ورشة React المتقدمة",
      time: "منذ 5 دقائق",
      icon: Calendar,
      color: "#4285f4"
    },
    {
      type: "member",
      title: "انضم 15 عضو جديد إلى المجتمع",
      time: "منذ ساعة",
      icon: Users,
      color: "#34a853"
    },
    {
      type: "certificate",
      title: "تم إصدار 12 شهادة جديدة",
      time: "منذ ساعتين",
      icon: Award,
      color: "#f9ab00"
    },
    {
      type: "event",
      title: "تم تحديث معلومات فعالية الهاكاثون",
      time: "منذ 3 ساعات",
      icon: Calendar,
      color: "#4285f4"
    }
  ];

  const upcomingEvents = [
    {
      title: "ورشة تطوير Flutter",
      date: "20 نوفمبر 2025",
      registrations: 45,
      capacity: 60,
      status: "open"
    },
    {
      title: "محاضرة الذكاء الاصطناعي",
      date: "22 نوفمبر 2025",
      registrations: 100,
      capacity: 100,
      status: "full"
    },
    {
      title: "هاكاثون السحابة",
      date: "25 نوفمبر 2025",
      registrations: 150,
      capacity: 200,
      status: "open"
    }
  ];

  const topMembers = [
    { name: "أحمد محمد", points: 2450, events: 24, rank: 1 },
    { name: "فاطمة علي", points: 2280, events: 22, rank: 2 },
    { name: "خالد عبدالله", points: 2100, events: 20, rank: 3 },
    { name: "مريم حسن", points: 1950, events: 18, rank: 4 },
    { name: "عمر سعيد", points: 1820, events: 17, rank: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2">لوحة التحكم الرئيسية</h2>
        <p className="text-gray-600">مرحباً بك! إليك نظرة عامة على نشاط المجتمع</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-[#34a853]' : 'text-[#ea4335]'}`}>
                    {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-3xl mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>الفعاليات القادمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <div className="text-left ml-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">{event.registrations}/{event.capacity}</span>
                      {event.status === "full" ? (
                        <Badge className="bg-[#ea4335]">مكتمل</Badge>
                      ) : (
                        <Badge className="bg-[#34a853]">مفتوح</Badge>
                      )}
                    </div>
                    <Progress 
                      value={(event.registrations / event.capacity) * 100} 
                      className="h-2 w-32"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>النشاطات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: activity.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm mb-1">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Members Leaderboard */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>أعلى الأعضاء نشاطاً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        index === 0 ? 'bg-[#f9ab00]' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-[#cd7f32]' : 'bg-gray-300'
                      }`}
                    >
                      {member.rank}
                    </div>
                    <div>
                      <p className="mb-0.5">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.events} فعالية</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg text-[#4285f4]">{member.points}</p>
                    <p className="text-xs text-gray-600">نقطة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34a853]" />
                  <span className="text-sm">فعاليات منتهية</span>
                </div>
                <span className="text-lg">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#f9ab00]" />
                  <span className="text-sm">فعاليات قادمة</span>
                </div>
                <span className="text-lg">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-[#ea4335]" />
                  <span className="text-sm">فعاليات ملغاة</span>
                </div>
                <span className="text-lg">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#4285f4]" />
                  <span className="text-sm">انتظار الموافقة</span>
                </div>
                <span className="text-lg">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goals */}
      <Card>
        <CardHeader>
          <CardTitle>أهداف الشهر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>أعضاء جدد</span>
                <span className="text-[#4285f4]">85/100</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-gray-600">15 عضو متبقي للوصول للهدف</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>فعاليات منظمة</span>
                <span className="text-[#34a853]">8/10</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-gray-600">فعاليتان متبقيتان</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>معدل الرضا</span>
                <span className="text-[#f9ab00]">92/95%</span>
              </div>
              <Progress value={96.8} className="h-2" />
              <p className="text-xs text-gray-600">قريب من الهدف!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
