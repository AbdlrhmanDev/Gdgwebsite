import { useState } from "react";
import { Plus, Calendar, AlertCircle, CheckCircle, Clock, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Task, 
  getTasksByUser, 
  getDepartmentById,
  getPriorityLabel,
  getStatusLabel,
  updateTask,
  getUserDepartment
} from "../lib/departments";

interface TasksPanelProps {
  userEmail: string;
  userRole: 'admin' | 'member' | 'user';
  onCreateTask?: () => void;
}

export function TasksPanel({ userEmail, userRole, onCreateTask }: TasksPanelProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const userTasks = getTasksByUser(userEmail);
  const userDepartment = getUserDepartment(userEmail);
  const department = userDepartment ? getDepartmentById(userDepartment.departmentId) : undefined;

  // Filter tasks
  const filteredTasks = userTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'todo') return matchesSearch && task.status === 'todo';
    if (selectedTab === 'in-progress') return matchesSearch && (task.status === 'in-progress' || task.status === 'review');
    if (selectedTab === 'completed') return matchesSearch && task.status === 'completed';
    
    return matchesSearch;
  });

  // Stats
  const stats = {
    total: userTasks.length,
    todo: userTasks.filter(t => t.status === 'todo').length,
    inProgress: userTasks.filter(t => t.status === 'in-progress' || t.status === 'review').length,
    completed: userTasks.filter(t => t.status === 'completed').length,
    overdue: userTasks.filter(t => {
      const dueDate = new Date(t.dueDate);
      return dueDate < new Date() && t.status !== 'completed';
    }).length
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { 
      status: newStatus,
      progress: newStatus === 'completed' ? 100 : undefined
    });
    window.location.reload(); // Refresh to show updated data
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'غداً';
    if (diffDays === -1) return 'أمس';
    if (diffDays > 0 && diffDays <= 7) return `خلال ${diffDays} أيام`;
    if (diffDays < 0) return `متأخر ${Math.abs(diffDays)} يوم`;
    
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">مهامي</h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-600">
              {department ? (
                <>
                  <span className="text-2xl ml-2">{department.icon}</span>
                  {department.nameAr}
                </>
              ) : (
                'لم يتم تعيين قسم'
              )}
            </p>
          </div>
        </div>
        {userRole === 'admin' && (
          <Button onClick={onCreateTask} className="bg-[#4285f4]">
            <Plus className="w-4 h-4 ml-2" />
            إضافة مهمة
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#4285f4]" />
              </div>
              <div>
                <p className="text-2xl">{stats.total}</p>
                <p className="text-sm text-gray-600">إجمالي المهام</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl">{stats.todo}</p>
                <p className="text-sm text-gray-600">للإنجاز</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#f9ab00]" />
              </div>
              <div>
                <p className="text-2xl">{stats.inProgress}</p>
                <p className="text-sm text-gray-600">قيد التنفيذ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#34a853]" />
              </div>
              <div>
                <p className="text-2xl">{stats.completed}</p>
                <p className="text-sm text-gray-600">مكتملة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#ea4335]" />
              </div>
              <div>
                <p className="text-2xl">{stats.overdue}</p>
                <p className="text-sm text-gray-600">متأخرة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="ابحث في المهام..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 ml-2" />
          تصفية
        </Button>
      </div>

      {/* Tasks Tabs */}
      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            الكل ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="todo">
            للإنجاز ({stats.todo})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            قيد التنفيذ ({stats.inProgress})
          </TabsTrigger>
          <TabsTrigger value="completed">
            مكتملة ({stats.completed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  {selectedTab === 'all' && 'لا توجد مهام'}
                  {selectedTab === 'todo' && 'لا توجد مهام للإنجاز'}
                  {selectedTab === 'in-progress' && 'لا توجد مهام قيد التنفيذ'}
                  {selectedTab === 'completed' && 'لا توجد مهام مكتملة'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => {
              const priority = getPriorityLabel(task.priority);
              const status = getStatusLabel(task.status);
              const taskDept = getDepartmentById(task.departmentId);
              const overdue = isOverdue(task.dueDate) && task.status !== 'completed';

              return (
                <Card key={task.id} className={overdue ? 'border-red-300' : ''}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl">{task.title}</h3>
                            {overdue && (
                              <Badge className="bg-red-500">
                                متأخرة
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{task.description}</p>
                        </div>
                        <Badge style={{ backgroundColor: priority.color }}>
                          {priority.label}
                        </Badge>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">التقدم</span>
                          <span className="text-sm font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>

                      {/* Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className={overdue ? 'text-red-600 font-medium' : ''}>
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                        {taskDept && (
                          <div className="flex items-center gap-2">
                            <span>{taskDept.icon}</span>
                            <span>{taskDept.nameAr}</span>
                          </div>
                        )}
                        <Badge variant="outline" style={{ borderColor: status.color, color: status.color }}>
                          {status.label}
                        </Badge>
                      </div>

                      {/* Tags */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2 border-t">
                        {task.status === 'todo' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(task.id, 'in-progress')}
                          >
                            بدء العمل
                          </Button>
                        )}
                        {task.status === 'in-progress' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(task.id, 'review')}
                            >
                              إرسال للمراجعة
                            </Button>
                            <Button
                              size="sm"
                              className="bg-[#34a853]"
                              onClick={() => handleStatusChange(task.id, 'completed')}
                            >
                              إكمال
                            </Button>
                          </>
                        )}
                        {task.status === 'review' && (
                          <Button
                            size="sm"
                            className="bg-[#34a853]"
                            onClick={() => handleStatusChange(task.id, 'completed')}
                          >
                            ✓ وافق وأكمل
                          </Button>
                        )}
                        {task.status === 'completed' && (
                          <Badge className="bg-[#34a853]">
                            <CheckCircle className="w-4 h-4 ml-1" />
                            مكتملة
                          </Badge>
                        )}
                        <Button size="sm" variant="ghost">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
