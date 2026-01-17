// نظام تخزين البيانات باستخدام localStorage
// في الإنتاج، يمكن استبداله بقاعدة بيانات حقيقية (Supabase, Firebase, etc.)

import { RegistrationConfig } from './registration-methods';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  capacity: number;
  image: string;
  status: string;
  color: string;
  description: string;
  createdBy: string;
  createdAt: string;
  tags: string[];
  isOnline: boolean;
  meetingLink?: string;
  requirements?: string;
  registrationMethod?: RegistrationConfig; // طريقة التسجيل
  isPublic?: boolean;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  userEmail: string;
  userName: string;
  registeredAt: string;
  status: 'registered' | 'attended' | 'cancelled';
  qrCode: string;
  certificateId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'user';
  studentId?: string;
  points: number;
  level: number;
  joinedAt: string;
}

// Events Storage
export const saveEvents = (events: Event[]) => {
  localStorage.setItem('gdg_events', JSON.stringify(events));
};

export const getEvents = (): Event[] => {
  const data = localStorage.getItem('gdg_events');
  return data ? JSON.parse(data) : [];
};

export const addEvent = (event: Event) => {
  const events = getEvents();
  events.push(event);
  saveEvents(events);
};

export const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent };
    saveEvents(events);
  }
};

export const deleteEvent = (id: string) => {
  const events = getEvents().filter(e => e.id !== id);
  saveEvents(events);
};

export const getEventById = (id: string): Event | undefined => {
  return getEvents().find(e => e.id === id);
};

// Registrations Storage
export const saveRegistrations = (registrations: EventRegistration[]) => {
  localStorage.setItem('gdg_registrations', JSON.stringify(registrations));
};

export const getRegistrations = (): EventRegistration[] => {
  const data = localStorage.getItem('gdg_registrations');
  return data ? JSON.parse(data) : [];
};

export const addRegistration = (registration: EventRegistration) => {
  const registrations = getRegistrations();
  registrations.push(registration);
  saveRegistrations(registrations);
};

export const getEventRegistrations = (eventId: string): EventRegistration[] => {
  return getRegistrations().filter(r => r.eventId === eventId);
};

export const getUserRegistrations = (userId: string): EventRegistration[] => {
  return getRegistrations().filter(r => r.userId === userId);
};

export const updateRegistrationStatus = (id: string, status: 'registered' | 'attended' | 'cancelled') => {
  const registrations = getRegistrations();
  const index = registrations.findIndex(r => r.id === id);
  if (index !== -1) {
    registrations[index].status = status;
    saveRegistrations(registrations);
  }
};

export const isUserRegistered = (eventId: string, userId: string): boolean => {
  return getRegistrations().some(r => r.eventId === eventId && r.userId === userId && r.status !== 'cancelled');
};

// Users Storage
export const saveUsers = (users: User[]) => {
  localStorage.setItem('gdg_users', JSON.stringify(users));
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem('gdg_users');
  return data ? JSON.parse(data) : [];
};

export const getUserByEmail = (email: string): User | undefined => {
  return getUsers().find(u => u.email === email);
};

export const updateUserPoints = (userId: string, points: number) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index].points += points;
    // Update level based on points
    users[index].level = Math.floor(users[index].points / 1000) + 1;
    saveUsers(users);
  }
};

// Generate QR Code (simplified - in production use a library)
export const generateQRCode = (data: string): string => {
  return `qr_${btoa(data)}_${Date.now()}`;
};

// Initialize default data
export const initializeDefaultData = () => {
  // Check if data already exists
  if (getEvents().length === 0) {
    const defaultEvents: Event[] = [
      {
        id: '1',
        title: "ورشة تطوير Android",
        date: "25 نوفمبر 2025",
        time: "2:00 م - 5:00 م",
        location: "قاعة الهندسة، غرفة 301",
        attendees: 0,
        capacity: 120,
        image: "https://images.unsplash.com/photo-1580893207371-9ae163385856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjI4NjU3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "قريباً",
        color: "#4285f4",
        description: "تعلم أساسيات تطوير تطبيقات Android باستخدام Kotlin و Android Studio. ستتعلم كيفية بناء تطبيقات احترافية من الصفر.",
        createdBy: "admin@gdg.com",
        createdAt: new Date().toISOString(),
        tags: ["Android", "Mobile", "Kotlin"],
        isOnline: false,
        requirements: "معرفة أساسية بالبرمجة، جهاز لابتوب",
        isPublic: true
      },
      {
        id: '2',
        title: "دورة الحوسبة السحابية",
        date: "5 ديسمبر 2025",
        time: "10:00 ص - 4:00 م",
        location: "مختبر الحاسب 2",
        attendees: 0,
        capacity: 80,
        image: "https://images.unsplash.com/photo-1762637119368-4b31d37916e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tbXVuaXR5JTIwZXZlbnR8ZW58MXx8fHwxNzYyODc2Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        status: "التسجيل مفتوح",
        color: "#34a853",
        description: "استكشاف عميق لتقنيات الحوسبة السحابية مع Google Cloud Platform. تعلم كيفية نشر وإدارة التطبيقات على السحابة.",
        createdBy: "admin@gdg.com",
        createdAt: new Date().toISOString(),
        tags: ["Cloud", "GCP", "DevOps"],
        isOnline: true,
        meetingLink: "https://meet.google.com/xxx-yyyy-zzz",
        requirements: "حساب Google Cloud (مجاني)",
        isPublic: true
      },
      {
        id: '3',
        title: "هاكاثون تطوير الويب",
        date: "15 ديسمبر 2025",
        time: "9:00 ص - 6:00 م",
        location: "القاعة الرئيسية",
        attendees: 0,
        capacity: 200,
        image: "https://images.unsplash.com/photo-1544531585-f14f463149ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2Mjg3NjY3NXww&ixlib=rb-4.1.0&q=80&w=1080",
        status: "التسجيل مفتوح",
        color: "#f9ab00",
        description: "تحدي مكثف لمدة يوم كامل لبناء تطبيقات ويب مبتكرة. فرق من 3-5 أشخاص، جوائز قيمة للفائزين!",
        createdBy: "admin@gdg.com",
        createdAt: new Date().toISOString(),
        tags: ["Web", "Hackathon", "Competition"],
        isOnline: false,
        requirements: "فريق من 3-5 أشخاص، لابتوب لكل عضو",
        isPublic: true
      }
    ];
    saveEvents(defaultEvents);
  }
};