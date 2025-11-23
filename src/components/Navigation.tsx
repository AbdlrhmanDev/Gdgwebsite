import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { getTranslation, type Language } from "../lib/i18n";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  currentLang: Language;
  onLanguageToggle: () => void;
  isDarkMode: boolean;
}

export function Navigation({ currentLang, onLanguageToggle, isDarkMode }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const t = (key: string) => getTranslation(currentLang, key);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.events'), href: "#events" },
    { name: t('nav.team'), href: "#team" },
    { name: currentLang === 'ar' ? 'المتصدرين' : 'Leaderboard', href: "#leaderboard" },
    { name: t('nav.contact'), href: "#contact" }
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm" 
          : "bg-transparent border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="flex items-center relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex relative z-10">
                <span className="w-3 h-3 rounded-full bg-[#4285f4] animate-bounce [animation-delay:0s]"></span>
                <span className={`w-3 h-3 rounded-full bg-[#34a853] animate-bounce [animation-delay:0.1s] ${currentLang === 'ar' ? '-mr-1' : '-ml-1'}`}></span>
                <span className={`w-3 h-3 rounded-full bg-[#f9ab00] animate-bounce [animation-delay:0.2s] ${currentLang === 'ar' ? '-mr-1' : '-ml-1'}`}></span>
                <span className={`w-3 h-3 rounded-full bg-[#ea4335] animate-bounce [animation-delay:0.3s] ${currentLang === 'ar' ? '-mr-1' : '-ml-1'}`}></span>
              </div>
            </div>
            <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all">
              {currentLang === 'ar' ? 'GDG المستقبل' : 'GDG Mustaqbal'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4285f4] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            
            <div className="h-6 w-px bg-border mx-2" />

            <button
              onClick={onLanguageToggle}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Globe className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium text-foreground hover:text-[#4285f4] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 flex items-center justify-center border-t border-border mt-4">
                <button onClick={onLanguageToggle} className="p-2 hover:bg-muted rounded-full">
                  <Globe className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
