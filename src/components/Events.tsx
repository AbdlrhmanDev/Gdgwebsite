import { useState } from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EventDetailsModal } from "./EventDetailsModal";
import { Event } from "../lib/storage";
import { type Language } from "../lib/i18n";

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
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl">
            {lang === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'ar' 
              ? 'انضم إلينا في ورش العمل والمحاضرات والفعاليات الممتعة'
              : 'Join us for exciting workshops, talks, and networking opportunities'
            }
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-600">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>{lang === 'ar' ? 'لا توجد فعاليات مجدولة حالياً. تابعونا قريباً!' : 'No events scheduled yet. Check back soon!'}</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className="absolute top-4 right-4"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.status}
                  </Badge>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl">{event.title}</h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: event.color }} />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: event.color }} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: event.color }} />
                      <span>{event.attendees || 0} / {event.capacity} {lang === 'ar' ? 'مسجل' : 'registered'}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    style={{ backgroundColor: event.color }}
                  >
                    {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Past Events Summary */}
        <div className="bg-gradient-to-r from-[#4285f4] to-[#34a853] rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl mb-4">
            {lang === 'ar' ? 'فاتتك فعالية؟' : 'Missed an event?'}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {lang === 'ar' 
              ? 'شاهد الفعاليات السابقة والجلسات المسجلة على قناتنا في YouTube'
              : 'Check out our past events and watch recorded sessions on our YouTube channel'
            }
          </p>
          <Button variant="secondary" className="bg-white text-[#4285f4] hover:bg-gray-100">
            {lang === 'ar' ? 'شاهد الفعاليات السابقة' : 'View Past Events'}
          </Button>
        </div>
      </div>

      {/* Event Details Modal */}
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