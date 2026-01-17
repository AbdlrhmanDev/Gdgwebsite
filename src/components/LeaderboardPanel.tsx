import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, TrendingUp, Users, Crown, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { motion } from "motion/react";
import { userService } from "../services/userService";

export function LeaderboardPanel() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'admin' | 'member'>('all');

  useEffect(() => {
    loadLeaderboard();
  }, [filter]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await userService.getLeaderboard(filter === 'all' ? 100 : undefined);
      if (response.success) {
        let filteredData = response.data;
        if(filter !== 'all') {
          filteredData = response.data.filter((u: any) => u.user.role === filter);
        }
        setLeaderboard(filteredData);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-[#f9ab00]" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-[#ea4335]" />;
    return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-red-500';
    return 'bg-muted';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#34a853';
      case 'member': return '#4285f4';
      default: return '#9e9e9e';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدير';
      case 'member': return 'عضو';
      default: return 'مستخدم';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Top 3 for podium
  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#f9ab00]">
            لوحة المتصدرين
          </h2>
          <p className="text-muted-foreground mt-2">أفضل الأعضاء الأكثر نشاطاً ومساهمة في المجتمع</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-muted/50 p-1 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter('admin')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'admin'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            المدراء
          </button>
          <button
            onClick={() => setFilter('member')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'member'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            الأعضاء
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-[#4285f4]/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4285f4]/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4285f4]" />
              </div>
              <div>
                <p className="text-3xl font-bold">{leaderboard.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي المتنافسين</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-[#34a853]/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#34a853]/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#34a853]" />
              </div>
              <div>
                <p className="text-3xl font-bold">{leaderboard[0]?.points || 0}</p>
                <p className="text-sm text-muted-foreground">أعلى نقاط</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-[#f9ab00]/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f9ab00]/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#f9ab00]" />
              </div>
              <div>
                <p className="text-3xl font-bold">{Math.round(leaderboard.reduce((sum, u) => sum + u.points, 0) / leaderboard.length) || 0}</p>
                <p className="text-sm text-muted-foreground">متوسط النقاط</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-[#ea4335]/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ea4335]/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#ea4335]" />
              </div>
              <div>
                <p className="text-3xl font-bold">{leaderboard[0]?.level || 0}</p>
                <p className="text-sm text-muted-foreground">أعلى مستوى</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <Card className="border-border/50 bg-card/50 overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-[#4285f4]/5 via-[#34a853]/5 to-[#f9ab00]/5">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#f9ab00]" />
              المركز الأول - الثالث
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex items-end justify-center gap-4 md:gap-8">
              {/* 2nd Place */}
              {topThree[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-gray-300/50">
                      {topThree[1].name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-md">
                      <Medal className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-300/20 to-gray-500/20 px-6 py-8 rounded-t-2xl text-center min-w-[140px] border-t-4 border-gray-400">
                    <h3 className="font-bold text-lg mb-1">{topThree[1].name}</h3>
                    <Badge style={{ backgroundColor: getRoleColor(topThree[1].role) }} className="mb-2 text-xs">
                      {getRoleLabel(topThree[1].role)}
                    </Badge>
                    <p className="text-2xl font-bold text-foreground mb-1">{topThree[1].points}</p>
                    <p className="text-sm text-muted-foreground">نقطة</p>
                    <div className="mt-2 text-xs text-muted-foreground">المستوى {topThree[1].level}</div>
                  </div>
                </motion.div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-3xl shadow-2xl ring-4 ring-yellow-400/50 animate-pulse">
                      {topThree[0].name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#f9ab00] rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 px-8 py-12 rounded-t-2xl text-center min-w-[160px] border-t-4 border-yellow-500">
                    <h3 className="font-bold text-xl mb-1">{topThree[0].name}</h3>
                    <Badge style={{ backgroundColor: getRoleColor(topThree[0].role) }} className="mb-3">
                      {getRoleLabel(topThree[0].role)}
                    </Badge>
                    <p className="text-3xl font-bold text-foreground mb-1">{topThree[0].points}</p>
                    <p className="text-sm text-muted-foreground">نقطة</p>
                    <div className="mt-3 text-sm text-muted-foreground">المستوى {topThree[0].level}</div>
                  </div>
                </motion.div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-orange-400/50">
                      {topThree[2].name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ea4335] rounded-full flex items-center justify-center shadow-md">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-400/20 to-red-500/20 px-6 py-6 rounded-t-2xl text-center min-w-[140px] border-t-4 border-orange-500">
                    <h3 className="font-bold text-lg mb-1">{topThree[2].name}</h3>
                    <Badge style={{ backgroundColor: getRoleColor(topThree[2].role) }} className="mb-2 text-xs">
                      {getRoleLabel(topThree[2].role)}
                    </Badge>
                    <p className="text-2xl font-bold text-foreground mb-1">{topThree[2].points}</p>
                    <p className="text-sm text-muted-foreground">نقطة</p>
                    <div className="mt-2 text-xs text-muted-foreground">المستوى {topThree[2].level}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rest of Leaderboard */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#4285f4]" />
            قائمة المتصدرين الكاملة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {restOfLeaderboard.map((user, index) => {
              const rank = index + 4;
              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                >
                  {/* Rank */}
                  <div className="w-16 flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4285f4] to-[#34a853] flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <Badge style={{ backgroundColor: getRoleColor(user.role) }} className="text-xs">
                        {getRoleLabel(user.role)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.department && user.department !== 'none' && (
                      <p className="text-xs text-muted-foreground mt-1">القسم: {user.department}</p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <p className="text-2xl font-bold text-foreground">{user.points}</p>
                      <Star className="w-5 h-5 text-[#f9ab00]" />
                    </div>
                    <p className="text-sm text-muted-foreground">المستوى {user.level}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {restOfLeaderboard.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg">لا يوجد متنافسين آخرين</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
