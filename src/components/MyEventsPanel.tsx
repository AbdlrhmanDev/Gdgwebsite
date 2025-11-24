import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, QrCode, Download, CheckCircle, X, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { registrationService } from "../services/registrationService";

interface MyEventsPanelProps {
  userEmail: string;
}

export function MyEventsPanel({ userEmail }: MyEventsPanelProps) {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<any[]>([]);
  
  useEffect(() => {
    loadMyRegistrations();
  }, []);

  const loadMyRegistrations = async () => {
    try {
      setLoading(true);
      const response = await registrationService.getMyRegistrations();
      if (response.success) {
        setRegistrations(response.data);
      }
    } catch (error) {
      console.error('Failed to load registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Separate upcoming and past events
  const upcomingEvents = registrations.filter(reg => 
    reg.status === 'registered' || reg.status === 'confirmed'
  );
  
  const pastEvents = registrations.filter(reg => 
    reg.attended === true || reg.status === 'completed'
  );

  const handleDownloadQR = (qrCode: string, eventTitle: string) => {
    // In production, generate actual QR code image
    alert(`تحميل QR Code للفعالية: ${eventTitle}\nالكود: ${qrCode}`);
  };

  const handleDownloadCertificate = (eventTitle: string) => {
    // In production, generate PDF certificate
    alert(`تحميل شهادة حضور: ${eventTitle}`);
  };

  const handleCancelRegistration = async (registrationId: string) => {
    if (!confirm('هل أنت متأكد من إلغاء التسجيل؟')) return;
    
    try {
      const response = await registrationService.cancelRegistration(registrationId);
      if (response.success) {
        alert('تم إلغاء التسجيل بنجاح');
        loadMyRegistrations(); // Reload the list
      }
    } catch (error) {
      console.error('Failed to cancel registration:', error);
      alert('فشل إلغاء التسجيل');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderEventCard = (registration: any, isPast: boolean) => {
    const event = registration.event;
    if (!event) return null;

    return (
      <motion.div key={registration._id} variants={itemVariants}>
        <Card className="bg-card border-border/50 overflow-hidden hover:border-border transition-colors">
            <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto relative">
                    <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                    <Badge 
                        className={`absolute top-3 right-3 shadow-sm ${
                            registration.attended 
                            ? 'bg-[#34a853]' 
                            : registration.status === 'cancelled'
                            ? 'bg-[#ea4335]'
                            : 'bg-[#4285f4]'
                        }`}
                    >
                        {registration.attended ? 'حضرت' : 
                        registration.status === 'cancelled' ? 'ملغي' : 'مسجل'}
                    </Badge>
                </div>
                
                <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <Badge 
                            className={`hidden md:inline-flex ${
                                registration.attended 
                                ? 'bg-[#34a853]' 
                                : registration.status === 'cancelled'
                                ? 'bg-[#ea4335]'
                                : 'bg-[#4285f4]'
                            }`}
                        >
                            {registration.attended ? 'حضرت' : 
                            registration.status === 'cancelled' ? 'ملغي' : 'مسجل'}
                        </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-foreground">{new Date(event.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                    {!isPast && (registration.status === 'registered' || registration.status === 'confirmed') && (
                    <>
                        <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadQR(registration._id, event.title)}
                        className="bg-muted/50"
                        >
                        <QrCode className="w-4 h-4 ml-2" />
                        عرض QR Code
                        </Button>
                        <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleCancelRegistration(registration._id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                        <X className="w-4 h-4 ml-2" />
                        إلغاء التسجيل
                        </Button>
                    </>
                    )}
                    
                    {isPast && registration.attended && (
                    <Button 
                        size="sm"
                        className="bg-[#34a853] hover:bg-[#34a853]/90 text-white"
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
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">فعالياتي</h2>
        <p className="text-muted-foreground">إدارة الفعاليات المسجل فيها، التذاكر، والشهادات</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#4285f4]/10 rounded-xl flex items-center justify-center border border-[#4285f4]/20">
                    <Calendar className="w-6 h-6 text-[#4285f4]" />
                </div>
                <div>
                    <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                    <p className="text-sm text-muted-foreground">فعاليات قادمة</p>
                </div>
                </div>
            </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#34a853]/10 rounded-xl flex items-center justify-center border border-[#34a853]/20">
                    <CheckCircle className="w-6 h-6 text-[#34a853]" />
                </div>
                <div>
                    <p className="text-2xl font-bold">{pastEvents.length}</p>
                    <p className="text-sm text-muted-foreground">فعاليات حضرتها</p>
                </div>
                </div>
            </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f9ab00]/10 rounded-xl flex items-center justify-center border border-[#f9ab00]/20">
                    <Download className="w-6 h-6 text-[#f9ab00]" />
                </div>
                <div>
                    <p className="text-2xl font-bold">{pastEvents.length}</p>
                    <p className="text-sm text-muted-foreground">شهادات متاحة</p>
                </div>
                </div>
            </CardContent>
            </Card>
        </motion.div>
      </div>

      {/* Events Tabs */}
      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'upcoming' | 'past')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-xl mb-6">
          <TabsTrigger 
            value="upcoming"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            الفعاليات القادمة ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger 
            value="past"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            الفعاليات السابقة ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-0">
          {upcomingEvents.length === 0 ? (
            <motion.div variants={itemVariants}>
                <Card className="bg-card border-dashed border-border">
                <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">لا توجد فعاليات قادمة</h3>
                    <p className="text-muted-foreground mb-4">لم تسجل في أي فعالية بعد</p>
                    <Button className="bg-[#4285f4] hover:bg-[#3367d6]"  onClick={() => {
    window.location.href = "https://www.gdg-uom.me/#events";
  }}>
                    تصفح الفعاليات المتاحة
                    </Button>
                </CardContent>
                </Card>
            </motion.div>
          ) : (
            upcomingEvents.map(item => renderEventCard(item, false))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-0">
          {pastEvents.length === 0 ? (
             <motion.div variants={itemVariants}>
                <Card className="bg-card border-dashed border-border">
                <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">الأرشيف فارغ</h3>
                    <p className="text-muted-foreground">لم تحضر أي فعالية بعد</p>
                </CardContent>
                </Card>
            </motion.div>
          ) : (
            pastEvents.map(item => renderEventCard(item, true))
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
