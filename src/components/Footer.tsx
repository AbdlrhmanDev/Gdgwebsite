import { Mail, MapPin, Phone, Heart } from "lucide-react";
import { getTranslation, type Language } from "../lib/i18n";

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = (key: string) => getTranslation(lang, key);

  return (
    <footer className="bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      {/* Google Colors Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285f4] via-[#34a853] via-[#f9ab00] to-[#ea4335]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1 rtl:space-x-reverse">
                <span className="w-2 h-2 rounded-full bg-[#4285f4] animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-[#f9ab00] animate-pulse delay-150"></span>
                <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-pulse delay-200"></span>
              </div>
              <span className="text-xl font-bold tracking-tight">GDG Mustaqbal</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {lang === 'ar'
                ? 'مجتمع طلابي مدعوم من مطوري Google، يربط ويمكّن الطلاب في جامعة المستقبل.'
                : 'A student-led community powered by Google Developers, connecting and empowering students at Mustaqbal University.'}
            </p>
            <div className="flex gap-4">
                {/* Simple social icons placeholder */}
                {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="space-y-3">
              {["Home", "About", "Events", "Team", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#4285f4] transition-colors text-sm block transform hover:translate-x-1 rtl:hover:-translate-x-1 duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{lang === 'ar' ? 'اتصل بنا' : 'Contact'}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#ea4335]/20 transition-colors">
                    <Mail className="w-4 h-4 group-hover:text-[#ea4335] transition-colors" />
                </div>
                <span className="mt-1.5">gdg.uom2025@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group">
                 <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#f9ab00]/20 transition-colors">
                    <MapPin className="w-4 h-4 group-hover:text-[#f9ab00] transition-colors" />
                </div>
                <span className="mt-1.5">Mustaqbal University</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © 2025 GDG on Campus Mustaqbal University. Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> by Students.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
