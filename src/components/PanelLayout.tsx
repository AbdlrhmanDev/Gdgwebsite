import { LogOut, Home, Calendar, BarChart, Settings, Users as UsersIcon, Trophy, User, LayoutDashboard, Eye, CheckSquare, Briefcase, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        { id: 'departments', label: 'قسمي', icon: Briefcase },
        { id: 'profile', label: 'الملف الشخصي', icon: User },
        { id: 'gamification', label: 'النقاط والإنجازات', icon: Trophy }
      ];
    }

    return [
      ...baseItems,
      { id: 'tasks', label: 'المهام', icon: CheckSquare },
      { id: 'events', label: 'إدارة الفعاليات', icon: Calendar },
      { id: 'departments', label: 'الأقسام والفرق', icon: Briefcase },
      { id: 'leaderboard', label: 'لوحة المتصدرين', icon: Trophy },
      { id: 'profile', label: 'الملف الشخصي', icon: User },
      { id: 'gamification', label: 'النقاط والإنجازات', icon: Trophy },
      { id: 'analytics', label: 'التحليلات', icon: BarChart },
      { id: 'members', label: 'الأعضاء', icon: UsersIcon },
      { id: 'settings', label: 'الإعدادات', icon: Settings }
    ];
  };

  const navItems = getNavItems();

  const SidebarContent = () => (
    <div className="space-y-6">
       <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">القائمة الرئيسية</h3>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium shadow-sm'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-0 w-1 h-6 bg-primary rounded-l-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Info */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">معلومات الحساب</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">نوع الحساب</p>
            <Badge style={{ backgroundColor: roleColor }} className="shadow-sm">
              {roleLabels[userRole]}
            </Badge>
          </div>
          {userRole === 'user' && (
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">
                للحصول على مزايا إضافية:
              </p>
              <Button size="sm" className="w-full bg-[#4285f4] hover:bg-[#3367d6] shadow-md shadow-blue-500/20">
                ترقية إلى عضو
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground" dir="rtl">
      {/* Top Navigation */}
      <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4285f4] animate-pulse"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-pulse delay-75"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f9ab00] animate-pulse delay-150"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ea4335] animate-pulse delay-200"></span>
                </div>
                <span className="text-lg font-semibold hidden sm:block">لوحة التحكم GDG</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end mr-2">
                 <span className="text-sm font-medium">{userEmail}</span>
                 <span className="text-xs text-muted-foreground">{roleLabels[userRole]}</span>
              </div>
              
              <div className="h-8 w-px bg-border mx-1 hidden md:block" />

              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateToSite}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">الموقع</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">خروج</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <SidebarContent />
          </aside>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <motion.div
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    exit={{ x: 300 }}
                    className="fixed top-16 right-0 bottom-0 w-3/4 max-w-xs bg-card border-l border-border z-50 lg:hidden overflow-y-auto p-4"
                >
                    <SidebarContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm min-h-[calc(100vh-8rem)] relative overflow-hidden"
            >
               {/* Subtle Background Decoration */}
               <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#f9ab00] opacity-50" />
               {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
