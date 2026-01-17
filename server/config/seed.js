require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database');
const User = require('../models/User');
const Event = require('../models/Event');
const Department = require('../models/Department');
const Badge = require('../models/Badge');
const Task = require('../models/Task');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@gdg.com',
    password: 'admin123',
    role: 'admin',
    department: 'leadership',
    studentId: 'A001',
    points: 2000,
    level: 10
  },
  {
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@gdg.com',
    password: 'admin123',
    role: 'admin',
    department: 'events',
    studentId: 'A002',
    points: 1800,
    level: 9
  },
  {
    name: 'Mohamed Hassan',
    email: 'mohamed.hassan@gdg.com',
    password: 'admin123',
    role: 'admin',
    department: 'technical',
    studentId: 'A003',
    points: 2200,
    level: 11
  },
  {
    name: 'Fatima Ali',
    email: 'fatima.ali@gdg.com',
    password: 'admin123',
    role: 'admin',
    department: 'marketing',
    studentId: 'A004',
    points: 1600,
    level: 8
  },
  {
    name: 'Ahmed Khaled',
    email: 'ahmed.khaled@gdg.com',
    password: 'admin123',
    role: 'admin',
    department: 'design',
    studentId: 'A005',
    points: 1900,
    level: 9
  },
  {
    name: 'Member User',
    email: 'member@gdg.com',
    password: 'member123',
    role: 'member',
    department: 'technical',
    studentId: 'M001',
    points: 1250,
    level: 6
  },
  {
    name: 'Regular User',
    email: 'user@gdg.com',
    password: 'user123',
    role: 'user',
    department: 'none',
    studentId: 'U001',
    points: 100,
    level: 1
  }
];

const departments = [
  {
    name: 'leadership',
    nameAr: 'القيادة',
    nameEn: 'Leadership',
    descriptionAr: 'التنسيق العام وإدارة الفريق',
    descriptionEn: 'General coordination and team management',
    icon: '👑',
    color: '#9334e9'
  },
  {
    name: 'events',
    nameAr: 'الفعاليات',
    nameEn: 'Events',
    descriptionAr: 'تنظيم وتنسيق الفعاليات',
    descriptionEn: 'Organizing and coordinating events',
    icon: '🎉',
    color: '#1a73e8'
  },
  {
    name: 'technical',
    nameAr: 'التقنية',
    nameEn: 'Technical',
    descriptionAr: 'الدعم التقني والتطوير',
    descriptionEn: 'Technical support and development',
    icon: '💻',
    color: '#34a853'
  },
  {
    name: 'marketing',
    nameAr: 'التسويق',
    nameEn: 'Marketing',
    descriptionAr: 'الحملات والترويج',
    descriptionEn: 'Campaigns and promotion',
    icon: '📱',
    color: '#fbbc04'
  },
  {
    name: 'design',
    nameAr: 'التصميم',
    nameEn: 'Design',
    descriptionAr: 'التصاميم الجرافيكية والبراندنج',
    descriptionEn: 'Graphic design and branding',
    icon: '🎨',
    color: '#ea4335'
  }
];

const badges = [
  {
    name: 'active-participant',
    nameAr: 'المشارك النشط',
    nameEn: 'Active Participant',
    description: 'Attend 10 events',
    descriptionAr: 'حضور 10 فعاليات',
    descriptionEn: 'Attend 10 events',
    icon: '🎯',
    category: 'participation',
    requirement: 'events_attended',
    requirementValue: 10,
    points: 100,
    rarity: 'common'
  },
  {
    name: 'innovator',
    nameAr: 'المبتكر',
    nameEn: 'Innovator',
    description: 'Publish 5 projects',
    descriptionAr: 'نشر 5 مشاريع',
    descriptionEn: 'Publish 5 projects',
    icon: '💡',
    category: 'achievement',
    requirement: 'projects_published',
    requirementValue: 5,
    points: 150,
    rarity: 'rare'
  },
  {
    name: 'leader',
    nameAr: 'القائد',
    nameEn: 'Leader',
    description: 'Organize an event',
    descriptionAr: 'تنظيم فعالية',
    descriptionEn: 'Organize an event',
    icon: '👑',
    category: 'leadership',
    requirement: 'events_organized',
    requirementValue: 1,
    points: 200,
    rarity: 'epic'
  },
  {
    name: 'expert',
    nameAr: 'الخبير',
    nameEn: 'Expert',
    description: 'Reach level 10',
    descriptionAr: 'الوصول للمستوى 10',
    descriptionEn: 'Reach level 10',
    icon: '🏆',
    category: 'achievement',
    requirement: 'level',
    requirementValue: 10,
    points: 500,
    rarity: 'legendary'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await Event.deleteMany();
    await Department.deleteMany();
    await Badge.deleteMany();
    await Task.deleteMany();
    
    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    const adminUser = createdUsers[0];
    
    console.log('🏢 Creating departments...');
    const createdDepartments = await Department.create(departments);
    
    console.log('🎖️  Creating badges...');
    await Badge.create(badges);
    
    console.log('📅 Creating sample events...');
    const events = [
      {
        title: 'ورشة عمل React',
        titleEn: 'React Workshop',
        description: 'تعلم أساسيات React وبناء تطبيقات حديثة',
        descriptionEn: 'Learn React fundamentals and build modern applications',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '18:00',
        location: 'قاعة المؤتمرات',
        locationEn: 'Conference Hall',
        type: 'workshop',
        category: 'technical',
        capacity: 50,
        attendees: 0,
        registrationMethod: 'google-forms',
        registrationUrl: 'https://forms.google.com/example',
        status: 'upcoming',
        featured: true,
        organizer: adminUser._id,
        tags: ['react', 'javascript', 'frontend']
      },
      {
        title: 'هاكاثون الابتكار',
        titleEn: 'Innovation Hackathon',
        description: 'تحدي برمجي لمدة 24 ساعة',
        descriptionEn: '24-hour coding challenge',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: '09:00',
        location: 'مبنى الهندسة',
        locationEn: 'Engineering Building',
        type: 'hackathon',
        category: 'technical',
        capacity: 100,
        attendees: 0,
        registrationMethod: 'custom',
        status: 'upcoming',
        featured: true,
        organizer: adminUser._id,
        tags: ['hackathon', 'coding', 'innovation']
      }
    ];
    
    await Event.create(events);
    
    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Demo Credentials:');
    console.log('Admin: admin@gdg.com / admin123');
    console.log('Member: member@gdg.com / member123');
    console.log('User: user@gdg.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
