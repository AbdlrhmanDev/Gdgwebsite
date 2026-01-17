import { Users, Calendar, TrendingUp, Award, ArrowUp, ArrowDown, BarChart2, PieChart as PieChartIcon } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { eventService } from "../services/eventService";

export function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [memberGrowthData, setMemberGrowthData] = useState<any[]>([]);
  const [eventAttendanceData, setEventAttendanceData] = useState<any[]>([]);
  const [weeklyActivityData, setWeeklyActivityData] = useState<any[]>([]);
  const [topEvents, setTopEvents] = useState<any[]>([]);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const usersResponse = await userService.getUsers();
      const eventsResponse = await eventService.getEvents();

      if (usersResponse.success && eventsResponse.success) {
        const users = usersResponse.data;
        const events = eventsResponse.data;

        // Member Growth
        const growthData = users.reduce((acc: any, user: any) => {
          const month = new Date(user.createdAt).toLocaleString('default', { month: 'long' });
          const year = new Date(user.createdAt).getFullYear();
          const key = `${year}-${month}`;
          if (!acc[key]) {
            acc[key] = { month, members: 0 };
          }
          acc[key].members++;
          return acc;
        }, {});
        setMemberGrowthData(Object.values(growthData));

        // Event Categories
        const categoryData = events.reduce((acc: any, event: any) => {
          const category = event.category;
          if (!acc[category]) {
            acc[category] = { name: category, value: 0 };
          }
          acc[category].value++;
          return acc;
        }, {});
        setEventAttendanceData(Object.values(categoryData));

        // Weekly Activity
        const weeklyData = events.reduce((acc: any, event: any) => {
          const day = new Date(event.date).toLocaleString('default', { weekday: 'long' });
          if (!acc[day]) {
            acc[day] = { day, events: 0, registrations: 0 };
          }
          acc[day].events++;
          acc[day].registrations += event.attendees || 0;
          return acc;
        }, {});
        setWeeklyActivityData(Object.values(weeklyData));

        // Top Events
        const sortedEvents = events.sort((a: any, b: any) => (b.attendees || 0) - (a.attendees || 0)).slice(0, 4);
        setTopEvents(sortedEvents.map((event: any) => ({
          name: event.title,
          date: new Date(event.date).toLocaleDateString('ar-SA'),
          registered: event.registrations?.length || 0,
          attended: event.attendees || 0,
          rate: (event.attendees || 0) / (event.registrations?.length || 1) * 100
        })));
        
        // Stats
        const totalMembers = users.length;
        const eventsThisMonth = events.filter((e:any) => new Date(e.date).getMonth() === new Date().getMonth()).length;
        const totalRegistrations = events.reduce((acc: number, event: any) => acc + (event.registrations?.length || 0), 0);
        const totalAttended = events.reduce((acc: number, event: any) => acc + (event.registrations?.filter((r: any) => r.attended).length || 0), 0);
        const attendanceRate = totalRegistrations > 0 ? (totalAttended / totalRegistrations) * 100 : 0;
        
        setStats([
          { title: 'إجمالي الأعضاء', value: totalMembers, change: '+12%', trend: 'up', icon: Users, color: '#4285f4' },
          { title: 'الفعاليات هذا الشهر', value: eventsThisMonth, change: '+3', trend: 'up', icon: Calendar, color: '#34a853' },
          { title: 'معدل الحضور', value: `${Math.round(attendanceRate)}%`, change: '+5%', trend: 'up', icon: TrendingUp, color: '#f9ab00' },
          { title: 'الشهادات الممنوحة', value: 342, change: '+28', trend: 'up', icon: Award, color: '#ea4335' }
        ]);
      }
    } catch (error) {
      console.error("Failed to load analytics data", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#4285f4', '#34a853', '#f9ab00', '#ea4335', '#9e9e9e'];


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border p-3 rounded-lg shadow-xl">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-2">
            التحليلات والإحصائيات
        </h2>
        <p className="text-muted-foreground">نظرة شاملة على أداء المجتمع ونموه</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          
          return (
            <motion.div key={index} variants={itemVariants}>
                <Card className="bg-card border-border/50 hover:bg-card/80 transition-colors">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
                        style={{ backgroundColor: `${stat.color}15` }}
                        >
                        <Icon className="w-6 h-6" style={{ color: stat.color }} />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-[#34a853]' : 'bg-red-500/10 text-[#ea4335]'}`}>
                        {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        <span>{stat.change}</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
                </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Member Growth Chart */}
        <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50 h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    نمو الأعضاء الشهري
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memberGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis 
                            dataKey="month" 
                            stroke="#888" 
                            tickLine={false} 
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            stroke="#888" 
                            tickLine={false} 
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                        type="monotone" 
                        dataKey="members" 
                        stroke="#4285f4" 
                        strokeWidth={3}
                        dot={{ fill: '#4285f4', strokeWidth: 2, r: 4, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        name="الأعضاء"
                        />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>
        </motion.div>

        {/* Event Categories Pie Chart */}
        <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50 h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-primary" />
                    توزيع الفعاليات حسب الفئة
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={eventAttendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        >
                        {eventAttendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.2)" />
                        ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            iconType="circle"
                            formatter={(value) => <span className="text-sm text-muted-foreground mr-2">{value}</span>}
                        />
                    </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>
        </motion.div>

        {/* Weekly Activity Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-card border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-primary" />
                    النشاط الأسبوعي
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis 
                            dataKey="day" 
                            stroke="#888" 
                            tickLine={false} 
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            stroke="#888" 
                            tickLine={false} 
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                        <Legend 
                            verticalAlign="top" 
                            height={36} 
                            align="right"
                            formatter={(value) => <span className="text-sm text-muted-foreground mr-2">{value}</span>}
                        />
                        <Bar dataKey="events" fill="#4285f4" name="الفعاليات" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="registrations" fill="#34a853" name="التسجيلات" radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>
        </motion.div>
      </div>

      {/* Top Events Table */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border/50 overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    أكثر الفعاليات شعبية
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/30">
                    <tr>
                        <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">الفعالية</th>
                        <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">التاريخ</th>
                        <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">المسجلين</th>
                        <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">الحضور</th>
                        <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">معدل الحضور</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                    {topEvents.map((event, index) => (
                        <tr key={index} className="hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium">{event.name}</td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{event.date}</td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{event.registered}</td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{event.attended}</td>
                        <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                                <div className={`w-16 h-2 rounded-full overflow-hidden bg-muted`}>
                                    <div 
                                        className={`h-full rounded-full ${event.rate >= 85 ? 'bg-[#34a853]' : 'bg-[#f9ab00]'}`} 
                                        style={{ width: `${event.rate}%` }}
                                    />
                                </div>
                                <span className={`text-xs font-medium ${
                                event.rate >= 85 ? 'text-[#34a853]' : 'text-[#f9ab00]'
                                }`}>
                                {event.rate.toFixed(1)}%
                                </span>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
