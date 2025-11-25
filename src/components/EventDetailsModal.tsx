import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Tag, Monitor, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Event } from "../lib/storage";
import { getRegistrationUrl, getRegistrationButtonText, getRegistrationMethodIcon } from "../lib/registration-methods";
import { registrationService } from "../services/registrationService";
import { eventService } from "../services/eventService";
import { toast } from "sonner";

interface EventDetailsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userRole: 'admin' | 'member' | 'user';
  onRegisterSuccess?: () => void;
  lang: Language; // Add lang prop
}

export function EventDetailsModal({ event, isOpen, onClose, userEmail, userRole, onRegisterSuccess, lang }: EventDetailsModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  // تحديد طريقة التسجيل
  const registrationMethod = event.registrationMethod?.method || 'internal';
  const isExternalRegistration = ['google-form', 'typeform', 'microsoft-form', 'external-link', 'email'].includes(registrationMethod);

  const currentRegistrations = event.attendees || 0;
  const isFull = currentRegistrations >= event.capacity;
  const canRegister = userRole !== 'user' && !alreadyRegistered && !isFull;

  // Check if user is already registered
  useEffect(() => {
    const checkRegistration = async () => {
      if (!userEmail || userRole === 'user') {
        setLoading(false);
        return;
      }

      try {
        const response = await registrationService.getMyRegistrations();
        if (response.success) {
          const isRegistered = response.data.some((reg: any) => 
            reg.event?._id === event.id && reg.status !== 'cancelled'
          );
          setAlreadyRegistered(isRegistered);
        }
      } catch (error) {
        console.error('Failed to check registration:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      checkRegistration();
    }
  }, [isOpen, event.id, userEmail, userRole]);

  const handleRegister = async () => {
    if (userRole === 'user') {
      toast.error('يجب أن تكون عضواً للتسجيل في الفعاليات. يرجى إنشاء حساب عضو.');
      return;
    }

    // إذا كان التسجيل خارجي، افتح الرابط
    if (isExternalRegistration && event.registrationMethod) {
      const url = getRegistrationUrl(event.registrationMethod, event.id, userEmail);
      window.open(url, '_blank');
      
      // إظهار رسالة توجيه
      toast.info('سيتم فتح نموذج التسجيل في نافذة جديدة. يرجى ملء البيانات المطلوبة.');
      return;
    }

    // التسجيل الداخلي عبر الـ API
    setIsRegistering(true);

    try {
      // Use 'custom' for internal registration method
      const backendMethod = registrationMethod === 'internal' ? 'custom' : registrationMethod;
      const response = await registrationService.registerForEvent(event.id, backendMethod);
      
      if (response.success) {
        setRegistrationComplete(true);
        setAlreadyRegistered(true);

        if (onRegisterSuccess) {
          onRegisterSuccess();
        }

        // Show success message
        setTimeout(() => {
          setRegistrationComplete(false);
          onClose();
        }, 2000);
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      const message = error.response?.data?.message || 'فشل التسجيل. يرجى المحاولة مرة أخرى.';
      toast.error(message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto bg-card border-border">
        {registrationComplete ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[#34a853]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-[#34a853]" />
            </div>
            <h3 className="text-2xl mb-2 text-foreground">تم التسجيل بنجاح! 🎉</h3>
            <p className="text-muted-foreground">
              تم تسجيلك في الفعالية. ستصلك رسالة تأكيد على البريد الإلكتروني.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="relative">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <Badge
                  className="absolute top-4 right-4"
                  style={{ backgroundColor: event.color }}
                >
                  {event.status}
                </Badge>
              </div>
              <DialogTitle className="text-2xl text-foreground">{lang === 'ar' ? event.title : event.titleEn || event.title}</DialogTitle>
              <DialogDescription className="sr-only">
                 تفاصيل فعالية {lang === 'ar' ? event.title : event.titleEn || event.title} - {event.date}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Event Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">التاريخ</p>
                    <p className="font-medium text-foreground">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">الوقت</p>
                    <p className="font-medium text-foreground">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">الموقع</p>
                    <p className="font-medium text-foreground">{lang === 'ar' ? event.location : event.locationEn || event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">المقاعد</p>
                    <p className="font-medium text-foreground">{currentRegistrations} / {event.capacity}</p>
                  </div>
                </div>
              </div>

              {/* Online Meeting Link */}
              {event.isOnline && event.meetingLink && (
                <div className="p-4 bg-[#4285f4]/10 rounded-lg flex items-center gap-3 border border-[#4285f4]/20">
                  <Monitor className="w-5 h-5 text-[#4285f4]" />
                  <div className="flex-1">
                    <p className="text-sm mb-1 font-medium text-[#4285f4]">فعالية عبر الإنترنت</p>
                    <a 
                      href={event.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4285f4] hover:underline text-sm"
                    >
                      رابط الاجتماع
                    </a>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">وصف الفعالية</h4>
                <p className="text-muted-foreground leading-relaxed">{lang === 'ar' ? event.description : event.descriptionEn || event.description}</p>
              </div>

              {/* Requirements */}
              {event.requirements && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">المتطلبات</h4>
                  <p className="text-muted-foreground">{event.requirements}</p>
                </div>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
                    <Tag className="w-4 h-4" />
                    الموضوعات
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-muted/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Registration Method Info */}
              {event.registrationMethod && registrationMethod !== 'internal' && (
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getRegistrationMethodIcon(registrationMethod)}</div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-500 mb-1">
                        طريقة التسجيل: {getRegistrationButtonText(registrationMethod, 'ar')}
                      </p>
                      <p className="text-sm text-blue-400 mb-3">
                        {registrationMethod === 'google-form' && 'سيتم فتح نموذج Google Forms في نافذة جديدة'}
                        {registrationMethod === 'typeform' && 'سيتم فتح نموذج Typeform التفاعلي'}
                        {registrationMethod === 'external-link' && 'سيتم توجيهك لصفحة التسجيل الخارجية'}
                        {registrationMethod === 'email' && 'سيتم فتح برنامج البريد الإلكتروني لإرسال طلب التسجيل'}
                      </p>
                      {event.registrationMethod.url && (
                        <div className="flex items-center gap-2">
                          <code className="text-xs px-2 py-1 bg-black/20 rounded border border-white/10 flex-1 truncate text-muted-foreground" dir="ltr">
                            {event.registrationMethod.url}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(event.registrationMethod?.url, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Registration Status Messages */}
              {alreadyRegistered && (
                <div className="p-4 bg-[#34a853]/10 rounded-lg flex items-center gap-3 border border-[#34a853]/20">
                  <CheckCircle className="w-5 h-5 text-[#34a853]" />
                  <p className="text-[#34a853] font-medium">أنت مسجل بالفعل في هذه الفعالية</p>
                </div>
              )}

              {isFull && !alreadyRegistered && (
                <div className="p-4 bg-[#ea4335]/10 rounded-lg flex items-center gap-3 border border-[#ea4335]/20">
                  <AlertCircle className="w-5 h-5 text-[#ea4335]" />
                  <p className="text-[#ea4335] font-medium">عذراً، اكتمل العدد المسموح للفعالية</p>
                </div>
              )}

              {userRole === 'user' && !alreadyRegistered && (
                <div className="p-4 bg-[#f9ab00]/10 rounded-lg flex items-center gap-3 border border-[#f9ab00]/20">
                  <AlertCircle className="w-5 h-5 text-[#f9ab00]" />
                  <div>
                    <p className="text-[#f9ab00] mb-1 font-medium">يجب أن تكون عضواً للتسجيل</p>
                    <p className="text-sm text-muted-foreground">سجل كعضو للاستفادة من جميع المزايا</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 hover:bg-muted"
                >
                  إغلاق
                </Button>
                {canRegister && (
                  <Button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="flex-1 text-white"
                    style={{ backgroundColor: event.color }}
                  >
                    {isRegistering ? 'جاري التسجيل...' : 'سجل الآن'}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}