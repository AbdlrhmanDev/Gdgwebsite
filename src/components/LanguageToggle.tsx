import { Globe } from "lucide-react";
import { Button } from "./ui/button";

interface LanguageToggleProps {
  currentLang: 'ar' | 'en';
  onToggle: () => void;
}

export function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="gap-2"
    >
      <Globe className="w-4 h-4" />
      <span>{currentLang === 'ar' ? 'EN' : 'AR'}</span>
    </Button>
  );
}
