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
import { registrationService } from "../../services/registrationService"; // Import registrationService

// Define a type for registration objects based on what getMyRegistrations might return
interface UserRegistration {
  _id: string; // Registration ID
  eventId: string;
  userId: string;
  // Add other registration properties if needed
}

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
  const [myRegistrations, setMyRegistrations] = useState<UserRegistration[]>([]); // State to store user's full registrations
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]); // State to store just event IDs

  const publicEvents = events.filter((event) => event.isPublic !== false);

  useEffect(() => {
    setDashboardView(getDefaultViewForRole(userRole));
  }, [userRole]);

  useEffect(() => {
    // Fetch user registrations when userId is available
    if (userId) {
      const fetchMyRegistrations = async () => {
        try {
          const registrations = await registrationService.getMyRegistrations();
          setMyRegistrations(registrations);
          setRegisteredEventIds(registrations.map((reg: UserRegistration) => reg.eventId));
        } catch (error) {
          console.error("Error fetching user registrations:", error);
        }
      };
      fetchMyRegistrations();
    }
  }, [userId]); // Re-fetch when userId changes

  const handleCancelRegistration = async (eventId: string) => {
    if (window.confirm("هل أنت متأكد من إلغاء تسجيلك لهذه الفعالية؟")) {
      try {
        const registrationToCancel = myRegistrations.find(
          (reg) => reg.eventId === eventId && reg.userId === userId
        );

        if (registrationToCancel) {
          await registrationService.cancelRegistration(registrationToCancel._id);
          // After successful cancellation, refetch registrations to update the UI
          const updatedRegistrations = await registrationService.getMyRegistrations();
          setMyRegistrations(updatedRegistrations);
          setRegisteredEventIds(updatedRegistrations.map((reg: UserRegistration) => reg.eventId));
          console.log(`Registration for event ${eventId} cancelled successfully.`);
        } else {
          console.warn(`Could not find registration for event ${eventId} by user ${userId}.`);
        }
      } catch (error) {
        console.error("Error cancelling registration:", error);
      }
    }
  };

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
            onCancelRegistration={handleCancelRegistration} // Pass new prop
            isAdmin={userRole === 'admin'}
            userRole={userRole}
            currentUserId={userId} // Pass new prop
            userRegistrations={registeredEventIds} // Pass new prop
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
        return <UserDashboard events={publicEvents} onRegisterForEvent={onRegisterForEvent} />;
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
