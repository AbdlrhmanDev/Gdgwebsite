import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from '../components/About';
import { Events } from '../components/Events';
import { Team } from '../components/Team';
import { Leaderboard } from '../components/Leaderboard';
import { Contact } from '../components/Contact';
import { Footer } from "../components/Footer";
import { type Language } from "../lib/i18n";
import { type Event } from "../lib/storage";
import { useEffect } from "react"; // Import useEffect

interface HomePageProps {
  currentLang: Language;
  isDarkMode: boolean;
  events: Event[];
  onLanguageToggle: () => void;
  onLoginClick: () => void;
  onRefreshEvents: () => void;
  userEmail?: string;
  userRole?: 'admin' | 'member' | 'user';
  isLoggedIn?: boolean;
  highlightEventId?: string | null; // New prop
  onClearHighlightEventId?: () => void; // New prop
}

export default function HomePage({
  currentLang,
  isDarkMode,
  events,
  onLanguageToggle,
  onLoginClick,
  onRefreshEvents,
  userEmail,
  userRole,
  isLoggedIn,
  highlightEventId, // New prop
  onClearHighlightEventId // New prop
}: HomePageProps) {
  const t = (key: string) => {
    // Helper for translation if needed in this file,
    // but components handle their own translation
    return "";
  };
  const publicEvents = events.filter((event) => event.isPublic !== false);

  // Effect to scroll to the highlighted event
  useEffect(() => {
    if (highlightEventId) {
      const eventElement = document.getElementById(`event-${highlightEventId}`);
      if (eventElement) {
        eventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optionally clear the highlight ID after scrolling
        if (onClearHighlightEventId) {
          onClearHighlightEventId();
        }
      }
    }
  }, [highlightEventId, onClearHighlightEventId]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>      <Navigation 
        currentLang={currentLang}
        onLanguageToggle={onLanguageToggle}
        isDarkMode={isDarkMode}
      />
      
      <main>
        <section id="home">
          <Hero 
            lang={currentLang}
            onLoginClick={onLoginClick}
            isLoggedIn={isLoggedIn || false}
          />
        </section>
        <section id="about">
          <About lang={currentLang} />
        </section>
        <section id="leaderboard">
          <Leaderboard lang={currentLang} />
        </section>
        <section id="events">
          <Events 
            events={publicEvents} 
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
