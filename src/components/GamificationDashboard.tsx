import { motion } from "motion/react";
import { Trophy, Award, Star, TrendingUp, Zap, Crown, Medal, Target, Sparkles, Code, Users } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface GamificationDashboardProps {
  userPoints: number;
  userLevel: number;
  userRank: number;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedDate?: string;
  }>;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function GamificationDashboard({ userPoints, userLevel, userRank, badges }: GamificationDashboardProps) {
  const pointsToNextLevel = 1000;
  const currentLevelProgress = (userPoints % pointsToNextLevel) / pointsToNextLevel * 100;
  
  // Mock Leaderboard Data
  const leaderboardData = [
    { id: 1, name: "أحمد محمد", points: 2450, avatar: "", level: 8, badge: "🏆" },
    { id: 2, name: "سارة أحمد", points: 2300, avatar: "", level: 7, badge: "🥈" },
    { id: 3, name: "عمر خالد", points: 2150, avatar: "", level: 7, badge: "🥉" },
    { id: 4, name: "نورة علي", points: 1900, avatar: "", level: 6, badge: "⭐" },
    { id: 5, name: "فهد سعد", points: 1850, avatar: "", level: 6, badge: "⭐" },
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4285f4] to-[#34a853] bg-clip-text text-transparent">
            لوحة التميز
          </h2>
          <p className="text-muted-foreground">تابع تقدمك، واجمع الشارات، ونافس أصدقاءك!</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="px-4 py-2 text-sm border-[#f9ab00] text-[#f9ab00] bg-[#f9ab00]/10">
             <Sparkles className="w-4 h-4 mr-2" />
             موسم الشتاء
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats Card - Left Column */}
        <motion.div className="lg:col-span-2 space-y-6" variants={item}>
          {/* Level Progress Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4285f4] via-[#34a853] to-[#f9ab00] p-1 shadow-custom-xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative bg-card/90 backdrop-blur-md rounded-[22px] p-6 md:p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">المستوى الحالي</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold text-foreground">المستوى {userLevel}</h3>
                    <span className="text-sm text-muted-foreground">/ 50</span>
                  </div>
                </div>
                <div className="relative group">
                   <div className="absolute inset-0 bg-[#f9ab00] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   <div className="relative w-16 h-16 bg-gradient-to-br from-[#f9ab00] to-[#ea4335] rounded-2xl rotate-3 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                     <Trophy className="w-8 h-8 text-white" />
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>{userPoints} XP</span>
                  <span className="text-muted-foreground">{pointsToNextLevel} XP للمستوى التالي</span>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#4285f4] to-[#34a853] rounded-full shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentLevelProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                   أنت أفضل من 85% من الأعضاء هذا الشهر! استمر في العمل الرائع.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="badges" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-muted/30 rounded-xl">
              <TabsTrigger 
                value="badges" 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
              >
                <Award className="w-4 h-4 ml-2" />
                الشارات والإنجازات
              </TabsTrigger>
              <TabsTrigger 
                value="quests" 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
              >
                <Target className="w-4 h-4 ml-2" />
                المهام اليومية
              </TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.map((badge, idx) => (
                  <motion.div
                    key={badge.id}
                    variants={item}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative group p-4 rounded-2xl border transition-all duration-300 ${
                      badge.earned
                        ? 'bg-gradient-to-br from-card to-blue-500/5 border-blue-500/20 shadow-sm hover:shadow-md hover:border-blue-500/40'
                        : 'bg-muted/30 border-dashed border-border opacity-70 grayscale hover:opacity-100 hover:bg-muted/50'
                    }`}
                  >
                    <div className="absolute top-3 left-3">
                      {badge.earned && <Star className="w-4 h-4 text-[#f9ab00] fill-[#f9ab00]" />}
                    </div>
                    <div className="flex flex-col items-center text-center gap-3 mt-2">
                      <div className="text-4xl drop-shadow-md filter transition-transform group-hover:scale-110">
                        {badge.icon}
                      </div>
                      <div>
                        <h4 className={`font-semibold text-sm ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {badge.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                    {badge.earned && badge.earnedDate && (
                      <div className="mt-4 pt-3 border-t border-border w-full text-center">
                         <p className="text-[10px] text-[#34a853] font-medium">تم الحصول عليها {badge.earnedDate}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="quests" className="mt-0">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">مهام نشطة</CardTitle>
                  <CardDescription>أكمل المهام للحصول على نقاط إضافية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "حضور ورشة عمل", xp: 50, progress: 1, total: 1, icon: Zap, color: "#f9ab00" },
                    { title: "دعوة صديق", xp: 100, progress: 0, total: 3, icon: Users, color: "#4285f4" },
                    { title: "إكمال التحدي الأسبوعي", xp: 200, progress: 60, total: 100, icon: Code, color: "#ea4335" },
                  ].map((quest, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-lg bg-background shadow-sm" style={{ color: quest.color }}>
                        <quest.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-sm">{quest.title}</span>
                          <span className="text-xs font-bold text-[#f9ab00]">+{quest.xp} XP</span>
                        </div>
                        <Progress value={(quest.progress / quest.total) * 100} className="h-1.5 bg-muted" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Right Column - Leaderboard & Stats */}
        <motion.div className="space-y-6" variants={item}>
          {/* Rank Card */}
          <Card className="overflow-hidden border-none shadow-custom-lg bg-[#1a1a1a] text-white relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#4285f4] rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#34a853] rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
             
             <CardContent className="p-6 relative z-10">
               <div className="flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 ring-4 ring-white/5 backdrop-blur-sm">
                   <TrendingUp className="w-10 h-10 text-[#f9ab00]" />
                 </div>
                 <h3 className="text-gray-300 text-sm font-medium mb-1">ترتيبك الحالي</h3>
                 <div className="text-5xl font-bold mb-2">#{userRank}</div>
                 <p className="text-sm text-gray-400">
                   حافظ على نشاطك للوصول للمراكز الثلاثة الأولى!
                 </p>
               </div>
             </CardContent>
          </Card>

          {/* Leaderboard Widget */}
          <Card className="bg-card border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#f9ab00]" />
                  لوحة المتصدرين
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs h-8">عرض الكل</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-6 text-center font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                    <Avatar className="w-8 h-8 border border-border">
                      <AvatarFallback className={`${
                          index === 0 ? 'bg-[#f9ab00] text-white' : 
                          index === 1 ? 'bg-gray-400 text-white' : 
                          index === 2 ? 'bg-[#cd7f32] text-white' : 'bg-muted'
                        }`}>
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate flex items-center gap-1">
                        {user.name}
                        {index === 0 && <Crown className="w-3 h-3 text-[#f9ab00] fill-[#f9ab00]" />}
                      </p>
                      <p className="text-xs text-muted-foreground">المستوى {user.level}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-primary">{user.points}</span>
                      <span className="text-[10px] text-muted-foreground block">XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Earn Points Widget */}
          <Card className="bg-card border-border/50">
             <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">طرق لكسب النقاط</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg border border-dashed border-border hover:bg-muted/30 transition-colors">
                   <div className="p-2 bg-blue-500/10 rounded-md">
                      <Users className="w-4 h-4 text-[#4285f4]" />
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-medium">دعوة صديق</p>
                      <p className="text-xs text-muted-foreground">+100 نقطة</p>
                   </div>
                   <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">دعوة</Button>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg border border-dashed border-border hover:bg-muted/30 transition-colors">
                   <div className="p-2 bg-green-500/10 rounded-md">
                      <TrendingUp className="w-4 h-4 text-[#34a853]" />
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-medium">أكمل ملفك</p>
                      <p className="text-xs text-muted-foreground">+50 نقطة</p>
                   </div>
                   <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">إكمال</Button>
                </div>
             </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
