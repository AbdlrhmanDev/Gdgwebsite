import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, Crown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { type Language, getTranslation } from "../lib/i18n";
import { userService } from "../services/userService";

interface LeaderboardProps {
  lang: Language;
}

export function Leaderboard({ lang }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = (key: string) => getTranslation(lang, key);
  const isRTL = lang === 'ar';

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await userService.getLeaderboard();
      if (response.success) {
        // Sort by points descending and take top 10
        const sorted = response.data
          .sort((a: any, b: any) => b.points - a.points)
          .slice(0, 10);
        setLeaderboard(sorted);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-[#f9ab00]" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-[#ea4335]" />;
    return <span className="text-xl font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? '#34a853' : '#4285f4';
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' 
      ? (lang === 'ar' ? 'مدير' : 'Admin')
      : (lang === 'ar' ? 'عضو' : 'Member');
  };

  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <section className="bg-background py-24 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', 
             backgroundSize: '32px 32px' 
           }}>
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm"
          >
            <Trophy className="w-4 h-4 text-[#f9ab00]" />
            <span className="text-xs font-bold tracking-wide text-foreground uppercase">
              {lang === 'ar' ? 'المتصدرون' : 'Top Contributors'}
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground tracking-tight"
          >
            {lang === 'ar' ? 'لوحة المتصدرين' : 'Leaderboard'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {lang === 'ar' 
              ? 'أفضل الأعضاء الأكثر نشاطاً ومساهمة في المجتمع'
              : 'Our most active and contributing community members'
            }
          </motion.p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <Card className="border-border/50 bg-card/50 overflow-hidden shadow-xl">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-end">
                      {/* 2nd Place */}
                      {topThree[1] && (
                        <div className="flex flex-col items-center order-2 md:order-1">
                          <div className="relative mb-4">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-gray-300/50">
                              {topThree[1].user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-md">
                              <Medal className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-gray-300/20 to-gray-500/20 px-6 py-8 rounded-t-2xl text-center min-w-[140px] border-t-4 border-gray-400">
                            <h3 className="font-bold text-lg mb-1 truncate max-w-[120px]">{topThree[1].user.name}</h3>
                            <p className="text-2xl font-bold text-foreground mb-1">{topThree[1].points}</p>
                            <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'نقطة' : 'points'}</p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              {lang === 'ar' ? 'المستوى' : 'Level'} {topThree[1].level}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 1st Place */}
                      {topThree[0] && (
                        <div className="flex flex-col items-center order-1 md:order-2">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-3xl shadow-2xl ring-4 ring-yellow-400/50 animate-pulse">
                              {topThree[0].user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#f9ab00] rounded-full flex items-center justify-center shadow-lg">
                              <Crown className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 px-8 py-12 rounded-t-2xl text-center min-w-[160px] border-t-4 border-yellow-500">
                            <h3 className="font-bold text-xl mb-1 truncate max-w-[140px]">{topThree[0].user.name}</h3>
                            <p className="text-3xl font-bold text-foreground mb-1">{topThree[0].points}</p>
                            <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'نقطة' : 'points'}</p>
                            <div className="mt-3 text-sm text-muted-foreground">
                              {lang === 'ar' ? 'المستوى' : 'Level'} {topThree[0].level}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3rd Place */}
                      {topThree[2] && (
                        <div className="flex flex-col items-center order-3 md:order-3">
                          <div className="relative mb-4">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-orange-400/50">
                              {topThree[2].user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ea4335] rounded-full flex items-center justify-center shadow-md">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-400/20 to-red-500/20 px-6 py-6 rounded-t-2xl text-center min-w-[140px] border-t-4 border-orange-500">
                            <h3 className="font-bold text-lg mb-1 truncate max-w-[120px]">{topThree[2].user.name}</h3>
                            <p className="text-2xl font-bold text-foreground mb-1">{topThree[2].points}</p>
                            <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'نقطة' : 'points'}</p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              {lang === 'ar' ? 'المستوى' : 'Level'} {topThree[2].level}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Rest of Leaderboard */}
            {restOfLeaderboard.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                {restOfLeaderboard.map((user, index) => {
                  const rank = index + 4;
                  return (
                    <motion.div
                      key={user._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="border-border/50 bg-card/50 hover:border-border transition-all hover:shadow-lg">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            {/* Rank */}
                            <div className="w-12 flex items-center justify-center">
                              {getRankIcon(rank)}
                            </div>

                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4285f4] to-[#34a853] flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                              {user.user.name.charAt(0).toUpperCase()}
                            </div>

                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground truncate">{user.user.name}</h3>
                              </div>
                              {user.user.department && user.user.department !== 'none' && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {lang === 'ar' ? 'القسم:' : 'Dept:'} {user.user.department}
                                </p>
                              )}
                            </div>

                            {/* Stats */}
                            <div className="text-right flex-shrink-0">
                              <div className="flex items-center gap-1 justify-end">
                                <p className="text-xl font-bold text-foreground">{user.points}</p>
                                <Star className="w-4 h-4 text-[#f9ab00]" />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {lang === 'ar' ? 'المستوى' : 'Lvl'} {user.level}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {leaderboard.length === 0 && !loading && (
              <div className="text-center py-16 bg-card/50 border border-dashed border-border rounded-3xl">
                <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium">
                  {lang === 'ar' ? 'لا توجد بيانات متاحة حالياً' : 'No data available'}
                </h3>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
