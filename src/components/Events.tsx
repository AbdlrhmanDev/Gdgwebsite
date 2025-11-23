import { useState } from "react";
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EventDetailsModal } from "./EventDetailsModal";
import { Event } from "../lib/storage";
import { type Language } from "../lib/i18n";
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

  return (
    <div className="bg-muted/30 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            {lang === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {lang === 'ar' 
              ? 'انضم إلينا في ورش العمل والمحاضرات والفعاليات الممتعة'
              : 'Join us for exciting workshops, talks, and networking opportunities'
            }
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-card rounded-3xl border border-dashed border-border">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground">
                {lang === 'ar' ? 'لا توجد فعاليات مجدولة حالياً. تابعونا قريباً!' : 'No events scheduled yet. Check back soon!'}
              </p>
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1"
                onClick={() => handleEventClick(event)}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Badge
                    className="absolute top-4 right-4 z-20 text-white border-0 shadow-lg"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.status}
                  </Badge>
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <p className="text-xs font-medium opacity-80 mb-1 uppercase tracking-wider">
                      {event.type || 'Workshop'}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                         <Calendar className="w-4 h-4" style={{ color: event.color }} />
                      </div>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                         <Clock className="w-4 h-4" style={{ color: event.color }} />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                       <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                         <MapPin className="w-4 h-4" style={{ color: event.color }} />
                       </div>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full rounded-xl h-12 font-medium text-white shadow-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: event.color }}
                  >
                    {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden bg-[#1a1a1a] p-10 md:p-16 text-center shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#f9ab00]" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 text-white">
              {lang === 'ar' ? 'فاتتك فعالية؟' : 'Missed an event?'}
            </h3>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'شاهد الفعاليات السابقة والجلسات المسجلة على قناتنا في YouTube'
                : 'Check out our past events and watch recorded sessions on our YouTube channel'
              }
            </p>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-black rounded-full px-8 h-12">
              {lang === 'ar' ? 'شاهد الفعاليات السابقة' : 'View Past Events'}
            </Button>
          </div>
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
    </div>
  );
}
