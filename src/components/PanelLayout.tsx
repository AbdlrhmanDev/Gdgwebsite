import { LogOut, Home, Calendar, BarChart, Settings, Users as UsersIcon, Trophy, User, LayoutDashboard, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface PanelLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'member' | 'user';
  userEmail: string;
  onLogout: () => void;
  onNavigateToSite: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export function PanelLayout({ children, userRole, userEmail, onLogout, onNavigateToSite, currentView, onViewChange }: PanelLayoutProps) {
  const roleColors = {
    admin: '#34a853',
    member: '#4285f4',
    user: '#9e9e9e'
  };

  const roleLabels = {
    admin: 'مدير',
    member: 'عضو',
    user: 'مستخدم'
  };

  const roleColor = roleColors[userRole];

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard }
    ];

    if (userRole === 'user') {
      return [
        ...baseItems,
        { id: 'browse', label: 'تصفح الفعاليات', icon: Eye }
      ];
    }

    if (userRole === 'member') {
      return [
        ...baseItems,
        { id: 'events', label: 'فعالياتي', icon: Calendar },
        { id: 'profile', label: 'الملف الشخصي', icon: User },
        { id: 'gamification', label: 'النقاط والإنجازات', icon: Trophy }
      ];
    }

    // Admin gets everything
    return [
      ...baseItems,
      { id: 'events', label: 'إدارة الفعاليات', icon: Calendar },
      { id: 'profile', label: 'الملف الشخصي', icon: User },
      { id: 'gamification', label: 'النقاط والإنجازات', icon: Trophy },
      { id: 'analytics', label: 'التحليلات', icon: BarChart },
      { id: 'members', label: 'الأعضاء', icon: UsersIcon },
      { id: 'settings', label: 'الإعدادات', icon: Settings }
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  <span className="w-3 h-3 rounded-full bg-[#4285f4]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#34a853] -mr-1"></span>
                  <span className="w-3 h-3 rounded-full bg-[#f9ab00] -mr-1"></span>
                  <span className="w-3 h-3 rounded-full bg-[#ea4335] -mr-1"></span>
                </div>
                <span className="text-lg">لوحة التحكم GDG</span>
              </div>
              <Badge style={{ backgroundColor: roleColor }}>
                {roleLabels[userRole]}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 ml-2">{userEmail}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToSite}
              >
                <Home className="w-4 h-4 ml-2" />
                عرض الموقع
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 ml-2" />
                تسجيل خروج
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm text-gray-500 mb-3">القائمة</h3>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-[#4285f4] bg-opacity-10 text-[#4285f4]'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Role Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm text-gray-500 mb-3">معلومات الحساب</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600">نوع الحساب</p>
                  <p className="text-sm">{roleLabels[userRole]}</p>
                </div>
                {userRole === 'user' && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-600 mb-2">
                      للحصول على مزايا إضافية:
                    </p>
                    <Button size="sm" className="w-full bg-[#4285f4]">
                      ترقية إلى عضو
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            {(userRole === 'member' || userRole === 'admin') && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm text-gray-500 mb-3">إحصائيات سريعة</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl">12</p>
                    <p className="text-xs text-gray-600">إجمالي الفعاليات</p>
                  </div>
                  <div>
                    <p className="text-2xl">3</p>
                    <p className="text-xs text-gray-600">القادمة</p>
                  </div>
                  {userRole === 'admin' && (
                    <div>
                      <p className="text-2xl">500+</p>
                      <p className="text-xs text-gray-600">الأعضاء</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}