import { useState, useEffect } from "react";
import { Users, CheckCircle, XCircle, QrCode, Download, Mail, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { registrationService } from "../services/registrationService";

interface EventRegistrationsPanelProps {
  eventId: string;
  eventTitle: string;
  onClose?: () => void;
}

export function EventRegistrationsPanel({ eventId, eventTitle, onClose }: EventRegistrationsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistrations();
  }, [eventId]);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const response = await registrationService.getRegistrations({ eventId });
      if (response.success) {
        setRegistrations(response.data);
      }
    } catch (error) {
      console.error('Failed to load registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: registrations.length,
    attended: registrations.filter(r => r.attended).length,
    registered: registrations.filter(r => r.status === 'registered' || r.status === 'confirmed').length,
    cancelled: registrations.filter(r => r.status === 'cancelled').length
  };

  const handleMarkAttended = async (id: string) => {
    toast.promise(registrationService.markAttendance(id), {
      loading: 'جاري تسجيل الحضور...',
      success: () => {
        loadRegistrations();
        return 'تم تسجيل الحضور بنجاح';
      },
      error: 'فشل تسجيل الحضور',
    });
  };

  const handleSendEmail = (email: string) => {
    toast.info(`إرسال بريد إلى: ${email}`);
  };

  const handleExportData = () => {
    const csvContent = [
      ['الاسم', 'البريد الإلكتروني', 'تاريخ التسجيل', 'الحالة'].join(','),
      ...registrations.map(r => [
        r.userName,
        r.userEmail,
        new Date(r.registeredAt).toLocaleDateString('ar'),
        r.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registrations_${eventId}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">إدارة التسجيلات</h2>
          <p className="text-muted-foreground">{eventTitle}</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4285f4] bg-opacity-20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4285f4]" />
              </div>
              <div>
                <p className="text-2xl">{stats.total}</p>
                <p className="text-sm text-gray-600">إجمالي المسجلين</p>
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
                <p className="text-2xl">{stats.attended}</p>
                <p className="text-sm text-gray-600">حضروا</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f9ab00] bg-opacity-20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#f9ab00]" />
              </div>
              <div>
                <p className="text-2xl">{stats.registered}</p>
                <p className="text-sm text-gray-600">مسجلين</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ea4335] bg-opacity-20 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-[#ea4335]" />
              </div>
              <div>
                <p className="text-2xl">{stats.cancelled}</p>
                <p className="text-sm text-gray-600">ملغي</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="البحث عن مشارك..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button variant="outline" onClick={handleExportData}>
          <Download className="w-4 h-4 ml-2" />
          تصدير البيانات
        </Button>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المشاركين</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>لا يوجد مشاركين مسجلين حالياً</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">#</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">الاسم</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">البريد الإلكتروني</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">تاريخ التسجيل</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">الحالة</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((registration, index) => (
                    <tr key={registration._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{registration.user?.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{registration.user?.email || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(registration.createdAt).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            registration.attended
                              ? 'bg-[#34a853]'
                              : registration.status === 'cancelled'
                              ? 'bg-[#ea4335]'
                              : 'bg-[#4285f4]'
                          }
                        >
                          {registration.attended ? 'حضر' :
                           registration.status === 'cancelled' ? 'ملغي' : 
                           registration.status === 'confirmed' ? 'مؤكد' : 'مسجل'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {!registration.attended && registration.status !== 'cancelled' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAttended(registration._id)}
                              className="hover:bg-[#34a853] hover:text-white"
                            >
                              <CheckCircle className="w-4 h-4 ml-1" />
                              تسجيل حضور
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSendEmail(registration.user?.email)}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
