"use client";

import { PanelLayout } from "@/components/PanelLayout";
import { AdminPanel } from "@/components/AdminPanel";
import { GamificationDashboard } from "@/components/GamificationDashboard";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { MemberProfile } from "@/components/MemberProfile";
import { DashboardOverview } from "@/components/DashboardOverview";
import { SettingsPanel } from "@/components/SettingsPanel";
import { UserDashboard } from "@/components/UserDashboard";
import { MyEventsPanel } from "@/components/MyEventsPanel";
import { TasksPanel } from "@/components/TasksPanel";
import { DepartmentsPanel } from "@/components/DepartmentsPanel";
import { CreateTaskModal } from "@/components/CreateTaskModal";
import { useGlobal } from "@/contexts/GlobalContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export type DashboardView = 'overview' | 'events' | 'analytics' | 'profile' | 'gamification' | 'members' | 'settings' | 'browse' | 'myevents' | 'tasks' | 'departments';

export default function DashboardPage() {
    const {
        userRole,
        userEmail,
        events,
        logout,
        addEvent,
        editEvent,
        deleteEvent,
        gamificationData,
        isLoggedIn
    } = useGlobal();

    const router = useRouter();
    const [dashboardView, setDashboardView] = useState<DashboardView>('overview');
    const [showCreateTask, setShowCreateTask] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    const handleRegisterForEvent = (eventId: string) => {
        const event = events.find(e => e.id === eventId);
        if (event) {
            alert(`سيتم توجيهك لصفحة التسجيل في: ${event.title}`);
        }
    };

    return (
        <PanelLayout
            userRole={userRole}
            userEmail={userEmail}
            onLogout={logout}
            onNavigateToSite={() => router.push('/')}
            currentView={dashboardView}
            onViewChange={(view) => setDashboardView(view as DashboardView)}
        >
            {/* User (مستخدم) - Limited access */}
            {userRole === 'user' && (
                <>
                    {dashboardView === 'overview' && (
                        <UserDashboard events={events} onRegisterForEvent={handleRegisterForEvent} />
                    )}
                    {dashboardView === 'browse' && (
                        <UserDashboard events={events} onRegisterForEvent={handleRegisterForEvent} />
                    )}
                </>
            )}

            {/* Member (عضو) - Standard access */}
            {userRole === 'member' && (
                <>
                    {dashboardView === 'overview' && <DashboardOverview />}
                    {dashboardView === 'events' && (
                        <MyEventsPanel userEmail={userEmail} />
                    )}
                    {dashboardView === 'profile' && (
                        <MemberProfile userId={userEmail} isOwnProfile={true} />
                    )}
                    {dashboardView === 'gamification' && (
                        <GamificationDashboard {...gamificationData} />
                    )}
                    {dashboardView === 'tasks' && (
                        <TasksPanel userEmail={userEmail} userRole={userRole} onCreateTask={() => setShowCreateTask(true)} />
                    )}
                    {dashboardView === 'departments' && (
                        <DepartmentsPanel />
                    )}
                </>
            )}

            {/* Admin (مدير) - Full access */}
            {userRole === 'admin' && (
                <>
                    {dashboardView === 'overview' && <DashboardOverview />}
                    {dashboardView === 'events' && (
                        <AdminPanel
                            events={events}
                            onAddEvent={addEvent}
                            onEditEvent={editEvent}
                            onDeleteEvent={deleteEvent}
                            isAdmin={true}
                        />
                    )}
                    {dashboardView === 'analytics' && <AnalyticsDashboard />}
                    {dashboardView === 'profile' && (
                        <MemberProfile userId={userEmail} isOwnProfile={true} />
                    )}
                    {dashboardView === 'gamification' && (
                        <GamificationDashboard {...gamificationData} />
                    )}
                    {dashboardView === 'settings' && <SettingsPanel />}
                    {dashboardView === 'members' && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">قريباً: إدارة الأعضاء</p>
                        </div>
                    )}
                    {dashboardView === 'myevents' && (
                        <MyEventsPanel userEmail={userEmail} />
                    )}
                    {dashboardView === 'tasks' && (
                        <TasksPanel userEmail={userEmail} userRole={userRole} onCreateTask={() => setShowCreateTask(true)} />
                    )}
                    {dashboardView === 'departments' && (
                        <DepartmentsPanel />
                    )}
                </>
            )}

            {/* Create Task Modal */}
            {showCreateTask && (
                <CreateTaskModal
                    isOpen={showCreateTask}
                    onClose={() => setShowCreateTask(false)}
                    createdBy={userEmail}
                />
            )}
        </PanelLayout>
    );
}
