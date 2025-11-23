"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useGlobal } from "@/contexts/GlobalContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const {
    currentLang,
    toggleLanguage,
    events,
    refreshEvents,
    userEmail,
    userRole,
    isLoggedIn
  } = useGlobal();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === 'dark';

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Navigation
        currentLang={currentLang}
        onLanguageToggle={toggleLanguage}
        isDarkMode={isDarkMode}
        onDarkModeToggle={toggleDarkMode}
      />

      {/* Login button overlay for quick access */}
      <div className={`fixed ${currentLang === 'ar' ? 'left-4' : 'right-4'} top-20 z-40`}>
        <button
          onClick={handleLoginClick}
          className="px-4 py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6] shadow-lg transition-colors cursor-pointer"
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
            onRefresh={refreshEvents}
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
