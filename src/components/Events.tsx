import { useState } from "react";
import { Calendar, MapPin, Clock, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EventDetailsModal } from "./EventDetailsModal";
import { Event } from "../lib/storage";
import { type Language, getTranslation } from "../lib/i18n";
import { motion } from "motion/react";

interface EventsProps {
  events: Event[];
  lang: Language;
  userEmail?: string;
  userRole?: 'admin' | 'member' | 'user';
  isLoggedIn?: boolean;
  onRefresh?: () => void;
}

export function Events({ events, lang, userEmail = '', userRole = 'user', isLoggedIn = false, onRefresh }: EventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = (key: string) => getTranslation(lang, key);
  const isRTL = lang === 'ar';

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegisterSuccess = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  // Fallback demo events if none provided
  const displayEvents = events.length > 0 ? events : [];

  return (
    <section className="bg-background py-24 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', 
             backgroundSize: '32px 32px' 
           }}>
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground tracking-tight"
          >
            {lang === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {lang === 'ar' 
              ? 'انضم إلينا في ورش العمل والمحاضرات وفرص التواصل الممتعة'
              : 'Join us for exciting workshops, talks, and networking opportunities'
            }
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {displayEvents.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-card rounded-3xl border border-dashed border-border">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                 <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {lang === 'ar' ? 'لا توجد فعاليات حالياً' : 'No Events Scheduled'}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {lang === 'ar' ? 'تابعنا لمعرفة المزيد عن ورش العمل والهاكاثونات القادمة.' : 'Stay tuned for upcoming workshops and hackathons.'}
              </p>
            </div>
          ) : (
            displayEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-border rounded-[32px] overflow-hidden hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
                onClick={() => handleEventClick(event)}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-80" />
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute top-4 left-4 z-20">
                     <Badge className="bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 px-3 py-1 text-xs uppercase tracking-widest">
                        {event.type || 'Workshop'}
                     </Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                     {event.status && (
                       <Badge className={`border-0 text-white shadow-lg px-3 py-1`} style={{ backgroundColor: event.color }}>
                          {event.status}
                       </Badge>
                     )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow relative">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-6 line-clamp-2 leading-tight group-hover:text-[#4285f4] transition-colors">
                    {event.title}
                  </h3>

                  {/* Details Grid */}
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-start gap-4 group/icon">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 group-hover/icon:bg-background transition-colors">
                         <Calendar className="w-5 h-5 text-muted-foreground group-hover/icon:text-[#4285f4] transition-colors" />
                      </div>
                      <div>
                         <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{lang === 'ar' ? 'التاريخ' : 'Date'}</p>
                         <p className="text-sm font-medium text-foreground">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group/icon">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 group-hover/icon:bg-background transition-colors">
                         <Clock className="w-5 h-5 text-muted-foreground group-hover/icon:text-[#f9ab00] transition-colors" />
                      </div>
                      <div>
                         <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{lang === 'ar' ? 'الوقت' : 'Time'}</p>
                         <p className="text-sm font-medium text-foreground">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group/icon">
                       <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 group-hover/icon:bg-background transition-colors">
                         <MapPin className="w-5 h-5 text-muted-foreground group-hover/icon:text-[#34a853] transition-colors" />
                       </div>
                       <div>
                         <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{lang === 'ar' ? 'الموقع' : 'Location'}</p>
                         <p className="text-sm font-medium text-foreground line-clamp-1">{event.location}</p>
                       </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full h-14 rounded-2xl text-base font-bold text-white shadow-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: event.color }}
                  >
                    <span className="flex-1 text-center">{lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
                    <div className="bg-white/20 rounded-full p-1">
                       <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom CTA Section ("Missed an event?") - Kept Dark/Unique as per User Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-[#151515] shadow-2xl border-t border-white/5"
        >
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#f9ab00]" />
          
          <div className="relative z-10 p-12 md:p-20 text-center">
             {/* Using the specific layout from user image */}
             <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
               {lang === 'ar' ? 'فاتتك فعالية؟' : 'Missed an event?'}
             </h3>
             
             <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
               {lang === 'ar' 
                 ? 'شاهد الفعاليات السابقة والجلسات المسجلة على قناتنا في YouTube'
                 : 'Check out our past events and watch recorded sessions on our YouTube channel'
               }
             </p>
             
             <Button size="lg" variant="outline" className="h-12 px-10 rounded-full border border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-white transition-all text-base font-medium">
               {lang === 'ar' ? 'شاهد الفعاليات السابقة' : 'View Past Events'}
             </Button>
          </div>

          {/* Background Gradient Blur */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-[#4285f4]/5 blur-[100px] pointer-events-none" />
        </motion.div>

      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          userEmail={userEmail}
          userRole={userRole}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </section>
  );
}
