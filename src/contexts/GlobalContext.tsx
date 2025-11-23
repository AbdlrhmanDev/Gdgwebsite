"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTranslation, type Language } from "@/lib/i18n";
import { Event, getEvents, addEvent as saveEvent, updateEvent as saveUpdateEvent, deleteEvent as saveDeleteEvent, initializeDefaultData } from "@/lib/storage";
import { initializeDepartmentsData } from "@/lib/departments";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export type UserRole = 'admin' | 'member' | 'user';

interface GamificationData {
  userPoints: number;
  userLevel: number;
  userRank: number;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedDate?: string;
  }>;
}

interface GlobalContextType {
  // Auth
  isLoggedIn: boolean;
  userRole: UserRole;
  userEmail: string;
  login: (email: string, password: string, role: UserRole) => void;
  register: (email: string, password: string, name: string, studentId: string) => void;
  logout: () => void;

  // Language
  currentLang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;

  // Events
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => void;
  editEvent: (id: string, updatedEvent: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => void;
  deleteEvent: (id: string) => void;
  refreshEvents: () => void;

  // Gamification
  gamificationData: GamificationData;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userEmail, setUserEmail] = useState('');

  // Language State
  const [currentLang, setCurrentLang] = useState<Language>('ar');

  // Events State
  const [events, setEvents] = useState<Event[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Initialize data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeDefaultData();
      initializeDepartmentsData();
      loadEvents();
    }
  }, [refreshKey]);

  const loadEvents = () => {
    setEvents(getEvents());
  };

  // Language Direction
  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

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

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string) => getTranslation(currentLang, key);

  const login = (email: string, password: string, role: UserRole) => {
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
      router.push('/dashboard');
    } else {
      alert('بيانات الاعتماد غير صحيحة. يرجى استخدام بيانات الاعتماد التجريبية المقدمة.');
    }
  };

  const register = (email: string, password: string, name: string, studentId: string) => {
    // Simulate registration
    alert(`تم التسجيل بنجاح! مرحباً ${name}`);
    
    setIsLoggedIn(true);
    setUserRole('member');
    setUserEmail(email);
    router.push('/dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    router.push('/');
  };

  const addEvent = (event: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => {
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

  const editEvent = (id: string, updatedEvent: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => {
    saveUpdateEvent(id, updatedEvent);
    setRefreshKey(prev => prev + 1);
  };

  const deleteEvent = (id: string) => {
    saveDeleteEvent(id);
    setRefreshKey(prev => prev + 1);
  };

  const refreshEvents = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      userRole,
      userEmail,
      login,
      register,
      logout,
      currentLang,
      toggleLanguage,
      t,
      events,
      addEvent,
      editEvent,
      deleteEvent,
      refreshEvents,
      gamificationData
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
