import { Users, Calendar, Award, TrendingUp, ArrowUp, ArrowDown, Clock, CheckCircle, XCircle, AlertCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { eventService } from "../services/eventService";

export function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeEvents: 0,
    attendanceRate: 0,
    certificatesIssued: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Load users count
      const usersResponse = await userService.getUsers();
      // Load events
      const eventsResponse = await eventService.getEvents();
      
      if (usersResponse.success && eventsResponse.success) {
        const users = usersResponse.data;
        const events = eventsResponse.data;
        
        // Calculate stats
        const activeEvents = events.filter((e: any) => e.status === 'active' || e.status === 'التسجيل مفتوح').length;
        const upcomingEvts = events.filter((e: any) => new Date(e.date) > new Date()).slice(0, 3);
        
        setStats({
          totalMembers: users.length,
          activeEvents: activeEvents,
          attendanceRate: 87, // This should come from attendance tracking
          certificatesIssued: 342 // This should come from certificates issued
        });
        
        setUpcomingEvents(upcomingEvts.map((e: any) => ({
          title: e.title,
          date: new Date(e.date).toLocaleDateString('ar-SA'),
          registrations: e.attendees || 0,
          capacity: e.capacity,
          status: e.attendees >= e.capacity ? 'full' : 'open'
        })));
        
        // Set recent activities (last events created/updated)
        setRecentActivities([
          {
            type: "event",
            title: `تم إنشاء فعالية جديدة: ${events[0]?.title || 'فعالية جديدة'}`,
            time: "منذ 5 دقائق",
            icon: Calendar,
            color: "#4285f4"
          },
          {
            type: "member",
            title: `انضم ${users.slice(-15).length} عضو جديد إلى المجتمع`,
            time: "منذ ساعة",
            icon: Users,
            color: "#34a853"
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statsArray = [
    {
      title: "إجمالي الأعضاء",
      value: stats.totalMembers.toString(),
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "#4285f4",
      subtitle: "منذ الشهر الماضي"
    },
    {
      title: "الفعاليات النشطة",
      value: stats.activeEvents.toString(),
      change: "+2",
      trend: "up",
      icon: Calendar,
      color: "#34a853",
      subtitle: "هذا الشهر"
    },
    {
      title: "معدل الحضور",
      value: `${stats.attendanceRate}%`,
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "#f9ab00",
      subtitle: "معدل عام"
    },
    {
      title: "الشهادات الممنوحة",
      value: stats.certificatesIssued.toString(),
      change: "+28",
      trend: "up",
      icon: Award,
      color: "#ea4335",
      subtitle: "هذا الفصل"
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">لوحة التحكم الرئيسية</h2>
        <p className="text-muted-foreground">مرحباً بك! إليك نظرة عامة على نشاط المجتمع</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsArray.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={index} className="border-border/50 bg-card/50 hover:bg-card transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-[#34a853]' : 'bg-red-500/10 text-[#ea4335]'}`}>
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground opacity-80">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Calendar className="w-5 h-5 text-[#4285f4]" />
               الفعاليات القادمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-border transition-colors">
                  <div className="flex-1">
                    <h4 className="mb-1 font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="text-left ml-4">
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      <span className="text-xs text-muted-foreground">{event.registrations}/{event.capacity}</span>
                      {event.status === "full" ? (
                        <Badge variant="destructive" className="bg-[#ea4335]">مكتمل</Badge>
                      ) : (
                        <Badge className="bg-[#34a853] hover:bg-[#34a853]/90">مفتوح</Badge>
                      )}
                    </div>
                    <Progress 
                      value={(event.registrations / event.capacity) * 100} 
                      className="h-2 w-32 bg-muted"
                      // indicatorClassName={event.status === "full" ? "bg-[#ea4335]" : "bg-[#34a853]"} 
                      // Note: Shadcn Progress doesn't accept indicatorClassName directly usually, depends on implementation.
                      // Assuming default color or overriding via CSS if needed.
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#f9ab00]" />
                النشاطات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-4 border-l border-border space-y-6">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="relative pl-4">
                    <div 
                        className="absolute -left-[25px] top-0 w-5 h-5 rounded-full bg-background border-2 flex items-center justify-center"
                        style={{ borderColor: activity.color }}
                    >
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activity.color }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Members Leaderboard */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f9ab00]" />
                أعلى الأعضاء نشاطاً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/50">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' : 
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {member.rank}
                    </div>
                    <div>
                      <p className="mb-0.5 font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.events} فعالية</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-[#4285f4]">{member.points}</p>
                    <p className="text-xs text-muted-foreground">نقطة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#34a853]" />
                  <span className="text-sm font-medium">فعاليات منتهية</span>
                </div>
                <span className="text-lg font-bold">24</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#f9ab00]" />
                  <span className="text-sm font-medium">فعاليات قادمة</span>
                </div>
                <span className="text-lg font-bold">8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-[#ea4335]" />
                  <span className="text-sm font-medium">فعاليات ملغاة</span>
                </div>
                <span className="text-lg font-bold">2</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-[#4285f4]" />
                  <span className="text-sm font-medium">انتظار الموافقة</span>
                </div>
                <span className="text-lg font-bold">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goals */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>أهداف الشهر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>أعضاء جدد</span>
                <span className="text-[#4285f4]">85/100</span>
              </div>
              <Progress value={85} className="h-2 bg-muted" />
              <p className="text-xs text-muted-foreground">15 عضو متبقي للوصول للهدف</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>فعاليات منظمة</span>
                <span className="text-[#34a853]">8/10</span>
              </div>
              <Progress value={80} className="h-2 bg-muted" />
              <p className="text-xs text-muted-foreground">فعاليتان متبقيتان</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>معدل الرضا</span>
                <span className="text-[#f9ab00]">92/95%</span>
              </div>
              <Progress value={96.8} className="h-2 bg-muted" />
              <p className="text-xs text-muted-foreground">قريب من الهدف!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
