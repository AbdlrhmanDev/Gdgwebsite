import { useState, useEffect } from "react";
import { Search, UserPlus, Mail, Shield, User, TrendingUp, Filter, MoreVertical, Edit, Trash2, Eye, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { userService } from "../services/userService";

export function MembersPanel() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'member' | 'user' | 'leader'>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSetPointsDialog, setShowSetPointsDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'member' | 'user' | 'leader',
  });
  const [points, setPoints] = useState(0);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers();
      if (response.success) {
        setMembers(response.data);
      }
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    try {
      const response = await userService.createUser(formData);
      if (response.success) {
        await loadMembers();
        setShowAddDialog(false);
        setFormData({ name: '', email: '', password: '', role: 'user' });
        toast.success('تم إضافة العضو بنجاح');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل في إضافة العضو');
    }
  };

  const handleEditMember = async () => {
    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      const response = await userService.updateUser(selectedMember._id, updateData);
      if (response.success) {
        await loadMembers();
        setShowEditDialog(false);
        setSelectedMember(null);
        setFormData({ name: '', email: '', password: '', role: 'user' });
        toast.success('تم تحديث العضو بنجاح');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل في تحديث العضو');
    }
  };

  const handleDeleteMember = async () => {
    try {
      const response = await userService.deleteUser(selectedMember._id);
      if (response.success) {
        await loadMembers();
        setShowDeleteDialog(false);
        setSelectedMember(null);
        toast.success('تم حذف العضو بنجاح');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل في حذف العضو');
    }
  };

  const openEditDialog = (member: any) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      password: '',
      role: member.role,
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (member: any) => {
    setSelectedMember(member);
    setShowDeleteDialog(true);
  };

  const openSetPointsDialog = (member: any) => {
    setSelectedMember(member);
    setPoints(member.points);
    setShowSetPointsDialog(true);
  };

  const handleSetPoints = async () => {
    try {
      const response = await userService.setPoints(selectedMember._id, points);
      if (response.success) {
        await loadMembers();
        setShowSetPointsDialog(false);
        setSelectedMember(null);
        toast.success('تم تحديد النقاط بنجاح');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل في تحديد النقاط');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'leader':
        return 'bg-yellow-500';
      case 'member':
        return 'bg-blue-500';
      case 'user':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'مدير';
      case 'leader':
        return 'قائد';
      case 'member':
        return 'عضو';
      case 'user':
        return 'مستخدم';
      default:
        return role;
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: members.length,
    admins: members.filter(m => m.role === 'admin').length,
    leaders: members.filter(m => m.role === 'leader').length,
    members: members.filter(m => m.role === 'member').length,
    users: members.filter(m => m.role === 'user').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285f4] mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl mb-2">إدارة الأعضاء</h2>
          <p className="text-gray-600">عرض وإدارة جميع أعضاء المجتمع</p>
        </div>
        <Button className="bg-[#4285f4]" onClick={() => setShowAddDialog(true)}>
          <UserPlus className="w-4 h-4 ml-2" />
          إضافة عضو جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-[#4285f4]" />
              </div>
              <div>
                <p className="text-2xl">{stats.total}</p>
                <p className="text-sm text-gray-600">إجمالي الأعضاء</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl">{stats.admins}</p>
                <p className="text-sm text-gray-600">المدراء</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-[#34a853]" />
              </div>
              <div>
                <p className="text-2xl">{stats.members}</p>
                <p className="text-sm text-gray-600">الأعضاء</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl">{stats.users}</p>
                <p className="text-sm text-gray-600">المستخدمون</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="البحث عن عضو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={(value: any) => setRoleFilter(value)}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="تصفية حسب الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأدوار</SelectItem>
                <SelectItem value="admin">مدير</SelectItem>
                <SelectItem value="leader">قائد</SelectItem>
                <SelectItem value="member">عضو</SelectItem>
                <SelectItem value="user">مستخدم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>الأعضاء ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredMembers.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                لا توجد نتائج
              </div>
            ) : (
              filteredMembers.map((member) => (
                <div key={member._id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-[#4285f4] text-white">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{member.name}</h3>
                        <Badge className={getRoleBadgeColor(member.role)}>
                          {getRoleLabel(member.role)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        {member.department && (
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: member.department.color }}
                            />
                            <span>{member.department.nameAr}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-[#f9ab00] font-medium">
                          <TrendingUp className="w-4 h-4" />
                          <span>{member.points || 0}</span>
                        </div>
                        <p className="text-gray-600 text-xs">نقطة</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-[#4285f4]">{member.level || 1}</p>
                        <p className="text-gray-600 text-xs">المستوى</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(member)}>
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل العضو
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openSetPointsDialog(member)}>
                          <TrendingUp className="w-4 h-4 ml-2" />
                          تحديد النقاط
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(member)} className="text-red-600">
                          <Trash2 className="w-4 h-4 ml-2" />
                          حذف العضو
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة عضو جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات العضو الجديد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">الاسم</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل الاسم"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-email">البريد الإلكتروني</Label>
              <Input
                id="add-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-password">كلمة المرور</Label>
              <Input
                id="add-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="أدخل كلمة المرور"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-role">الدور</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">مستخدم</SelectItem>
                  <SelectItem value="member">عضو</SelectItem>
                  <SelectItem value="admin">مدير</SelectItem>
                  <SelectItem value="leader">قائد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddMember} className="bg-[#4285f4]">
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل العضو</DialogTitle>
            <DialogDescription>
              تحديث بيانات العضو
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">الاسم</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل الاسم"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">البريد الإلكتروني</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password">كلمة المرور الجديدة (اختياري)</Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="اترك فارغاً إذا لم ترغب بالتغيير"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">الدور</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">مستخدم</SelectItem>
                  <SelectItem value="member">عضو</SelectItem>
                  <SelectItem value="admin">مدير</SelectItem>
                  <SelectItem value="leader">قائد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditMember} className="bg-[#4285f4]">
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف العضو "{selectedMember?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleDeleteMember} className="bg-red-600 hover:bg-red-700">
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Set Points Dialog */}
      <Dialog open={showSetPointsDialog} onOpenChange={setShowSetPointsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تحديد نقاط العضو</DialogTitle>
            <DialogDescription>
              أدخل النقاط الجديدة للعضو "{selectedMember?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="points">النقاط</Label>
              <Input
                id="points"
                type="number"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value))}
                placeholder="أدخل النقاط"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSetPointsDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSetPoints} className="bg-[#4285f4]">
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
