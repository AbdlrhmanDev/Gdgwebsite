import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { DarkModeToggle } from "./DarkModeToggle";
import { getTranslation, type Language } from "../lib/i18n";

interface NavigationProps {
  currentLang: Language;
  onLanguageToggle: () => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

export function Navigation({ currentLang, onLanguageToggle, isDarkMode, onDarkModeToggle }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const t = (key: string) => getTranslation(currentLang, key);

  const navItems = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.events'), href: "#events" },
    { name: t('nav.team'), href: "#team" },
    { name: t('nav.contact'), href: "#contact" }
  ];

  return (
    <nav className={`border-b sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex">
              <span className="w-3 h-3 rounded-full bg-[#4285f4]"></span>
              <span className={`w-3 h-3 rounded-full bg-[#34a853] ${currentLang === 'ar' ? '-mr-1' : '-ml-1'}`}></span>
              <span className={`w-3 h-3 rounded-full bg-[#f9ab00] ${currentLang === 'ar' ? '-mr-1' : '-ml-1'}`}></span>
              <span className={`w-3 h-3 rounded-full bg-[#ea4335] ${currentLang === 'ar' ? '-mr-1' : '-ml-1'}`}></span>
            </div>
            <span className={`text-lg ${isDarkMode ? 'text-white' : ''}`}>
              {currentLang === 'ar' ? 'GDG المستقبل' : 'GDG Mustaqbal'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-[#4285f4]' : 'text-gray-700 hover:text-[#4285f4]'}`}
              >
                {item.name}
              </a>
            ))}
            <DarkModeToggle isDark={isDarkMode} onToggle={onDarkModeToggle} />
            <LanguageToggle currentLang={currentLang} onToggle={onLanguageToggle} />
            <Button className="bg-[#4285f4] hover:bg-[#3367d6]">
              {t('nav.joinUs')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <DarkModeToggle isDark={isDarkMode} onToggle={onDarkModeToggle} />
            <LanguageToggle currentLang={currentLang} onToggle={onLanguageToggle} />
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : ''}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : ''}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block transition-colors ${isDarkMode ? 'text-gray-300 hover:text-[#4285f4]' : 'text-gray-700 hover:text-[#4285f4]'}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button className="w-full bg-[#4285f4] hover:bg-[#3367d6]">
              {t('nav.joinUs')}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}