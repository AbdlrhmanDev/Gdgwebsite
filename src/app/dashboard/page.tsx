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
import { useState, useEffect } from "react";

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
  const getDefaultViewForRole = (role: UserRole): DashboardView => {
    switch (role) {
      case 'member':
        return 'events';
      case 'user':
        return 'browse';
      default:
        return 'overview';
    }
  };

  const [dashboardView, setDashboardView] = useState<DashboardView>(() => getDefaultViewForRole(userRole));
  const [showCreateTask, setShowCreateTask] = useState(false);

  useEffect(() => {
    setDashboardView(getDefaultViewForRole(userRole));
  }, [userRole]);

  const renderContent = () => {
    switch (dashboardView) {
      case 'overview':
        return <DashboardOverview />;
      case 'events':
        return (
          <AdminPanel
            events={events}
            onAddEvent={onAddEvent}
            onEditEvent={onEditEvent}
            onDeleteEvent={onDeleteEvent}
            isAdmin={userRole === 'admin'}
            userRole={userRole}
          />
        );
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'profile':
        return <MemberProfile userId={userId} isOwnProfile={true} />;
      case 'gamification':
        return <GamificationDashboard {...gamificationData} />;
      case 'settings':
        return <SettingsPanel />;
      case 'members':
        return <MembersPanel />;
      case 'myevents':
        return <MyEventsPanel userEmail={userEmail} />;
      case 'tasks':
        return <TasksPanel userEmail={userEmail} userRole={userRole} onCreateTask={() => setShowCreateTask(true)} />;
      case 'departments':
        return <DepartmentsPanel />;
      case 'leaderboard':
        return <LeaderboardPanel />;
      case 'browse':
        return <UserDashboard events={events} onRegisterForEvent={onRegisterForEvent} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <PanelLayout
      userRole={userRole}
      userEmail={userEmail}
      onLogout={onLogout}
      onNavigateToSite={onNavigateToSite}
      currentView={dashboardView}
      onViewChange={setDashboardView}
    >
      {renderContent()}

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
