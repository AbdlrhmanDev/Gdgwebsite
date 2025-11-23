import { Linkedin, Github, Mail } from "lucide-react";
import { motion } from "motion/react";
import { getTranslation, type Language } from "../lib/i18n";
import { useState, useEffect } from "react";
import { userService } from "../services/userService";

interface TeamProps {
  lang: Language;
}

export function Team({ lang }: TeamProps) {
  const t = (key: string) => getTranslation(lang, key);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      // Use public endpoint that doesn't require authentication
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users/public/team`);
      const data = await response.json();
      
      if (data.success) {
        // Filter only admins and members, sort by role (admins first) then by points
        const teamMembers = data.data
          .filter((user: any) => user.role === 'admin' || user.role === 'member')
          .sort((a: any, b: any) => {
            if (a.role === 'admin' && b.role !== 'admin') return -1;
            if (a.role !== 'admin' && b.role === 'admin') return 1;
            return b.points - a.points;
          })
          .slice(0, 6); // Show top 6 team members
        
        setTeam(teamMembers);
      }
    } catch (error) {
      console.error('Failed to load team members:', error);
      // Set empty team on error to prevent infinite loop
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  const getRoleLabel = (role: string) => {
    if (lang === 'ar') {
      return role === 'admin' ? 'قائد الفريق' : 'عضو الفريق';
    }
    return role === 'admin' ? 'Team Lead' : 'Team Member';
  };

  const getColorForIndex = (index: number) => {
    const colors = ['#4285f4', '#34a853', '#f9ab00', '#ea4335', '#4285f4', '#34a853'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-background py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#f9ab00]">
               {lang === 'ar' ? 'فريقنا' : 'Meet Our Team'}
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {lang === 'ar'
              ? 'طلاب شغوفون يقودون الطريق لبناء مجتمع مطورين رائع'
              : 'Passionate students leading the way to create an amazing developer community'}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285f4]"></div>
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {lang === 'ar' ? 'لا يوجد أعضاء فريق حالياً' : 'No team members available'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {team.map((member, index) => {
              const color = getColorForIndex(index);
              const initial = member.name.charAt(0).toUpperCase();
              
              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card border border-border rounded-[2rem] p-8 text-center hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <div 
                      className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
                      style={{ backgroundColor: color }}
                    />
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="relative w-full h-full rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="relative w-full h-full rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundColor: color }}
                      >
                        {initial}
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground font-medium mb-2">
                    {getRoleLabel(member.role)}
                  </p>
                  {member.department && (
                    <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: member.department.color }}
                      />
                      {member.department.nameAr}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-sm font-medium text-[#f9ab00]">
                      {member.points || 0} {lang === 'ar' ? 'نقطة' : 'points'}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm font-medium text-[#4285f4]">
                      {lang === 'ar' ? 'المستوى' : 'Level'} {member.level || 1}
                    </span>
                  </div>

                  <div className="flex justify-center gap-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 rounded-full bg-muted hover:bg-foreground/5 text-muted-foreground hover:text-foreground flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted hover:bg-foreground/5 text-muted-foreground hover:text-foreground flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted hover:bg-foreground/5 text-muted-foreground hover:text-foreground flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-card to-muted rounded-[2.5rem] border border-border p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
             <h3 className="text-3xl font-bold mb-4">
               {lang === 'ar' ? 'هل تريد الانضمام لفريقنا؟' : 'Want to join our team?'}
             </h3>
             <p className="text-lg text-muted-foreground mb-8">
               {lang === 'ar'
                 ? 'نحن نبحث دائماً عن طلاب شغوفين للمساعدة في تنظيم الفعاليات وتنمية مجتمعنا. يفتح باب التقديم في بداية كل فصل دراسي.'
                 : "We're always looking for passionate students to help organize events and grow our community. Applications open at the start of each semester."}
             </p>
             <button className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg">
               {lang === 'ar' ? 'قدم الآن' : 'Apply Now'}
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
