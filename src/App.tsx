import { useState, useEffect } from "react";
import { type Language } from "./lib/i18n";
import { authService } from "./services/authService";
import { eventService, type Event as ApiEvent } from "./services/eventService";
import { userService } from "./services/userService";
import { badgeService } from "./services/badgeService";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Import Pages mimicking Next.js Routing
import HomePage from "./app/page";
import LoginPage from "./app/login/page";
import RegisterPage from "./app/register/page";
import DashboardPage from "./app/dashboard/page";

export type UserRole = 'admin' | 'member' | 'user' | 'leader';

// Map API event to local event format
const mapApiEvent = (apiEvent: ApiEvent): any => ({
  id: apiEvent._id || apiEvent.id,
  title: apiEvent.title,
  titleEn: apiEvent.titleEn,
  description: apiEvent.description,
  descriptionEn: apiEvent.descriptionEn,
  date: apiEvent.date,
  time: apiEvent.time,
  location: apiEvent.location,
  locationEn: apiEvent.locationEn,
  type: apiEvent.type,
  category: apiEvent.category,
  image: apiEvent.image,
  capacity: apiEvent.capacity,
  attendees: apiEvent.attendees,
  registrationMethod: apiEvent.registrationMethod,
  registrationUrl: apiEvent.registrationUrl,
  status: apiEvent.status,
  featured: apiEvent.featured,
  tags: apiEvent.tags,
  createdAt: apiEvent.createdAt,
  createdBy: apiEvent.createdBy,
});

export default function App() {
  // Routing State - initialize from URL
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  
  // App State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [isDarkMode] = useState(true); // Always dark mode
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Load events from API
  const [events, setEvents] = useState<any[]>([]);
  const [gamificationData, setGamificationData] = useState({
    userPoints: 0,
    userLevel: 1,
    userRank: 0,
    badges: []
  });

  // Sync route changes with browser URL
  useEffect(() => {
    window.history.pushState({}, '', currentRoute);
  }, [currentRoute]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && authService.isAuthenticated()) {
      setIsLoggedIn(true);
      setUserRole(user.role);
      setUserEmail(user.email);
      setUserId(user.id);
      loadGamificationData(user.id);
      // Redirect to dashboard if on login/register pages
      if (currentRoute === '/login' || currentRoute === '/register') {
        setCurrentRoute('/dashboard');
      }
    }
    setLoading(false);
  }, []);

  // Load gamification data
  const loadGamificationData = async (userId: string) => {
    try {
      // Fetch user data for points, level
      const userResponse = await userService.getUser(userId);
      if (userResponse.success) {
        const userData = userResponse.data;
        
        // Fetch user rank
        const rankResponse = await userService.getUserRank(userId);
        let userRank = 0;
        if (rankResponse.success) {
          userRank = rankResponse.data.rank;
        }
        
        // Fetch user badges
        const badgesResponse = await badgeService.getBadges();
        let userBadges: any[] = [];
        if (badgesResponse.success) {
          userBadges = badgesResponse.data.map((badge: any) => ({
            id: badge._id,
            name: badge.name,
            description: badge.description,
            icon: badge.icon || '🏆',
            earned: userData.badges?.includes(badge._id) || false,
            earnedDate: userData.badges?.includes(badge._id) ? badge.createdAt : undefined
          }));
        }
        
        setGamificationData({
          userPoints: userData.points || 0,
          userLevel: userData.level || 1,
          userRank: userRank,
          badges: userBadges
        });
      }
    } catch (error) {
      console.error('Failed to load gamification data:', error);
    }
  };

  // Load events from API
  useEffect(() => {
    loadEvents();
  }, [refreshKey]);

  const loadEvents = async () => {
    try {
      const response = await eventService.getEvents();
      if (response.success) {
        setEvents(response.data.map(mapApiEvent));
      }
    } catch (error) {
      console.error('Failed to load events:', error);
      setEvents([]);
    }
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

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      
      if (response.success) {
        toast.success('تم تسجيل الدخول بنجاح!');
        setIsLoggedIn(true);
        setUserRole(response.user.role);
        setUserEmail(response.user.email);
        setUserId(response.user.id);
        setCurrentRoute('/dashboard');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد.';
      toast.error(message);
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (email: string, password: string, name: string, studentId: string) => {
    try {
      const response = await authService.register({
        name,
        email,
        password,
        studentId,
        department: 'none',
      });
      
      if (response.success) {
        toast.success(`تم التسجيل بنجاح! مرحباً ${name}`);
        setIsLoggedIn(true);
        setUserRole(response.user.role);
        setUserEmail(response.user.email);
        setCurrentRoute('/dashboard');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل التسجيل. يرجى المحاولة مرة أخرى.';
      toast.error(message);
      console.error('Registration failed:', error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUserEmail('');
    setUserRole('user');
    setCurrentRoute('/');
  };

  const handleAddEvent = async (event: any) => {
    try {
      const response = await eventService.createEvent(event);
      if (response.success) {
        setRefreshKey(prev => prev + 1);
        toast.success('تم إنشاء الفعالية بنجاح!');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل إنشاء الفعالية';
      toast.error(message);
      console.error('Failed to create event:', error);
    }
  };

  const handleEditEvent = async (id: string, updatedEvent: any) => {
    try {
      const response = await eventService.updateEvent(id, updatedEvent);
      if (response.success) {
        setRefreshKey(prev => prev + 1);
        toast.success('تم تحديث الفعالية بنجاح!');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل تحديث الفعالية';
      toast.error(message);
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await eventService.deleteEvent(id);
      if (response.success) {
        setRefreshKey(prev => prev + 1);
        toast.success('تم حذف الفعالية بنجاح!');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل حذف الفعالية';
      toast.error(message);
      console.error('Failed to delete event:', error);
    }
  };

  const handleRegisterForEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      // This will be handled by EventDetailsModal internally in components
      toast(`سيتم توجيهك لصفحة التسجيل في: ${event.title}`);
    }
  };

  const renderPage = () => {
    // Show loading state
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
          </div>
        </div>
      );
    }

    // If logged in and trying to access login/register, redirect to dashboard
    if (isLoggedIn && (currentRoute === '/login' || currentRoute === '/register')) {
      setCurrentRoute('/dashboard');
      return null;
    }

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
          userId={userId}
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
        onLoginClick={() => setCurrentRoute(isLoggedIn ? '/dashboard' : '/login')}
        onRefreshEvents={() => setRefreshKey(prev => prev + 1)}
        userEmail={userEmail}
        userRole={userRole}
        isLoggedIn={isLoggedIn}
      />
    );
  };
  
  return (
    <>
      <Toaster richColors position="bottom-right" />
      {renderPage()}
    </>
  );
}
