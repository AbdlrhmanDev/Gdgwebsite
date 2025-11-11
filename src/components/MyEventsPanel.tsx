import { useState } from "react";
import { Calendar, MapPin, Clock, QrCode, Download, CheckCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getUserRegistrations, getEventById, Event, EventRegistration } from "../lib/storage";

interface MyEventsPanelProps {
  userEmail: string;
}

export function MyEventsPanel({ userEmail }: MyEventsPanelProps) {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const registrations = getUserRegistrations(userEmail);
  
  const eventsWithDetails = registrations.map(reg => ({
    registration: reg,
    event: getEventById(reg.eventId)
  })).filter(item => item.event !== undefined);

  // Separate upcoming and past events
  const upcomingEvents = eventsWithDetails.filter(item => 
    item.registration.status === 'registered'
  );
  
  const pastEvents = eventsWithDetails.filter(item => 
    item.registration.status === 'attended'
  );

  const handleDownloadQR = (qrCode: string, eventTitle: string) => {
    // In production, generate actual QR code image
    alert(`تحميل QR Code للفعالية: ${eventTitle}\nالكود: ${qrCode}`);
  };

  const handleDownloadCertificate = (eventTitle: string) => {
    // In production, generate PDF certificate
    alert(`تحميل شهادة حضور: ${eventTitle}`);
  };

  const renderEventCard = (item: { registration: EventRegistration; event: Event | undefined }, isPast: boolean) => {
    if (!item.event) return null;
    const { registration, event } = item;

    return (
      <Card key={registration.id}>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  className={
                    registration.status === 'attended' 
                      ? 'bg-[#34a853]' 
                      : registration.status === 'cancelled'
                      ? 'bg-[#ea4335]'
                      : 'bg-[#4285f4]'
                  }
                >
                  {registration.status === 'attended' ? 'حضرت' : 
                   registration.status === 'cancelled' ? 'ملغي' : 'مسجل'}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {!isPast && registration.status === 'registered' && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadQR(registration.qrCode, event.title)}
                    >
                      <QrCode className="w-4 h-4 ml-2" />
                      عرض QR Code
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600"
                    >
                      <X className="w-4 h-4 ml-2" />
                      إلغاء التسجيل
                    </Button>
                  </>
                )}
                
                {isPast && registration.status === 'attended' && (
                  <Button 
                    size="sm"
                    className="bg-[#34a853]"
                    onClick={() => handleDownloadCertificate(event.title)}
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تحميل الشهادة
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">فعالياتي</h2>
        <p className="text-gray-600">إدارة الفعاليات المسجل فيها والشهادات</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4285f4] bg-opacity-20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#4285f4]" />
              </div>
              <div>
                <p className="text-2xl">{upcomingEvents.length}</p>
                <p className="text-sm text-gray-600">فعاليات قادمة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#34a853] bg-opacity-20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#34a853]" />
              </div>
              <div>
                <p className="text-2xl">{pastEvents.length}</p>
                <p className="text-sm text-gray-600">فعاليات حضرتها</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f9ab00] bg-opacity-20 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-[#f9ab00]" />
              </div>
              <div>
                <p className="text-2xl">{pastEvents.length}</p>
                <p className="text-sm text-gray-600">شهادات متاحة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Tabs */}
      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'upcoming' | 'past')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            الفعاليات القادمة ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            الفعاليات السابقة ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">لم تسجل في أي فعالية بعد</p>
                <Button className="mt-4 bg-[#4285f4]">
                  تصفح الفعاليات المتاحة
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingEvents.map(item => renderEventCard(item, false))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastEvents.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">لم تحضر أي فعالية بعد</p>
              </CardContent>
            </Card>
          ) : (
            pastEvents.map(item => renderEventCard(item, true))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
