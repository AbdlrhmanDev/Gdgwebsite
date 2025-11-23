import { useState } from "react";
import { X, Calendar, Users, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { 
  Task, 
  DepartmentId, 
  getDepartments,
  addTask,
  getDepartmentMembers
} from "../lib/departments";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  createdBy: string;
}

export function CreateTaskModal({ isOpen, onClose, createdBy }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    departmentId: 'events' as DepartmentId,
    assignedTo: '',
    dueDate: '',
    priority: 'medium' as Task['priority'],
    tags: ''
  });

  const departments = getDepartments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.assignedTo) {
      alert('يرجى اختيار عضو لتعيين المهمة');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      departmentId: formData.departmentId,
      assignedTo: formData.assignedTo,
      assignedBy: createdBy,
      createdAt: new Date().toISOString(),
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: 'todo',
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      progress: 0
    };

    addTask(newTask);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      departmentId: 'events',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
      tags: ''
    });
    
    alert('تم إنشاء المهمة بنجاح!');
    onClose();
    window.location.reload();
  };

  // Get members of selected department
  const deptMembers = getDepartmentMembers(formData.departmentId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">إنشاء مهمة جديدة</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">عنوان المهمة *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: تصميم بوستر للفعالية"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">الوصف *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="وصف تفصيلي للمهمة..."
              rows={4}
              required
            />
          </div>

          {/* Department & Assignee */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">القسم *</Label>
              <select
                id="department"
                value={formData.departmentId}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  departmentId: e.target.value as DepartmentId,
                  assignedTo: '' // Reset assignee when department changes
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.icon} {dept.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="assignedTo">تعيين إلى *</Label>
              <select
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">اختر عضو</option>
                {deptMembers.length === 0 ? (
                  <option disabled>لا يوجد أعضاء في هذا القسم</option>
                ) : (
                  deptMembers.map((member) => (
                    <option key={member.userId} value={member.userId}>
                      {member.userId} {member.role === 'head' && '(رئيس القسم)'}
                    </option>
                  ))
                )}
                {/* For demo, add hardcoded options */}
                <option value="member@gdg.com">member@gdg.com</option>
                <option value="admin@gdg.com">admin@gdg.com</option>
              </select>
              {deptMembers.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ لا يوجد أعضاء في هذا القسم حالياً
                </p>
              )}
            </div>
          </div>

          {/* Due Date & Priority */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">تاريخ الاستحقاق *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <Label htmlFor="priority">الأولوية *</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="low">🟢 منخفضة</option>
                <option value="medium">🟡 متوسطة</option>
                <option value="high">🟠 عالية</option>
                <option value="urgent">🔴 عاجلة</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">الوسوم (اختياري)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="تصميم, فعالية, عاجل (افصل بفاصلة)"
            />
            <p className="text-xs text-gray-500 mt-1">
              افصل الوسوم بفاصلة (مثال: تصميم, فعالية, Android)
            </p>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-xl">💡</div>
              <div className="flex-1 text-sm text-blue-800">
                <p className="font-medium mb-1">نصائح لإنشاء مهمة فعّالة:</p>
                <ul className="space-y-1 mr-4">
                  <li>• اجعل العنوان واضحاً ومحدداً</li>
                  <li>• اكتب وصفاً تفصيلياً يوضح المطلوب بالضبط</li>
                  <li>• حدد موعداً واقعياً للتسليم</li>
                  <li>• عيّن المهمة للشخص المناسب</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              إلغاء
            </Button>
            <Button type="submit" className="flex-1 bg-[#4285f4]">
              إنشاء المهمة
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
