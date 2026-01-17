import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Link as LinkIcon, Edit, Save, Camera, Github, Linkedin, Twitter, Star, Code, Globe, Award, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "motion/react";
import { userService } from "../services/userService";

type SocialFieldKey = 'github' | 'linkedin' | 'twitter' | 'website';

interface ProfileProject {
  name: string;
  description: string;
  url: string;
  tech: string[];
  stars: number;
}

interface ProfileCertificate {
  name: string;
  url: string;
  date?: string | Date;
}

interface ProjectFormState {
  name: string;
  description: string;
  url: string;
  tech: string;
  stars: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  interests: string[];
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  points: number;
  level: number;
  department: string;
  badges: any[];
  eventsAttended: any[];
  projects: ProfileProject[];
  certificates: ProfileCertificate[];
}

interface MemberProfileProps {
  userId: string;
  isOwnProfile: boolean;
}

export function MemberProfile({ userId, isOwnProfile }: MemberProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
    points: 0,
    level: 0,
    department: "",
    badges: [] as any[],
    eventsAttended: [] as any[],
    projects: [],
    certificates: []
  });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [projectForm, setProjectForm] = useState<ProjectFormState>({
    name: "",
    description: "",
    url: "",
    tech: "",
    stars: ""
  });

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getUser(userId);
      if (response.success) {
        const user = response.data;
        setProfile({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          location: user.location || "",
          bio: user.bio || "لم يتم إضافة وصف بعد",
          skills: user.skills || [],
          interests: user.interests || [],
          github: user.socialLinks?.github || "",
          linkedin: user.socialLinks?.linkedin || "",
          twitter: user.socialLinks?.twitter || "",
          website: user.website || user.socialLinks?.website || "",
          points: user.points || 0,
          level: user.level || 1,
          department: user.department || "none",
          badges: user.badges || [],
          eventsAttended: user.eventsAttended || [],
          projects: user.projects || [],
          certificates: user.certificates || []
        });
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await userService.updateUser(userId, {
        name: profile.name,
        bio: profile.bio,
        skills: profile.skills,
        interests: profile.interests,
        phone: profile.phone,
        location: profile.location,
        website: profile.website,
        projects: profile.projects,
        certificates: profile.certificates,
        socialLinks: {
          github: profile.github || undefined,
          linkedin: profile.linkedin || undefined,
          twitter: profile.twitter || undefined,
          website: profile.website || undefined
        }
      });
      
      if (response.success) {
        setIsEditing(false);
        alert('تم تحديث الملف الشخصي بنجاح!');
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      alert('فشل تحديث الملف الشخصي');
    }
  };

  const handleAddSkill = () => {
    const value = newSkill.trim();
    if (!value || profile.skills.includes(value)) return;
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, value] }));
    setNewSkill("");
  };

  const handleRemoveSkill = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleAddInterest = () => {
    const value = newInterest.trim();
    if (!value || profile.interests.includes(value)) return;
    setProfile((prev) => ({ ...prev, interests: [...prev.interests, value] }));
    setNewInterest("");
  };

  const handleRemoveInterest = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const handleProjectFormChange = (field: keyof typeof projectForm, value: string) => {
    setProjectForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProject = () => {
    const name = projectForm.name.trim();
    if (!name) return;

    const newProject = {
      name,
      description: projectForm.description.trim(),
      url: projectForm.url.trim(),
      stars: Number(projectForm.stars) || 0,
      tech: projectForm.tech
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    };

    setProfile((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));

    setProjectForm({
      name: "",
      description: "",
      url: "",
      tech: "",
      stars: ""
    });
  };

  const handleRemoveProject = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleSocialLinkChange = (field: SocialFieldKey, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const socialFields: Array<{
    icon: typeof Github;
    label: string;
    field: SocialFieldKey;
    placeholder: string;
  }> = [
    { icon: Github, label: "GitHub", field: "github", placeholder: "https://github.com/username" },
    { icon: Linkedin, label: "LinkedIn", field: "linkedin", placeholder: "https://linkedin.com/in/username" },
    { icon: Twitter, label: "Twitter", field: "twitter", placeholder: "https://twitter.com/username" },
    { icon: LinkIcon, label: "Website", field: "website", placeholder: "https://example.com" }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden bg-gradient-to-r from-[#4285f4] to-[#34a853] rounded-2xl p-8 text-white shadow-lg">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white/20 shadow-xl">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-3xl bg-white/20 text-white">س</AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                <button className="absolute bottom-0 right-0 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors shadow-lg border border-white/20">
                    <Camera className="w-4 h-4 text-white" />
                </button>
                )}
            </div>
            
            <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="max-w-sm bg-white/20 text-white placeholder:text-white/60 border-white/30 h-10 text-lg font-semibold"
                        placeholder="أدخل اسمك"
                      />
                    ) : (
                      <h2 className="text-3xl font-bold mb-1">{profile.name}</h2>
                    )}
                    <p className="opacity-90 mb-3 flex items-center gap-2">
                        <Mail className="w-4 h-4 opacity-70" />
                        {profile.email}
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} className="bg-white/20 hover:bg-white/30 border-0">
                        {skill}
                        </Badge>
                    ))}
                    {profile.skills.length > 3 && (
                        <Badge className="bg-white/10 border-0">
                        +{profile.skills.length - 3}
                        </Badge>
                    )}
                    </div>
                </div>
                
                {isOwnProfile && (
                    <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm h-9 px-4 text-sm"
                    >
                    {isEditing ? (
                        <>
                        <Save className="w-4 h-4 mr-2" />
                        حفظ التغييرات
                        </>
                    ) : (
                        <>
                        <Edit className="w-4 h-4 mr-2" />
                        تعديل الملف
                        </>
                    )}
                    </Button>
                )}
                </div>
            </div>
            </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50 h-full">
                <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    معلومات الاتصال
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                    <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="flex-1 bg-muted/50 h-8"
                    />
                    ) : (
                    <span className="text-foreground">{profile.email}</span>
                    )}
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                    <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="flex-1 bg-muted/50 h-8"
                    />
                    ) : (
                    <span className="text-foreground">{profile.phone}</span>
                    )}
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                    <Input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="flex-1 bg-muted/50 h-8"
                    />
                    ) : (
                    <span className="text-foreground">{profile.location}</span>
                    )}
                </div>
                </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
                <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    روابط التواصل
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialFields.map(({ icon: Icon, label, field, placeholder }) => (
                    <div key={field} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Icon className="w-4 h-4" />
                      <span className="min-w-[80px]">{label}</span>
                      {isEditing ? (
                        <Input
                          value={profile[field] || ""}
                          onChange={(e) => handleSocialLinkChange(field, e.target.value)}
                          placeholder={placeholder}
                          className="bg-muted/50 h-8"
                        />
                      ) : profile[field] ? (
                        <a
                          href={profile[field]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:underline truncate"
                        >
                          {profile[field]}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/70">لم يتم الإضافة بعد</span>
                      )}
                    </div>
                  ))}
                </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
                <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    الإحصائيات
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">الفعاليات المشاركة</span>
                    <span className="text-lg font-semibold">{profile.eventsAttended.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">المشاريع</span>
                    <span className="text-lg font-semibold">{profile.projects.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">الشهادات</span>
                    <span className="text-lg font-semibold">{profile.certificates.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30 border border-yellow-500/20">
                    <span className="text-sm text-muted-foreground">النقاط</span>
                    <span className="text-lg font-bold text-[#f9ab00]">{profile.points}</span>
                </div>
                </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
                <CardHeader>
                <CardTitle className="text-lg">نبذة عني</CardTitle>
                </CardHeader>
                <CardContent>
                {isEditing ? (
                <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-muted/50"
                />
                ) : (
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                )}
                </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
                <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    المهارات التقنية
                </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge
                        key={`${skill}-${index}`}
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 flex items-center gap-2"
                      >
                        <span>{skill}</span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                            className="text-xs text-red-400 hover:text-red-500 focus:outline-none"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="أضف مهارة جديدة"
                        className="bg-muted/50"
                      />
                      <Button onClick={handleAddSkill} disabled={!newSkill.trim()} className="h-9 px-4 text-sm">
                        إضافة
                      </Button>
                    </div>
                  )}
                </CardContent>
            </Card>
          </motion.div>

          {/* Interests */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
                <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    الاهتمامات
                </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge
                        key={`${interest}-${index}`}
                        variant="secondary"
                        className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1 flex items-center gap-2"
                      >
                        <span>{interest}</span>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInterest(index)}
                            className="text-xs text-red-400 hover:text-red-500 focus:outline-none"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="أضف اهتماماً جديداً"
                        className="bg-muted/50"
                      />
                      <Button onClick={handleAddInterest} disabled={!newInterest.trim()} className="h-9 px-4 text-sm">
                        إضافة
                      </Button>
                    </div>
                  )}
                </CardContent>
            </Card>
          </motion.div>

          {/* Recent Projects */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
                <CardHeader>
                <CardTitle className="text-lg">المشاريع الأخيرة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.projects.length === 0 && (
                    <p className="text-sm text-muted-foreground">لا توجد مشاريع مضافة حتى الآن.</p>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.projects.map((project, index) => (
                      <div key={`${project.name}-${index}`} className="border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors group relative">
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProject(index)}
                            className="absolute top-3 left-3 text-xs text-muted-foreground hover:text-red-500"
                          >
                            إزالة
                          </button>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium group-hover:text-primary transition-colors">{project.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-[#f9ab00] bg-yellow-500/10 px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{project.stars}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.tech.join(', ')}</p>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            عرض المشروع
                          </a>
                        )}
                      </div>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="space-y-3 border border-dashed border-border rounded-xl p-4">
                      <div className="grid md:grid-cols-2 gap-3">
                        <Input
                          placeholder="اسم المشروع"
                          value={projectForm.name}
                          onChange={(e) => handleProjectFormChange("name", e.target.value)}
                        />
                        <Input
                          placeholder="رابط المشروع"
                          value={projectForm.url}
                          onChange={(e) => handleProjectFormChange("url", e.target.value)}
                        />
                        <Input
                          placeholder="التقنيات (افصل بينها بفاصلة)"
                          value={projectForm.tech}
                          onChange={(e) => handleProjectFormChange("tech", e.target.value)}
                        />
                        <Input
                          placeholder="التقييم أو النجوم"
                          value={projectForm.stars}
                          onChange={(e) => handleProjectFormChange("stars", e.target.value)}
                        />
                      </div>
                      <Textarea
                        rows={3}
                        placeholder="وصف مختصر للمشروع"
                        value={projectForm.description}
                        onChange={(e) => handleProjectFormChange("description", e.target.value)}
                        className="bg-muted/50"
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleAddProject} disabled={!projectForm.name.trim()} className="h-9 px-4 text-sm">
                          إضافة مشروع
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
