import { PanelLayout } from "../../components/PanelLayout";
import { AdminPanel } from "../../components/AdminPanel";
import { GamificationDashboard } from "../../components/GamificationDashboard";
import { AnalyticsDashboard } from "../../components/AnalyticsDashboard";
import { MemberProfile } from "../../components/MemberProfile";
import { DashboardOverview } from "../../components/DashboardOverview";
import { SettingsPanel } from "../../components/SettingsPanel";
import { UserDashboard } from "../../components/UserDashboard";
import { MyEventsPanel } from "../../components/MyEventsPanel";
import { TasksPanel } from "../../components/TasksPanel";
import { DepartmentsPanel } from "../../components/DepartmentsPanel";
import { MembersPanel } from "../../components/MembersPanel";
import { LeaderboardPanel } from "../../components/LeaderboardPanel";
import { CreateTaskModal } from "../../components/CreateTaskModal";
import { type Event } from "../../lib/storage";
import { type UserRole } from "../../App";
import { useState } from "react";

export type DashboardView = 'overview' | 'events' | 'analytics' | 'profile' | 'gamification' | 'members' | 'settings' | 'browse' | 'myevents' | 'tasks' | 'departments' | 'leaderboard';

interface DashboardPageProps {
  userRole: UserRole;
  userEmail: string;
  userId: string;
  events: Event[];
  onLogout: () => void;
  onNavigateToSite: () => void;
  onAddEvent: (event: any) => void;
  onEditEvent: (id: string, event: any) => void;
  onDeleteEvent: (id: string) => void;
  onRegisterForEvent: (eventId: string) => void;
  gamificationData: any;
}

export default function DashboardPage({
  userRole,
  userEmail,
  userId,
  events,
  onLogout,
  onNavigateToSite,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onRegisterForEvent,
  gamificationData
}: DashboardPageProps) {
  const [dashboardView, setDashboardView] = useState<DashboardView>('overview');
  const [showCreateTask, setShowCreateTask] = useState(false);

  return (
    <PanelLayout
      userRole={userRole}
      userEmail={userEmail}
      onLogout={onLogout}
      onNavigateToSite={onNavigateToSite}
      currentView={dashboardView}
      onViewChange={setDashboardView}
    >
      {/* User (مستخدم) - Limited access */}
      {userRole === 'user' && (
        <>
          {dashboardView === 'overview' && (
            <UserDashboard events={events} onRegisterForEvent={onRegisterForEvent} />
          )}
          {dashboardView === 'browse' && (
            <UserDashboard events={events} onRegisterForEvent={onRegisterForEvent} />
          )}
        </>
      )}

      {/* Member (عضو) - Standard access */}
      {userRole === 'member' && (
        <>
          {dashboardView === 'overview' && <DashboardOverview />}
          {(dashboardView === 'myevents' || dashboardView === 'events') && (
            <MyEventsPanel userEmail={userEmail} />
          )}
          {dashboardView === 'profile' && (
            <MemberProfile userId={userId} isOwnProfile={true} />
          )}
          {dashboardView === 'gamification' && (
            <GamificationDashboard {...gamificationData} />
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
              onAddEvent={onAddEvent}
              onEditEvent={onEditEvent}
              onDeleteEvent={onDeleteEvent}
              isAdmin={true}
            />
          )}
          {dashboardView === 'analytics' && <AnalyticsDashboard />}
          {dashboardView === 'profile' && (
            <MemberProfile userId={userId} isOwnProfile={true} />
          )}
          {dashboardView === 'gamification' && (
            <GamificationDashboard {...gamificationData} />
          )}
          {dashboardView === 'settings' && <SettingsPanel />}
          {dashboardView === 'members' && (
            <MembersPanel />
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
          {dashboardView === 'leaderboard' && (
            <LeaderboardPanel />
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
