import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Events } from "../components/Events";
import { Team } from "../components/Team";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { type Language } from "../lib/i18n";
import { type Event } from "../lib/storage";

interface HomePageProps {
  currentLang: Language;
  isDarkMode: boolean;
  events: Event[];
  onLanguageToggle: () => void;
  onDarkModeToggle: () => void;
  onLoginClick: () => void;
  onRefreshEvents: () => void;
  userEmail?: string;
  userRole?: 'admin' | 'member' | 'user';
  isLoggedIn?: boolean;
}

export default function HomePage({
  currentLang,
  isDarkMode,
  events,
  onLanguageToggle,
  onDarkModeToggle,
  onLoginClick,
  onRefreshEvents,
  userEmail,
  userRole,
  isLoggedIn
}: HomePageProps) {
  const t = (key: string) => {
    // Helper for translation if needed in this file, 
    // but components handle their own translation
    return ""; 
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Navigation 
        currentLang={currentLang}
        onLanguageToggle={onLanguageToggle}
        isDarkMode={isDarkMode}
        onDarkModeToggle={onDarkModeToggle}
      />
      
      {/* Login button overlay for quick access - consistent with original design */}
      <div className={`fixed ${currentLang === 'ar' ? 'left-4' : 'right-4'} top-20 z-40`}>
        <button
          onClick={onLoginClick}
          className="px-4 py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] shadow-lg transition-colors"
        >
          {currentLang === 'ar' ? 'دخول اللوحة' : 'Panel Login'}
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
            onRefresh={onRefreshEvents}
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
