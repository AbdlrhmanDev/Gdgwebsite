import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Events } from "./components/Events";
import { Team } from "./components/Team";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AdminPanel } from "./components/AdminPanel";
import { PanelLayout } from "./components/PanelLayout";
import { GamificationDashboard } from "./components/GamificationDashboard";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { MemberProfile } from "./components/MemberProfile";
import { DashboardOverview } from "./components/DashboardOverview";
import { SettingsPanel } from "./components/SettingsPanel";
import { UserDashboard } from "./components/UserDashboard";
import { MyEventsPanel } from "./components/MyEventsPanel";
import { LanguageToggle } from "./components/LanguageToggle";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { getTranslation, type Language } from "./lib/i18n";
import { Event, getEvents, addEvent as saveEvent, updateEvent as saveUpdateEvent, deleteEvent as saveDeleteEvent, initializeDefaultData } from "./lib/storage";

type UserRole = 'admin' | 'member' | 'user';
type DashboardView = 'overview' | 'events' | 'analytics' | 'profile' | 'gamification' | 'members' | 'settings' | 'browse' | 'myevents';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userEmail, setUserEmail] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dashboardView, setDashboardView] = useState<DashboardView>('overview');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Load events from storage
  const [events, setEvents] = useState<Event[]>([]);

  // Initialize data and load events
  useEffect(() => {
    initializeDefaultData();
    loadEvents();
  }, [refreshKey]);

  const loadEvents = () => {
    setEvents(getEvents());
  };
  
  // Sample gamification data
  const gamificationData = {
    userPoints: 1250,
    userLevel: 5,
    userRank: 12,
    badges: [
      { id: '1', name: 'المشارك النشط', description: 'حضور 10 فعاليات', icon: '🎯', earned: true, earnedDate: '15 نوفمبر 2025' },
      { id: '2', name: 'المبتكر', description: 'نشر 5 مشاريع', icon: '💡', earned: true, earnedDate: '20 أكتوبر 2025' },
      { id: '3', name: 'القائد', description: 'تنظيم فعالية', icon: '👑', earned: false },
      { id: '4', name: 'الخبير', description: 'الوصول للمستوى 10', icon: '🏆', earned: false },
      { id: '5', name: 'المعلم', description: 'مساعدة 20 عضو', icon: '📚', earned: true, earnedDate: '5 نوفمبر 2025' },
      { id: '6', name: 'المتواصل', description: 'الاتصال مع 50 عضو', icon: '🤝', earned: false }
    ]
  };

  // Apply language direction
  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Demo authentication
    const demoCredentials = {
      admin: { email: "admin@gdg.com", password: "admin123" },
      member: { email: "member@gdg.com", password: "member123" },
      user: { email: "user@gdg.com", password: "user123" }
    };

    if (
      (role === 'admin' && email === demoCredentials.admin.email && password === demoCredentials.admin.password) ||
      (role === 'member' && email === demoCredentials.member.email && password === demoCredentials.member.password) ||
      (role === 'user' && email === demoCredentials.user.email && password === demoCredentials.user.password)
    ) {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserEmail(email);
      setShowPanel(true);
      setDashboardView('overview');
    } else {
      alert('بيانات الاعتماد غير صحيحة. يرجى استخدام بيانات الاعتماد التجريبية المقدمة.');
    }
  };

  const handleRegister = (email: string, password: string, name: string, studentId: string) => {
    // Simulate registration - in real app, this would call an API
    alert(`تم التسجيل بنجاح! مرحباً ${name}`);
    
    // Auto login as member after registration
    setIsLoggedIn(true);
    setUserRole('member');
    setUserEmail(email);
    setShowPanel(true);
    setShowRegister(false);
    setDashboardView('overview');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setShowPanel(false);
    setDashboardView('overview');
  };

  const handleAddEvent = (event: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      createdBy: userEmail,
      createdAt: new Date().toISOString(),
      attendees: 0
    };
    saveEvent(newEvent);
    setRefreshKey(prev => prev + 1);
  };

  const handleEditEvent = (id: string, updatedEvent: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => {
    saveUpdateEvent(id, updatedEvent);
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteEvent = (id: string) => {
    saveDeleteEvent(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleRegisterForEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      // This will be handled by EventDetailsModal
      alert(`سيتم توجيهك لصفحة التسجيل في: ${event.title}`);
    }
  };

  const t = (key: string) => getTranslation(currentLang, key);

  // Show register page
  if (showRegister) {
    return (
      <Register
        onRegister={handleRegister}
        onBackToLogin={() => {
          setShowRegister(false);
          setShowPanel(true);
        }}
      />
    );
  }

  // Show login page if accessing panel
  if (showPanel && !isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => {
          setShowPanel(false);
          setShowRegister(true);
        }}
      />
    );
  }

  // Show dashboard based on role
  if (showPanel && isLoggedIn) {
    return (
      <PanelLayout
        userRole={userRole}
        userEmail={userEmail}
        onLogout={handleLogout}
        onNavigateToSite={() => setShowPanel(false)}
        currentView={dashboardView}
        onViewChange={setDashboardView}
      >
        {/* User (مستخدم) - Limited access */}
        {userRole === 'user' && (
          <>
            {dashboardView === 'overview' && (
              <UserDashboard events={events} onRegisterForEvent={handleRegisterForEvent} />
            )}
            {dashboardView === 'browse' && (
              <UserDashboard events={events} onRegisterForEvent={handleRegisterForEvent} />
            )}
          </>
        )}

        {/* Member (عضو) - Standard access */}
        {userRole === 'member' && (
          <>
            {dashboardView === 'overview' && <DashboardOverview />}
            {dashboardView === 'events' && (
              <MyEventsPanel userEmail={userEmail} />
            )}
            {dashboardView === 'profile' && (
              <MemberProfile userId={userEmail} isOwnProfile={true} />
            )}
            {dashboardView === 'gamification' && (
              <GamificationDashboard {...gamificationData} />
            )}
          </>
        )}

        {/* Admin (مدير) - Full access */}
        {userRole === 'admin' && (
          <>
            {dashboardView === 'overview' && <DashboardOverview />}
            {dashboardView === 'events' && (
              <AdminPanel
                events={events}
                onAddEvent={handleAddEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                isAdmin={true}
              />
            )}
            {dashboardView === 'analytics' && <AnalyticsDashboard />}
            {dashboardView === 'profile' && (
              <MemberProfile userId={userEmail} isOwnProfile={true} />
            )}
            {dashboardView === 'gamification' && (
              <GamificationDashboard {...gamificationData} />
            )}
            {dashboardView === 'settings' && <SettingsPanel />}
            {dashboardView === 'members' && (
              <div className="text-center py-12">
                <p className="text-gray-600">قريباً: إدارة الأعضاء</p>
              </div>
            )}
            {dashboardView === 'myevents' && (
              <MyEventsPanel userEmail={userEmail} />
            )}
          </>
        )}
      </PanelLayout>
    );
  }

  // Show main website
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Navigation 
        currentLang={currentLang}
        onLanguageToggle={toggleLanguage}
        isDarkMode={isDarkMode}
        onDarkModeToggle={toggleDarkMode}
      />
      
      {/* Login button in top right */}
      <div className={`fixed ${currentLang === 'ar' ? 'left-4' : 'right-4'} top-20 z-40`}>
        <button
          onClick={() => setShowPanel(true)}
          className="px-4 py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] shadow-lg transition-colors"
        >
          {t('nav.panelLogin')}
        </button>
      </div>
      
      <main>
        <section id="home">
          <Hero lang={currentLang} />
        </section>
        <section id="about">
          <About lang={currentLang} />
        </section>
        <section id="events">
          <Events 
            events={events} 
            lang={currentLang}
            userEmail={userEmail}
            userRole={userRole}
            isLoggedIn={isLoggedIn}
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        </section>
        <section id="team">
          <Team lang={currentLang} />
        </section>
        <section id="contact">
          <Contact lang={currentLang} />
        </section>
      </main>
      <Footer lang={currentLang} />
    </div>
  );
}