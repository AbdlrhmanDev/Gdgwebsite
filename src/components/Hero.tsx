import { Button } from "./ui/button";
import { Calendar, Users, Code, ArrowRight, Sparkles, Globe, Terminal } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getTranslation, type Language } from "../lib/i18n";
import { motion } from "motion/react";
import techStudentImage from "figma:asset/101745775ed7931d75cee96c768e153f360b6304.png";

interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const t = (key: string) => getTranslation(lang, key);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-4rem)] flex items-center">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#4285f4]/10 blur-3xl dark:bg-[#4285f4]/20 animate-pulse"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-[#34a853]/10 blur-3xl dark:bg-[#34a853]/20" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#f9ab00]/10 blur-3xl dark:bg-[#f9ab00]/20" style={{animationDelay: '2s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-8 text-center lg:text-start"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full border border-border hover:bg-secondary transition-colors cursor-default mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4 text-[#f9ab00]" />
              <span className="text-sm font-medium text-muted-foreground">
                {lang === 'ar' ? 'المجتمع التقني الأول في جامعة المستقبل' : 'Premier Tech Community at Mustaqbal University'}
              </span>
            </motion.div>

            <motion.div variants={item} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-foreground">
                <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
                  <span className="text-[#4285f4]">{lang === 'ar' ? 'تواصل.' : 'Connect.'}</span>
                </span>{" "}
                <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
                  <span className="text-[#34a853]">{lang === 'ar' ? 'تعلم.' : 'Learn.'}</span>
                </span>{" "}
                <br className="hidden md:block" />
                <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
                  <span className="text-[#f9ab00]">{lang === 'ar' ? 'انمُ.' : 'Grow.'}</span>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.description')}
                {lang === 'ar' 
                  ? ' انضم إلينا لبناء المستقبل معاً من خلال التكنولوجيا والابتكار.'
                  : ' Join us to build the future together through technology and innovation.'}
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-14 px-8 text-lg bg-[#4285f4] hover:bg-[#3367d6] text-white font-medium rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/30">
                {t('hero.joinCommunity')}
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-secondary/50 font-medium rounded-2xl transition-all hover:scale-105">
                <Calendar className="w-5 h-5 mr-2" />
                {t('hero.viewEvents')}
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={item} className="pt-8 border-t border-border/50 mt-8">
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center lg:text-start space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Users className="w-5 h-5 text-[#4285f4]" />
                    <span className="text-2xl font-bold text-foreground">500+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('hero.members')}</p>
                </div>
                <div className="text-center lg:text-start space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Terminal className="w-5 h-5 text-[#34a853]" />
                    <span className="text-2xl font-bold text-foreground">50+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('hero.events')}</p>
                </div>
                <div className="text-center lg:text-start space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Globe className="w-5 h-5 text-[#f9ab00]" />
                    <span className="text-2xl font-bold text-foreground">30+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('hero.workshops')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
             <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                {/* Abstract shapes behind */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-[#4285f4] via-[#34a853] to-[#f9ab00] opacity-10 rounded-[40px] rotate-3"
                  animate={{ rotate: [3, 6, 3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-bl from-[#ea4335] via-[#f9ab00] to-[#4285f4] opacity-10 rounded-[40px] -rotate-3"
                  animate={{ rotate: [-3, -6, -3] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Main Image */}
                <div className="relative h-full w-full rounded-[32px] overflow-hidden shadow-2xl border-4 border-background">
                  <ImageWithFallback
                    src={techStudentImage}
                    alt="Tech Student"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Floating Cards */}
                <motion.div 
                  className="absolute -top-10 -right-10 p-4 bg-card/80 backdrop-blur-md rounded-2xl border shadow-xl max-w-[200px]"
                  animate={floatingAnimation}
                  style={{ animationDelay: '0s' }}
                >
                   <div className="flex items-start gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#34a853]/10 flex items-center justify-center shrink-0">
                       <Code className="w-5 h-5 text-[#34a853]" />
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-foreground">Workshops</p>
                        <p className="text-xs text-muted-foreground">Hands-on coding sessions</p>
                     </div>
                   </div>
                </motion.div>

                <motion.div 
                  className="absolute -bottom-8 -left-8 p-4 bg-card/80 backdrop-blur-md rounded-2xl border shadow-xl"
                  animate={floatingAnimation}
                  style={{ animationDelay: '1.5s' }}
                >
                   <div className="flex items-center gap-4">
                      <div className="flex -space-x-3 rtl:space-x-reverse">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                            {i}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">500+ Members</p>
                        <p className="text-xs text-[#4285f4] font-medium">Join the community</p>
                      </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}