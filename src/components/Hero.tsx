import { Button } from "./ui/button";
import { Calendar, Code, Terminal, ChevronRight, ArrowRight, Sparkles, Globe, Zap } from "lucide-react";
import { getTranslation, type Language } from "../lib/i18n";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const t = (key: string) => getTranslation(lang, key);
  const isRTL = lang === 'ar';

  // Typing effect state
  const [codeText, setCodeText] = useState("");
  const fullCode = `npm install gdg-community\n> Installing packages...\n> Added: networking\n> Added: workshops\n> Added: hackathons\n\n> Success! You are now connected.`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullCode.length) {
        setCodeText((prev) => prev + fullCode.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Floating animation variant
  const float = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-background py-16 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Blobs */}
        <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 8, repeat: Infinity }}
           className="absolute -top-[20%] left-[20%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 10, repeat: Infinity, delay: 1 }}
           className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]" 
        />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[90px]" />
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm hover:bg-secondary/80 transition-colors cursor-default shadow-sm">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span className="text-xs font-bold tracking-wide text-foreground uppercase">Future University Season 2025</span>
           </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]"
        >
          {lang === 'ar' ? (
             <>حيث يلتقي <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">الكود</span><br/>بالمجتمع الإبداعي.</>
          ) : (
             <>Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Code</span><br/>Meets Community.</>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          {lang === 'ar' 
            ? 'المنصة الأولى للمطورين في جامعة المستقبل. انضم إلينا لتعلم التقنيات الحديثة وبناء مشاريع حقيقية.'
            : 'The ultimate platform for developers at Future University. Join us to learn modern tech, ship real projects, and connect with creative minds.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
        >
          <Button size="lg" className="h-14 px-8 w-full sm:w-auto rounded-full bg-[#4285f4] hover:bg-[#3367d6] text-white text-base font-medium shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:-translate-y-0.5">
            {t('hero.joinCommunity')}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto rounded-full border-2 text-base font-medium bg-background/50 backdrop-blur-sm hover:bg-accent transition-all hover:scale-105 hover:-translate-y-0.5">
            <Calendar className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('hero.viewEvents')}
          </Button>
        </motion.div>

        {/* Centered Visual - Terminal Mockup */}
        <motion.div 
           initial={{ opacity: 0, y: 40, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.2 }}
           className="relative w-full max-w-4xl mx-auto perspective-1000"
        >
           {/* Main Window */}
           <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5 mx-4 md:mx-0 group hover:ring-blue-500/20 transition-all duration-500">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#151515] border-b border-white/5">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                 </div>
                 <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    <span>developer@future-university:~/gdg-project</span>
                 </div>
                 <div className="w-12" />
              </div>
              
              {/* Code Content */}
              <div className="p-6 md:p-8 font-mono text-sm md:text-base text-left leading-relaxed min-h-[200px] md:min-h-[280px] bg-[#0c0c0c]">
                 <div className="flex flex-col gap-2">
                    <div className="flex gap-2 text-emerald-400 font-bold">
                       <span className="text-blue-400">➜</span>
                       <span className="text-cyan-300">~/gdg-project</span>
                       <span className="text-white">git init</span>
                    </div>
                    <div className="text-gray-400">Initialized empty Git repository in /gdg-project/.git/</div>
                    
                    <div className="flex gap-2 text-emerald-400 font-bold mt-4">
                       <span className="text-blue-400">➜</span>
                       <span className="text-cyan-300">~/gdg-project</span>
                       <span className="text-white typing-effect">npm install gdg-community</span>
                    </div>
                    <div className="text-gray-300 mt-2">
                       <div className="whitespace-pre-wrap">
                         {codeText}
                         <span className="inline-block w-2.5 h-5 bg-gray-500 ml-1 animate-pulse align-middle" />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Background Glow behind window */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
           </div>

           {/* Floating Element: Workshop (Bottom Left) */}
           <motion.div 
             variants={float}
             animate="animate"
             className="absolute -bottom-6 -left-2 md:-left-8 bg-card border border-border p-4 rounded-xl shadow-xl w-[240px] z-20 hidden md:block"
           >
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Zap className="w-4 h-4" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-foreground">Live Workshop</p>
                    <p className="text-[10px] text-muted-foreground">React & Motion</p>
                 </div>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                 <div className="bg-blue-500 w-[70%] h-full rounded-full" />
              </div>
           </motion.div>

           {/* Floating Element: Community (Top Right) */}
           <motion.div 
             variants={float}
             animate="animate"
             style={{ animationDelay: '1.5s' }}
             className="absolute -top-6 -right-2 md:-right-8 bg-card border border-border p-3 rounded-xl shadow-xl flex items-center gap-3 z-20 hidden md:block"
           >
              <div className="flex -space-x-2 rtl:space-x-reverse">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-card" />
                 ))}
              </div>
              <div>
                 <p className="text-xs font-bold text-foreground">+500 Members</p>
                 <p className="text-[10px] text-green-500 font-medium">Active Now</p>
              </div>
           </motion.div>

        </motion.div>

        {/* Bottom Stats Row */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center w-full max-w-3xl border-t border-border pt-8"
        >
           {[
              { label: 'Active Members', value: '500+' },
              { label: 'Hosted Events', value: '50+' },
              { label: 'Workshops', value: '30+' },
              { label: 'Partners', value: '10+' },
           ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                 <span className="text-2xl md:text-3xl font-bold text-foreground block mb-1">{stat.value}</span>
                 <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}
