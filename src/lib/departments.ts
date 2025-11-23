// نظام الأقسام والمهام في النادي

export type DepartmentId = 
  | 'leadership'     // القيادة
  | 'events'         // الفعاليات
  | 'technical'      // التقنية
  | 'marketing'      // التسويق والمحتوى
  | 'design'         // التصميم
  | 'pr'             // العلاقات العامة
  | 'finance'        // الشؤون المالية
  | 'hr';            // الموارد البشرية

export interface Department {
  id: DepartmentId;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  head?: string;      // رئيس القسم (email)
  members: string[];  // أعضاء القسم (emails)
}

export interface Task {
  id: string;
  title: string;
  description: string;
  departmentId: DepartmentId;
  assignedTo: string;     // email
  assignedBy: string;     // email
  createdAt: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled';
  tags: string[];
  attachments?: string[];
  comments?: TaskComment[];
  progress: number;       // 0-100
  eventId?: string;       // ربط بفعالية
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

export interface MemberDepartment {
  userId: string;
  departmentId: DepartmentId;
  role: 'head' | 'co-head' | 'member';
  joinedAt: string;
}

// الأقسام الافتراضية
export const departments: Department[] = [
  {
    id: 'leadership',
    nameAr: 'القيادة',
    nameEn: 'Leadership',
    description: 'إدارة النادي والتخطيط الاستراتيجي',
    icon: '👑',
    color: '#4285f4',
    members: []
  },
  {
    id: 'events',
    nameAr: 'الفعاليات',
    nameEn: 'Events',
    description: 'تنظيم وإدارة الفعاليات والورش',
    icon: '📅',
    color: '#34a853',
    members: []
  },
  {
    id: 'technical',
    nameAr: 'التقنية',
    nameEn: 'Technical',
    description: 'التطوير التقني والدعم الفني',
    icon: '💻',
    color: '#ea4335',
    members: []
  },
  {
    id: 'marketing',
    nameAr: 'التسويق والمحتوى',
    nameEn: 'Marketing & Content',
    description: 'إنشاء المحتوى والتسويق الرقمي',
    icon: '📢',
    color: '#f9ab00',
    members: []
  },
  {
    id: 'design',
    nameAr: 'التصميم',
    nameEn: 'Design',
    description: 'التصميم الجرافيكي والهوية البصرية',
    icon: '🎨',
    color: '#9333ea',
    members: []
  },
  {
    id: 'pr',
    nameAr: 'العلاقات العامة',
    nameEn: 'Public Relations',
    description: 'التواصل مع الجهات الخارجية والشراكات',
    icon: '🤝',
    color: '#06b6d4',
    members: []
  },
  {
    id: 'finance',
    nameAr: 'الشؤون المالية',
    nameEn: 'Finance',
    description: 'إدارة الميزانية والموارد المالية',
    icon: '💰',
    color: '#10b981',
    members: []
  },
  {
    id: 'hr',
    nameAr: 'الموارد البشرية',
    nameEn: 'Human Resources',
    description: 'إدارة الأعضاء والتدريب',
    icon: '👥',
    color: '#f59e0b',
    members: []
  }
];

// Storage functions
export const saveDepartments = (depts: Department[]) => {
  localStorage.setItem('gdg_departments', JSON.stringify(depts));
};

export const getDepartments = (): Department[] => {
  const data = localStorage.getItem('gdg_departments');
  return data ? JSON.parse(data) : departments;
};

export const getDepartmentById = (id: DepartmentId): Department | undefined => {
  return getDepartments().find(d => d.id === id);
};

// Tasks storage
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('gdg_tasks', JSON.stringify(tasks));
};

export const getTasks = (): Task[] => {
  const data = localStorage.getItem('gdg_tasks');
  return data ? JSON.parse(data) : [];
};

export const addTask = (task: Task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

export const updateTask = (id: string, updatedTask: Partial<Task>) => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasks(tasks);
  }
};

export const deleteTask = (id: string) => {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
};

export const getTasksByUser = (userEmail: string): Task[] => {
  return getTasks().filter(t => t.assignedTo === userEmail);
};

export const getTasksByDepartment = (departmentId: DepartmentId): Task[] => {
  return getTasks().filter(t => t.departmentId === departmentId);
};

export const getTasksByStatus = (status: Task['status']): Task[] => {
  return getTasks().filter(t => t.status === status);
};

// Member departments storage
export const saveMemberDepartments = (memberDepts: MemberDepartment[]) => {
  localStorage.setItem('gdg_member_departments', JSON.stringify(memberDepts));
};

export const getMemberDepartments = (): MemberDepartment[] => {
  const data = localStorage.getItem('gdg_member_departments');
  return data ? JSON.parse(data) : [];
};

export const addMemberToDepartment = (memberDept: MemberDepartment) => {
  const memberDepts = getMemberDepartments();
  // Remove existing department assignment
  const filtered = memberDepts.filter(md => md.userId !== memberDept.userId);
  filtered.push(memberDept);
  saveMemberDepartments(filtered);
};

export const getUserDepartment = (userId: string): MemberDepartment | undefined => {
  return getMemberDepartments().find(md => md.userId === userId);
};

export const getDepartmentMembers = (departmentId: DepartmentId): MemberDepartment[] => {
  return getMemberDepartments().filter(md => md.departmentId === departmentId);
};

// Priority labels
export const getPriorityLabel = (priority: Task['priority']): { label: string; color: string } => {
  const labels = {
    low: { label: 'منخفضة', color: '#10b981' },
    medium: { label: 'متوسطة', color: '#f9ab00' },
    high: { label: 'عالية', color: '#ea4335' },
    urgent: { label: 'عاجلة', color: '#dc2626' }
  };
  return labels[priority];
};

// Status labels
export const getStatusLabel = (status: Task['status']): { label: string; color: string } => {
  const labels = {
    'todo': { label: 'للإنجاز', color: '#6b7280' },
    'in-progress': { label: 'قيد التنفيذ', color: '#3b82f6' },
    'review': { label: 'للمراجعة', color: '#f59e0b' },
    'completed': { label: 'مكتملة', color: '#10b981' },
    'cancelled': { label: 'ملغية', color: '#ef4444' }
  };
  return labels[status];
};

// Initialize default data
export const initializeDepartmentsData = () => {
  if (getDepartments().length === 0) {
    saveDepartments(departments);
  }
  
  // Add default member departments
  if (getMemberDepartments().length === 0) {
    const defaultAssignments: MemberDepartment[] = [
      {
        userId: 'admin@gdg.com',
        departmentId: 'leadership',
        role: 'head',
        joinedAt: new Date().toISOString()
      },
      {
        userId: 'member@gdg.com',
        departmentId: 'events',
        role: 'member',
        joinedAt: new Date().toISOString()
      }
    ];
    saveMemberDepartments(defaultAssignments);
  }
  
  // Add default tasks
  if (getTasks().length === 0) {
    const defaultTasks: Task[] = [
      {
        id: '1',
        title: 'إنشاء بوستر للفعالية القادمة',
        description: 'تصميم بوستر احترافي لورشة Android القادمة بتاريخ 25 نوفمبر',
        departmentId: 'design',
        assignedTo: 'member@gdg.com',
        assignedBy: 'admin@gdg.com',
        createdAt: new Date().toISOString(),
        dueDate: '2025-11-20',
        priority: 'high',
        status: 'in-progress',
        tags: ['تصميم', 'فعالية', 'Android'],
        progress: 60
      },
      {
        id: '2',
        title: 'التواصل مع الرعاة المحتملين',
        description: 'إعداد قائمة بالشركات المحتملة للرعاية والتواصل معها',
        departmentId: 'pr',
        assignedTo: 'admin@gdg.com',
        assignedBy: 'admin@gdg.com',
        createdAt: new Date().toISOString(),
        dueDate: '2025-11-30',
        priority: 'medium',
        status: 'todo',
        tags: ['رعاية', 'شراكات'],
        progress: 0
      },
      {
        id: '3',
        title: 'إعداد محتوى السوشيال ميديا للأسبوع',
        description: 'إنشاء 10 منشورات لمنصات التواصل الاجتماعي',
        departmentId: 'marketing',
        assignedTo: 'member@gdg.com',
        assignedBy: 'admin@gdg.com',
        createdAt: new Date().toISOString(),
        dueDate: '2025-11-15',
        priority: 'high',
        status: 'review',
        tags: ['محتوى', 'سوشيال ميديا'],
        progress: 90
      },
      {
        id: '4',
        title: 'تحديث موقع النادي',
        description: 'إضافة صفحة جديدة للمشاريع وتحسين الأداء',
        departmentId: 'technical',
        assignedTo: 'admin@gdg.com',
        assignedBy: 'admin@gdg.com',
        createdAt: new Date().toISOString(),
        dueDate: '2025-11-25',
        priority: 'medium',
        status: 'in-progress',
        tags: ['تطوير', 'موقع'],
        progress: 45
      },
      {
        id: '5',
        title: 'حجز قاعة للفعالية',
        description: 'التنسيق مع إدارة الجامعة لحجز القاعة الرئيسية',
        departmentId: 'events',
        assignedTo: 'member@gdg.com',
        assignedBy: 'admin@gdg.com',
        createdAt: new Date().toISOString(),
        dueDate: '2025-11-18',
        priority: 'urgent',
        status: 'in-progress',
        tags: ['فعالية', 'لوجستيات'],
        progress: 70,
        eventId: '1'
      }
    ];
    saveTasks(defaultTasks);
  }
};
