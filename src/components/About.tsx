import { Code, Users, Lightbulb, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { getTranslation, type Language } from "../lib/i18n";

interface AboutProps {
  lang: Language;
}

export function About({ lang }: AboutProps) {
  const t = (key: string) => getTranslation(lang, key);

  const features = [
    {
      icon: Code,
      color: "#4285f4", // Google Blue
      title: lang === 'ar' ? "تعلم وابنِ" : "Learn & Build",
      description: lang === 'ar' 
        ? "اكتسب خبرة عملية مع تقنيات Google وأدوات التطوير الحديثة"
        : "Get hands-on experience with Google technologies and modern development tools"
    },
    {
      icon: Users,
      color: "#34a853", // Google Green
      title: lang === 'ar' ? "تواصل" : "Network",
      description: lang === 'ar'
        ? "تواصل مع زملائك المطورين وخبراء الصناعة ومحترفي Google"
        : "Connect with fellow developers, industry experts, and Google professionals"
    },
    {
      icon: Lightbulb,
      color: "#f9ab00", // Google Yellow
      title: lang === 'ar' ? "ابتكر" : "Innovate",
      description: lang === 'ar'
        ? "اعمل على مشاريع مثيرة وشارك في الهاكاثونات والمسابقات"
        : "Work on exciting projects and participate in hackathons and competitions"
    },
    {
      icon: Rocket,
      color: "#ea4335", // Google Red
      title: lang === 'ar' ? "انمُ" : "Grow",
      description: lang === 'ar'
        ? "عزز مهاراتك من خلال ورش العمل والمحادثات وبرامج التوجيه"
        : "Enhance your skills through workshops, talks, and mentorship programs"
    }
  ];

  return (
    <div className="relative bg-background py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {lang === 'ar' ? 'عن GDG في الحرم الجامعي' : 'About GDG on Campus'}
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {lang === 'ar' 
              ? 'نحن مجتمع من الطلاب الشغوفين في جامعة المستقبل مكرسون لتعلم تقنيات Google وإحداث تأثير من خلال التطوير.'
              : 'We are a community of passionate students at Mustaqbal University dedicated to learning about Google technologies and making an impact through development.'}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative p-1 rounded-[2.5rem] bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#f9ab00]"
        >
          <div className="bg-background rounded-[2.4rem] p-10 md:p-16 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
             <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">
                  {lang === 'ar' ? 'مهمتنا' : 'Our Mission'}
                </h3>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? 'في GDG on Campus جامعة المستقبل، نهدف إلى خلق بيئة شاملة حيث يمكن للطلاب استكشاف شغفهم بالتكنولوجيا وتطوير مهاراتهم وبناء حلول مبتكرة. ننظم ورش عمل، ومسابقات برمجية، وفعاليات تواصل لمساعدة مجتمعنا على النمو معاً.'
                    : 'At GDG on Campus Mustaqbal University, we aim to create an inclusive environment where students can explore their passion for technology, develop their skills, and build innovative solutions. We organize workshops, study jams, hackathons, and networking events to help our community grow together.'}
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
