import { Trophy, Award, Star, TrendingUp, Zap } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

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

export function GamificationDashboard({ userPoints, userLevel, userRank, badges }: GamificationDashboardProps) {
  const pointsToNextLevel = 1000;
  const currentLevelProgress = (userPoints % pointsToNextLevel) / pointsToNextLevel * 100;
  
  return (
    <div className="space-y-6">
      {/* Level & Points Card */}
      <div className="bg-gradient-to-br from-[#4285f4] to-[#34a853] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">المستوى الحالي</p>
            <h3 className="text-3xl">المستوى {userLevel}</h3>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{userPoints} نقطة</span>
            <span>{pointsToNextLevel} نقطة</span>
          </div>
          <Progress value={currentLevelProgress} className="h-2 bg-white bg-opacity-30" />
          <p className="text-xs opacity-90">
            {pointsToNextLevel - (userPoints % pointsToNextLevel)} نقطة متبقية للمستوى التالي
          </p>
        </div>
      </div>

      {/* Rank Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#f9ab00] bg-opacity-10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#f9ab00]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">ترتيبك</p>
            <p className="text-2xl">#{userRank}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          أنت في المرتبة {userRank} من بين جميع الأعضاء!
        </p>
      </div>

      {/* Badges Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-[#4285f4]" />
          <h3 className="text-xl">الشارات والإنجازات</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                badge.earned
                  ? 'border-[#34a853] bg-[#34a853] bg-opacity-5'
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{badge.icon}</span>
                {badge.earned && <Star className="w-4 h-4 text-[#f9ab00] fill-[#f9ab00]" />}
              </div>
              <p className="text-sm">{badge.name}</p>
              <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
              {badge.earned && badge.earnedDate && (
                <p className="text-xs text-[#34a853] mt-2">حصلت عليها في {badge.earnedDate}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Points */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-[#f9ab00]" />
          <h3 className="text-xl">اكسب المزيد من النقاط</h3>
        </div>
        
        <div className="space-y-3">
          {[
            { action: "حضور فعالية", points: 50, color: "#4285f4" },
            { action: "تنظيم ورشة عمل", points: 200, color: "#34a853" },
            { action: "نشر مشروع", points: 100, color: "#f9ab00" },
            { action: "كتابة مقال تقني", points: 150, color: "#ea4335" },
            { action: "مساعدة عضو جديد", points: 30, color: "#4285f4" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700">{item.action}</span>
              <Badge style={{ backgroundColor: item.color }}>
                +{item.points} نقطة
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
