import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, MapPin, Users, X } from "lucide-react";
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
} from "./ui/dialog";
import { Label } from "./ui/label";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  status: string;
  color: string;
  description: string;
}

interface AdminPanelProps {
  events: Event[];
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onEditEvent: (id: string, event: Omit<Event, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
  isAdmin: boolean;
}

export function AdminPanel({ events, onAddEvent, onEditEvent, onDeleteEvent, isAdmin }: AdminPanelProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    attendees: "",
    image: "",
    status: "قريباً",
    color: "#4285f4",
    description: ""
  });

  const colors = [
    { value: "#4285f4", label: "أزرق" },
    { value: "#34a853", label: "أخضر" },
    { value: "#f9ab00", label: "أصفر" },
    { value: "#ea4335", label: "أحمر" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      attendees: parseInt(formData.attendees) || 0
    };

    if (editingEvent) {
      onEditEvent(editingEvent.id, eventData);
    } else {
      onAddEvent(eventData);
    }

    // Reset form
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      attendees: "",
      image: "",
      status: "قريباً",
      color: "#4285f4",
      description: ""
    });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      attendees: event.attendees.toString(),
      image: event.image,
      status: event.status,
      color: event.color,
      description: event.description || ""
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
      attendees: "",
      image: "",
      status: "قريباً",
      color: "#4285f4",
      description: ""
    });
    setEditingEvent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl">لوحة {isAdmin ? "المدير" : "العضو"}</h2>
          <p className="text-gray-600 mt-1">إدارة فعاليات GDG</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#4285f4] hover:bg-[#3367d6]">
              <Plus className="w-4 h-4 ml-2" />
              إضافة فعالية
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "تعديل الفعالية" : "إضافة فعالية جديدة"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">عنوان الفعالية</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="ورشة تطوير Android"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">التاريخ</Label>
                  <Input
                    id="date"
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="25 نوفمبر 2025"
                    required
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
                />
              </div>

              <div>
                <Label htmlFor="attendees">الحضور المتوقع</Label>
                <Input
                  id="attendees"
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  placeholder="100"
                  required
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
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">الحالة</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="قريباً">قريباً</option>
                    <option value="التسجيل مفتوح">التسجيل مفتوح</option>
                    <option value="اكتمل العدد">اكتمل العدد</option>
                    <option value="انتهت">انتهت</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="color">اللون الرئيسي</Label>
                  <select
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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

              <div className="flex justify-end gap-3 pt-4">
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
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">لا توجد فعاليات بعد. أضف أول فعالية!</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg">{event.title}</h3>
                        <Badge style={{ backgroundColor: event.color }}>
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
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
                          <span>{event.attendees} متوقع حضورهم</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {isAdmin && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}