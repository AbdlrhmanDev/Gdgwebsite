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

interface MemberProfileProps {
  userId: string;
  isOwnProfile: boolean;
}

export function MemberProfile({ userId, isOwnProfile }: MemberProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
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
    badges: [] as any[]
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
          github: user.github || "",
          linkedin: user.linkedin || "",
          twitter: user.twitter || "",
          website: user.website || "",
          points: user.points || 0,
          level: user.level || 1,
          department: user.department || "none",
          badges: user.badges || []
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
        bio: profile.bio,
        skills: profile.skills,
        interests: profile.interests,
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
        website: profile.website,
        phone: profile.phone,
        location: profile.location
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
                    <h2 className="text-3xl font-bold mb-1">{profile.name}</h2>
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
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    size="sm"
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
                <CardContent className="space-y-3">
                {[
                    { icon: Github, label: "GitHub", url: profile.github },
                    { icon: Linkedin, label: "LinkedIn", url: profile.linkedin },
                    { icon: Twitter, label: "Twitter", url: profile.twitter },
                    { icon: LinkIcon, label: "Website", url: profile.website }
                ].map((link, i) => {
                    const Icon = link.icon;
                    return (
                        <a 
                            key={i}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground">
                                <Icon className="w-4 h-4" />
                                <span>{link.label}</span>
                            </div>
                            <LinkIcon className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    );
                })}
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
                    <span className="text-lg font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">المشاريع</span>
                    <span className="text-lg font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">الشهادات</span>
                    <span className="text-lg font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30 border border-yellow-500/20">
                    <span className="text-sm text-muted-foreground">النقاط</span>
                    <span className="text-lg font-bold text-[#f9ab00]">1,250</span>
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
                    key={index}
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20 px-3 py-1"
                    >
                    {skill}
                    </Badge>
                ))}
                {isEditing && (
                    <Button size="sm" variant="outline" className="h-6 text-xs border-dashed">
                    + إضافة مهارة
                    </Button>
                )}
                </div>
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
                    key={index}
                    variant="secondary"
                    className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20 px-3 py-1"
                    >
                    {interest}
                    </Badge>
                ))}
                {isEditing && (
                    <Button size="sm" variant="outline" className="h-6 text-xs border-dashed">
                    + إضافة اهتمام
                    </Button>
                )}
                </div>
                </CardContent>
            </Card>
          </motion.div>

          {/* Recent Projects */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border/50">
                <CardHeader>
                <CardTitle className="text-lg">المشاريع الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                {[
                    { name: "نظام إدارة المكتبة", tech: "React, Node.js", stars: 45 },
                    { name: "تطبيق الطقس", tech: "Flutter, Firebase", stars: 32 },
                    { name: "منصة التعلم", tech: "Next.js, PostgreSQL", stars: 67 }
                ].map((project, index) => (
                    <div key={index} className="border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium group-hover:text-primary transition-colors">{project.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-[#f9ab00] bg-yellow-500/10 px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{project.stars}</span>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{project.tech}</p>
                    <div className="flex gap-2">
                         <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                         <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                         <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                    </div>
                    </div>
                ))}
                </div>
                </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
