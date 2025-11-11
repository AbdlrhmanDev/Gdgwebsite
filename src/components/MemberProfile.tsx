import { useState } from "react";
import { User, Mail, Phone, MapPin, Link as LinkIcon, Edit, Save, Camera, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface MemberProfileProps {
  userId: string;
  isOwnProfile: boolean;
}

export function MemberProfile({ userId, isOwnProfile }: MemberProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "سارة الرشيد",
    email: "sarah@mustaqbal.edu",
    phone: "+966 50 123 4567",
    location: "الرياض، المملكة العربية السعودية",
    bio: "مطورة برمجيات شغوفة بالذكاء الاصطناعي والتعلم الآلي. أحب بناء حلول مبتكرة للمشاكل الواقعية.",
    skills: ["React", "Python", "Machine Learning", "Node.js", "TypeScript"],
    interests: ["AI", "Web Development", "Cloud Computing"],
    github: "https://github.com/sarah",
    linkedin: "https://linkedin.com/in/sarah",
    twitter: "https://twitter.com/sarah",
    website: "https://sarah.dev"
  });

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#4285f4] to-[#34a853] rounded-2xl p-8 text-white">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl">
              س
            </div>
            {isOwnProfile && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-[#4285f4]" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl mb-1">{profile.name}</h2>
                <p className="opacity-90 mb-3">{profile.email}</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} className="bg-white bg-opacity-20">
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 3 && (
                    <Badge className="bg-white bg-opacity-20">
                      +{profile.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              {isOwnProfile && (
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="bg-white text-[#4285f4] hover:bg-opacity-90"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      حفظ
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      تعديل
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg mb-4">معلومات الاتصال</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                {isEditing ? (
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-gray-700">{profile.email}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                {isEditing ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-gray-700">{profile.phone}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                {isEditing ? (
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-gray-700">{profile.location}</span>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg mb-4">روابط التواصل</h3>
            <div className="space-y-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-[#4285f4]">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-[#4285f4]">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-[#4285f4]">
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </a>
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-[#4285f4]">
                <LinkIcon className="w-4 h-4" />
                <span>Website</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg mb-4">الإحصائيات</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">الفعاليات المشاركة</span>
                <span className="text-lg">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">المشاريع</span>
                <span className="text-lg">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">الشهادات</span>
                <span className="text-lg">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">النقاط</span>
                <span className="text-lg text-[#f9ab00]">1,250</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg mb-4">نبذة عني</h3>
            {isEditing ? (
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full"
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg mb-4">المهارات التقنية</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-[#4285f4] bg-opacity-10 text-[#4285f4] border-0"
                >
                  {skill}
                </Badge>
              ))}
              {isEditing && (
                <Button size="sm" variant="outline">
                  + إضافة مهارة
                </Button>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg mb-4">الاهتمامات</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <Badge
                  key={index}
                  className="bg-[#34a853] bg-opacity-10 text-[#34a853] border-0"
                >
                  {interest}
                </Badge>
              ))}
              {isEditing && (
                <Button size="sm" variant="outline">
                  + إضافة اهتمام
                </Button>
              )}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg mb-4">المشاريع الأخيرة</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "نظام إدارة المكتبة", tech: "React, Node.js", stars: 45 },
                { name: "تطبيق الطقس", tech: "Flutter, Firebase", stars: 32 },
                { name: "منصة التعلم", tech: "Next.js, PostgreSQL", stars: 67 }
              ].map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="mb-2">{project.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{project.tech}</p>
                  <div className="flex items-center gap-1 text-sm text-[#f9ab00]">
                    <span>⭐</span>
                    <span>{project.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
