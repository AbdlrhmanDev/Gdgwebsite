import { useState, useEffect } from "react";
import { getTranslation, type Language } from "./lib/i18n";
import { Event, getEvents, addEvent as saveEvent, updateEvent as saveUpdateEvent, deleteEvent as saveDeleteEvent, initializeDefaultData } from "./lib/storage";
import { initializeDepartmentsData } from "./lib/departments";

// Import Pages mimicking Next.js Routing
import HomePage from "./app/page";
import LoginPage from "./app/login/page";
import RegisterPage from "./app/register/page";
import DashboardPage from "./app/dashboard/page";

export type UserRole = 'admin' | 'member' | 'user';

export default function App() {
  // Routing State
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  
  // App State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userEmail, setUserEmail] = useState('');
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Load events from storage
  const [events, setEvents] = useState<Event[]>([]);

  // Initialize data and load events
  useEffect(() => {
    initializeDefaultData();
    initializeDepartmentsData();
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
  
  // Add smooth scroll
  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
  }, []);

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
      setCurrentRoute('/dashboard');
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
    setCurrentRoute('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentRoute('/');
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
      // This will be handled by EventDetailsModal internally in components
      alert(`سيتم توجيهك لصفحة التسجيل في: ${event.title}`);
    }
  };

  // Router Logic
  if (currentRoute === '/register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onBackToLogin={() => setCurrentRoute('/login')}
      />
    );
  }

  if (currentRoute === '/login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegisterClick={() => setCurrentRoute('/register')}
      />
    );
  }

  if (currentRoute === '/dashboard' || currentRoute.startsWith('/dashboard')) {
    if (!isLoggedIn) {
       setCurrentRoute('/login');
       return null;
    }
    return (
      <DashboardPage
        userRole={userRole}
        userEmail={userEmail}
        events={events}
        onLogout={handleLogout}
        onNavigateToSite={() => setCurrentRoute('/')}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        onRegisterForEvent={handleRegisterForEvent}
        gamificationData={gamificationData}
      />
    );
  }

  // Default / Landing Page
  return (
    <HomePage
      currentLang={currentLang}
      isDarkMode={isDarkMode}
      events={events}
      onLanguageToggle={toggleLanguage}
      onDarkModeToggle={toggleDarkMode}
      onLoginClick={() => setCurrentRoute(isLoggedIn ? '/dashboard' : '/login')}
      onRefreshEvents={() => setRefreshKey(prev => prev + 1)}
      userEmail={userEmail}
      userRole={userRole}
      isLoggedIn={isLoggedIn}
    />
  );
}
