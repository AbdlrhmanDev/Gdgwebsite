import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, MapPin, Users, X, Search, Filter, MoreVertical, Eye } from "lucide-react";
import { EventRegistrationsPanel } from "./EventRegistrationsPanel";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { RegistrationMethodSelector } from "./RegistrationMethodSelector";
import { RegistrationConfig, internalRegistration } from "../lib/registration-methods";
import { Event } from "../lib/storage";
import { motion, AnimatePresence } from "motion/react";

interface AdminPanelProps {
  events: Event[];
  onAddEvent: (event: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => void;
  onEditEvent: (id: string, event: Omit<Event, 'id' | 'createdAt' | 'createdBy' | 'attendees'>) => void;
  onDeleteEvent: (id: string) => void;
  onCancelRegistration: (eventId: string) => void;
  onRegisterForEvent: (eventId: string) => void; // New prop for registering
  isAdmin: boolean;
  userRole: 'admin' | 'leader' | 'member' | 'user';
  currentUserId: string;
  userRegistrations: string[];
}

export function AdminPanel({ events, onAddEvent, onEditEvent, onDeleteEvent, onCancelRegistration, onRegisterForEvent, isAdmin, userRole, currentUserId, userRegistrations }: AdminPanelProps) {
  console.log("AdminPanel (Debug) - userRole:", userRole);
  console.log("AdminPanel (Debug) - currentUserId:", currentUserId);
  console.log("AdminPanel (Debug) - userRegistrations:", userRegistrations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingRegistrations, setViewingRegistrations] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: "50",
    image: "",
    status: "upcoming",
    color: "#4285f4",
    description: "",
    tags: [] as string[],
    isOnline: false,
    meetingLink: "",
    requirements: "",
    registrationMethod: internalRegistration as RegistrationConfig,
    isPublic: true,
  });

  const canAddEvents = isAdmin || userRole === 'admin' || userRole === 'leader';

  const colors = [
    { value: "#4285f4", label: "أزرق" },
    { value: "#34a853", label: "أخضر" },
    { value: "#f9ab00", label: "أصفر" },
    { value: "#ea4335", label: "أحمر" }
  ];

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAddEvents) {
      return;
    }
    
    const eventData = {
      ...formData,
      capacity: parseInt(formData.capacity) || 0,
      date: new Date(formData.date).toISOString(),
      registrationMethod: formData.registrationMethod.method
    };

    if (editingEvent) {
      onEditEvent(editingEvent.id, eventData);
    } else {
      onAddEvent(eventData);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      time: event.time,
      location: event.location,
      capacity: event.capacity.toString(),
      image: event.image,
      status: event.status || 'upcoming',
      color: event.color,
      description: event.description || "",
      tags: event.tags || [] as string[],
      isOnline: event.isOnline || false,
      meetingLink: event.meetingLink || "",
      requirements: event.requirements || "",
      registrationMethod: event.registrationMethod || internalRegistration as RegistrationConfig,
      isPublic: event.isPublic !== false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفعالية؟")) {
      onDeleteEvent(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      capacity: "50",
      image: "",
      status: "upcoming",
      color: "#4285f4",
      description: "",
      tags: [] as string[],
      isOnline: false,
      meetingLink: "",
      requirements: "",
      registrationMethod: internalRegistration as RegistrationConfig,
      isPublic: true,
    });
    setEditingEvent(null);
  };

  const getTitle = () => {
    if (isAdmin) return "المدير";
    if (userRole === 'leader') return "القائد";
    return "العضو";
  };

  const handleEventClick = (event: Event) => {
    // Optional: Add any event click logic here if needed
    console.log("Event clicked:", event.id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            لوحة {getTitle()}
          </h2>
          <p className="text-muted-foreground mt-1">إدارة وتنظيم فعاليات مجتمع GDG</p>
        </div>
        
        {canAddEvents ? (
        <Dialog open={isDialogOpen} onOpenChange={(open: boolean) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#4285f4] hover:bg-[#3367d6] shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
                <Plus className="w-4 h-4 ml-2" />
                إضافة فعالية
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "تعديل الفعالية" : "إضافة فعالية جديدة"}</DialogTitle>
                <DialogDescription>
                  قم بتعبئة البيانات أدناه {editingEvent ? "لتحديث" : "لإنشاء"} الفعالية
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">عنوان الفعالية</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="ورشة تطوير Android"
                    required
                    className="bg-muted/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">التاريخ</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="2025-11-25"
                      required
                      className="bg-muted/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">الوقت</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="2:00 م - 5:00 م"
                      required
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="قاعة الهندسة، غرفة 301"
                    required
                    className="bg-muted/50"
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">السعة المتاحة</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="100"
                    required
                    className="bg-muted/50"
                  />
                </div>

                <div>
                  <Label htmlFor="image">رابط الصورة</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="bg-muted/50"
                  />
                </div>

                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="وصف الفعالية..."
                    rows={3}
                    className="bg-muted/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">الحالة</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 bg-muted/50 border border-input rounded-md text-sm"
                      required
                    >
                      <option value="upcoming">قريباً</option>
                      <option value="ongoing">التسجيل مفتوح</option>
                      <option value="completed">اكتمل العدد</option>
                      <option value="cancelled">انتهت</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="color">اللون الرئيسي</Label>
                    <select
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-3 py-2 bg-muted/50 border border-input rounded-md text-sm"
                      required
                    >
                      {colors.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-2xl">
                  <div>
                    <Label htmlFor="isPublic" className="text-sm font-medium">عرض الفعالية للزوار</Label>
                    <p className="text-xs text-muted-foreground mt-1">إخفِ أو أظهر الفعالية في الموقع العام ولوحة المستخدم.</p>
                  </div>
                  <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPublic: checked })}
                  />
                </div>

                {/* Registration Method */}
                <div className="border-t border-border pt-4">
                  <Label className="mb-2 block">طريقة التسجيل</Label>
                  <div className="bg-muted/30 p-4 rounded-xl border border-border">
                      <RegistrationMethodSelector
                        value={formData.registrationMethod}
                        onChange={(config) => setFormData({ ...formData, registrationMethod: config })}
                      />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(false);
                  }}
                >
                  إلغاء
                </Button>
                <Button type="submit" className="bg-[#4285f4] hover:bg-[#3367d6]">
                  {editingEvent ? "تحديث الفعالية" : "إضافة الفعالية"}
                </Button>
              </div>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="text-sm text-muted-foreground border border-dashed border-border rounded-xl px-4 py-2">
            لا يمكن لصلاحية العضو إضافة فعاليات جديدة.
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 bg-card border border-border p-4 rounded-xl">
         <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
                placeholder="ابحث عن فعالية..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/50 border-transparent focus:border-primary pr-10"
            />
         </div>
         <Button variant="outline" size="icon">
            <Filter className="w-4 h-4 text-muted-foreground" />
         </Button>
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
        {filteredEvents.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-card/50 border border-dashed border-border rounded-2xl"
          >
            <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium">لا توجد فعاليات</h3>
            <p className="text-muted-foreground">لم يتم العثور على فعاليات تطابق بحثك</p>
          </motion.div>
        ) : (
          filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              id={`event-${event.id}`} // Add this line
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border border-border rounded-[32px] overflow-hidden hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
              onClick={() => handleEventClick(event)}
            >
              {console.log("AdminPanel (Debug) - event.id:", event.id)}
              {console.log("AdminPanel (Debug) - isRegistered:", userRegistrations.includes(event.id))}
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                        <Badge style={{ backgroundColor: event.color }} className="shadow-sm">
                          {event.status}
                        </Badge>
                        {event.isPublic === false && (
                          <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/50">
                            غير مرئي للعامة
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{event.capacity} مقعد متاح</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                       {userRole === 'member' ? (
                           userRegistrations.includes(event.id) ? (
                               // Member is registered: show "Registered" button which cancels registration
                               <Button
                                   variant="secondary"
                                   onClick={(e) => {
                                       e.stopPropagation();
                                       onCancelRegistration(event.id);
                                   }}
                                   className="flex items-center gap-1"
                               >
                                   <X className="w-4 h-4" />
                                   مسجل
                               </Button>
                           ) : (
                               // Member is not registered: show "Register" button
                               <Button
                                   onClick={(e) => {
                                       e.stopPropagation();
                                       onRegisterForEvent(event.id);
                                   }}
                                   className="flex items-center gap-1 bg-[#4285f4] hover:bg-[#3367d6] shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                               >
                                   <Plus className="w-4 h-4" />
                                   سجل الآن
                               </Button>
                           )
                       ) : (
                           // Admin or Leader: show existing dropdown menu
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                 {(isAdmin || userRole === 'leader') && (
                                    <DropdownMenuItem onClick={() => setViewingRegistrations(event)}>
                                       <Eye className="w-4 h-4 ml-2" />
                                       عرض التسجيلات
                                    </DropdownMenuItem>
                                 )}
                                 {(isAdmin || userRole === 'leader') && (
                                    <DropdownMenuItem onClick={() => handleEdit(event)}>
                                        <Edit className="w-4 h-4 ml-2" />
                                        تعديل
                                    </DropdownMenuItem>
                                 )}
                                 {(isAdmin || userRole === 'leader') && (
                                    <DropdownMenuItem onClick={() => handleDelete(event.id)} className="text-red-500 focus:text-red-500">
                                        <Trash2 className="w-4 h-4 ml-2" />
                                        حذف
                                    </DropdownMenuItem>
                                 )}
                              </DropdownMenuContent>
                           </DropdownMenu>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
        </AnimatePresence>
      </div>

      {/* Registrations Modal */}
      {viewingRegistrations && (
        <Dialog open={!!viewingRegistrations} onOpenChange={() => setViewingRegistrations(null)}>
          <DialogContent className="!max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto">
            <EventRegistrationsPanel
              eventId={viewingRegistrations.id}
              eventTitle={viewingRegistrations.title}
              onClose={() => setViewingRegistrations(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
