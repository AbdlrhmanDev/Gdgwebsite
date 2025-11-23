import { useState } from "react";
import { Users, Target, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  getDepartments, 
  getDepartmentMembers,
  getTasksByDepartment,
  Department,
  DepartmentId
} from "../lib/departments";

export function DepartmentsPanel() {
  const departments = getDepartments();
  const [selectedDept, setSelectedDept] = useState<DepartmentId | null>(null);

  const getDepartmentStats = (deptId: DepartmentId) => {
    const tasks = getTasksByDepartment(deptId);
    const members = getDepartmentMembers(deptId);
    
    return {
      members: members.length,
      tasks: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress' || t.status === 'review').length,
      completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2">الأقسام والفرق</h2>
        <p className="text-gray-600">نظرة عامة على أقسام النادي وأدائها</p>
      </div>

      {/* Overall Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4285f4]" />
              </div>
              <div>
                <p className="text-2xl">{departments.length}</p>
                <p className="text-sm text-gray-600">إجمالي الأقسام</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#34a853]" />
              </div>
              <div>
                <p className="text-2xl">
                  {departments.reduce((sum, d) => sum + getDepartmentStats(d.id).tasks, 0)}
                </p>
                <p className="text-sm text-gray-600">المهام النشطة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl">
                  {departments.reduce((sum, d) => sum + getDepartmentMembers(d.id).length, 0)}
                </p>
                <p className="text-sm text-gray-600">إجمالي الأعضاء</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#f9ab00]" />
              </div>
              <div>
                <p className="text-2xl">
                  {Math.round(
                    departments.reduce((sum, d) => sum + getDepartmentStats(d.id).completionRate, 0) / 
                    departments.length
                  )}%
                </p>
                <p className="text-sm text-gray-600">معدل الإنجاز</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const stats = getDepartmentStats(dept.id);
          
          return (
            <Card 
              key={dept.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedDept(dept.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${dept.color}20` }}
                    >
                      {dept.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{dept.nameAr}</CardTitle>
                      <p className="text-sm text-gray-500">{dept.nameEn}</p>
                    </div>
                  </div>
                  <Badge style={{ backgroundColor: dept.color }}>
                    {stats.members} عضو
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{dept.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-medium" style={{ color: dept.color }}>
                      {stats.tasks}
                    </p>
                    <p className="text-xs text-gray-600">مهمة</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-medium text-[#f9ab00]">
                      {stats.inProgress}
                    </p>
                    <p className="text-xs text-gray-600">قيد التنفيذ</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-medium text-[#34a853]">
                      {stats.completed}
                    </p>
                    <p className="text-xs text-gray-600">مكتملة</p>
                  </div>
                </div>

                {/* Completion Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">معدل الإنجاز</span>
                    <span className="text-sm font-medium">{stats.completionRate}%</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-2" />
                </div>

                {/* Department Head */}
                {dept.head && (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-1">رئيس القسم</p>
                    <p className="text-sm font-medium">{dept.head}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State for New Departments */}
      <Card className="border-dashed">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg mb-2">هل تريد إضافة قسم جديد؟</h3>
          <p className="text-gray-600 mb-4">
            يمكن للمديرين إنشاء أقسام جديدة حسب احتياجات النادي
          </p>
          <button className="px-4 py-2 bg-[#4285f4] text-white rounded-lg hover:bg-[#3367d6]">
            إضافة قسم
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
