import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, Tag, Monitor, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Event, EventRegistration, addRegistration, generateQRCode, isUserRegistered, getEventById, updateEvent, getEventRegistrations } from "../lib/storage";

interface EventDetailsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userRole: 'admin' | 'member' | 'user';
  onRegisterSuccess?: () => void;
}

export function EventDetailsModal({ event, isOpen, onClose, userEmail, userRole, onRegisterSuccess }: EventDetailsModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const alreadyRegistered = isUserRegistered(event.id, userEmail);
  const currentRegistrations = getEventRegistrations(event.id).length;
  const isFull = currentRegistrations >= event.capacity;
  const canRegister = userRole !== 'user' && !alreadyRegistered && !isFull;

  const handleRegister = async () => {
    if (userRole === 'user') {
      alert('يجب أن تكون عضواً للتسجيل في الفعاليات. يرجى إنشاء حساب عضو.');
      return;
    }

    setIsRegistering(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const registration: EventRegistration = {
      id: Date.now().toString(),
      eventId: event.id,
      userId: userEmail,
      userEmail: userEmail,
      userName: userEmail.split('@')[0], // In real app, get from user profile
      registeredAt: new Date().toISOString(),
      status: 'registered',
      qrCode: generateQRCode(`${event.id}-${userEmail}`)
    };

    addRegistration(registration);

    // Update event attendees count
    const updatedEvent = getEventById(event.id);
    if (updatedEvent) {
      updateEvent(event.id, { 
        attendees: currentRegistrations + 1 
      });
    }

    setIsRegistering(false);
    setRegistrationComplete(true);

    if (onRegisterSuccess) {
      onRegisterSuccess();
    }

    // Show success message
    setTimeout(() => {
      setRegistrationComplete(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {registrationComplete ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[#34a853] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-[#34a853]" />
            </div>
            <h3 className="text-2xl mb-2">تم التسجيل بنجاح! 🎉</h3>
            <p className="text-gray-600">
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
              <DialogTitle className="text-2xl">{event.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Event Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">التاريخ</p>
                    <p>{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">الوقت</p>
                    <p>{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">الموقع</p>
                    <p>{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">المقاعد</p>
                    <p>{currentRegistrations} / {event.capacity}</p>
                  </div>
                </div>
              </div>

              {/* Online Meeting Link */}
              {event.isOnline && event.meetingLink && (
                <div className="p-4 bg-[#4285f4] bg-opacity-10 rounded-lg flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-[#4285f4]" />
                  <div className="flex-1">
                    <p className="text-sm mb-1">فعالية عبر الإنترنت</p>
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
                <h4 className="text-lg mb-2">وصف الفعالية</h4>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              {/* Requirements */}
              {event.requirements && (
                <div>
                  <h4 className="text-lg mb-2">المتطلبات</h4>
                  <p className="text-gray-700">{event.requirements}</p>
                </div>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h4 className="text-lg mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    الموضوعات
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Registration Status Messages */}
              {alreadyRegistered && (
                <div className="p-4 bg-[#34a853] bg-opacity-10 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#34a853]" />
                  <p className="text-[#34a853]">أنت مسجل بالفعل في هذه الفعالية</p>
                </div>
              )}

              {isFull && !alreadyRegistered && (
                <div className="p-4 bg-[#ea4335] bg-opacity-10 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-[#ea4335]" />
                  <p className="text-[#ea4335]">عذراً، اكتمل العدد المسموح للفعالية</p>
                </div>
              )}

              {userRole === 'user' && !alreadyRegistered && (
                <div className="p-4 bg-[#f9ab00] bg-opacity-10 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-[#f9ab00]" />
                  <div>
                    <p className="text-[#f9ab00] mb-1">يجب أن تكون عضواً للتسجيل</p>
                    <p className="text-sm text-gray-600">سجل كعضو للاستفادة من جميع المزايا</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  إغلاق
                </Button>
                {canRegister && (
                  <Button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="flex-1"
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
