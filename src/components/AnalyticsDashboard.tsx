import { Users, Calendar, TrendingUp, Award, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function AnalyticsDashboard() {
  // Sample data for charts
  const memberGrowthData = [
    { month: 'يناير', members: 120 },
    { month: 'فبراير', members: 180 },
    { month: 'مارس', members: 250 },
    { month: 'أبريل', members: 320 },
    { month: 'مايو', members: 410 },
    { month: 'يونيو', members: 500 }
  ];

  const eventAttendanceData = [
    { name: 'ورش البرمجة', value: 35 },
    { name: 'الذكاء الاصطناعي', value: 25 },
    { name: 'الأمن السيبراني', value: 20 },
    { name: 'تطوير الويب', value: 15 },
    { name: 'أخرى', value: 5 }
  ];

  const weeklyActivityData = [
    { day: 'السبت', events: 2, registrations: 45 },
    { day: 'الأحد', events: 3, registrations: 67 },
    { day: 'الاثنين', events: 1, registrations: 28 },
    { day: 'الثلاثاء', events: 4, registrations: 89 },
    { day: 'الأربعاء', events: 2, registrations: 56 },
    { day: 'الخميس', events: 3, registrations: 72 },
    { day: 'الجمعة', events: 1, registrations: 34 }
  ];

  const COLORS = ['#4285f4', '#34a853', '#f9ab00', '#ea4335', '#9e9e9e'];

  const stats = [
    {
      title: 'إجمالي الأعضاء',
      value: '500+',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: '#4285f4'
    },
    {
      title: 'الفعاليات هذا الشهر',
      value: '8',
      change: '+3',
      trend: 'up',
      icon: Calendar,
      color: '#34a853'
    },
    {
      title: 'معدل الحضور',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: '#f9ab00'
    },
    {
      title: 'الشهادات الممنوحة',
      value: '342',
      change: '+28',
      trend: 'up',
      icon: Award,
      color: '#ea4335'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">التحليلات والإحصائيات</h2>
        <p className="text-gray-600">نظرة شاملة على أداء المجتمع</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
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
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Member Growth Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl mb-4">نمو الأعضاء الشهري</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="members" 
                stroke="#4285f4" 
                strokeWidth={2}
                name="الأعضاء"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Event Categories Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl mb-4">توزيع الفعاليات حسب الفئة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventAttendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {eventAttendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-xl mb-4">النشاط الأسبوعي</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="events" fill="#4285f4" name="الفعاليات" />
              <Bar dataKey="registrations" fill="#34a853" name="التسجيلات" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Events Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl mb-4">أكثر الفعاليات شعبية</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 text-sm text-gray-600">الفعالية</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">التاريخ</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">المسجلين</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">الحضور</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">معدل الحضور</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'ورشة تطوير Android', date: '15 نوفمبر 2025', registered: 120, attended: 105, rate: 87.5 },
                { name: 'دورة الحوسبة السحابية', date: '22 نوفمبر 2025', registered: 80, attended: 72, rate: 90 },
                { name: 'هاكاثون تطوير الويب', date: '5 ديسمبر 2025', registered: 200, attended: 180, rate: 90 },
                { name: 'محاضرة الذكاء الاصطناعي', date: '12 ديسمبر 2025', registered: 150, attended: 125, rate: 83.3 }
              ].map((event, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{event.name}</td>
                  <td className="py-3 px-4 text-gray-600">{event.date}</td>
                  <td className="py-3 px-4 text-gray-600">{event.registered}</td>
                  <td className="py-3 px-4 text-gray-600">{event.attended}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      event.rate >= 85 ? 'bg-[#34a853] bg-opacity-10 text-[#34a853]' : 'bg-[#f9ab00] bg-opacity-10 text-[#f9ab00]'
                    }`}>
                      {event.rate.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
