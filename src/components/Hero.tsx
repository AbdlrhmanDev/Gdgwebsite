import { Button } from "./ui/button";
import { Calendar, Users, Code } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getTranslation, type Language } from "../lib/i18n";

interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const t = (key: string) => getTranslation(lang, key);
  
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Colorful background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#4285f4] opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-[#34a853] opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#f9ab00] opacity-10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0f0f0] rounded-full">
              <div className="flex">
                <span className="w-2 h-2 rounded-full bg-[#4285f4]"></span>
                <span className={`w-2 h-2 rounded-full bg-[#34a853] ${lang === 'ar' ? '-mr-0.5' : '-ml-0.5'}`}></span>
                <span className={`w-2 h-2 rounded-full bg-[#f9ab00] ${lang === 'ar' ? '-mr-0.5' : '-ml-0.5'}`}></span>
                <span className={`w-2 h-2 rounded-full bg-[#ea4335] ${lang === 'ar' ? '-mr-0.5' : '-ml-0.5'}`}></span>
              </div>
              <span className="text-sm text-[#1e1e1e]">
                {lang === 'ar' ? 'مجموعة مطوري Google' : 'Google Developer Group'}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl">
                <span className="text-[#4285f4]">{lang === 'ar' ? 'تواصل.' : 'Connect.'}</span>{" "}
                <span className="text-[#34a853]">{lang === 'ar' ? 'تعلم.' : 'Learn.'}</span>{" "}
                <span className="text-[#f9ab00]">{lang === 'ar' ? 'انمُ.' : 'Grow.'}</span>
              </h1>
              <p className="text-xl text-gray-600">
                {t('hero.subtitle')}
              </p>
            </div>

            <p className="text-gray-700">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#4285f4] hover:bg-[#3367d6]">
                {t('hero.joinCommunity')}
              </Button>
              <Button variant="outline" className="border-[#4285f4] text-[#4285f4]">
                {t('hero.viewEvents')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4285f4]" />
                  <span className="text-2xl">500+</span>
                </div>
                <p className="text-sm text-gray-600">{t('hero.members')}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#34a853]" />
                  <span className="text-2xl">50+</span>
                </div>
                <p className="text-sm text-gray-600">{t('hero.events')}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#f9ab00]" />
                  <span className="text-2xl">30+</span>
                </div>
                <p className="text-sm text-gray-600">{t('hero.workshops')}</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#4285f4] via-[#34a853] to-[#f9ab00] opacity-20 blur-2xl rounded-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mjc4NDgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="GDG students"
              className="relative rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}