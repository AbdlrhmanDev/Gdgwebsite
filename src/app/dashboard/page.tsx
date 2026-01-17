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
          const response = await registrationService.getMyRegistrations();
          console.log("Dashboard - Full API Response:", response);
          
          // Handle response structure - API returns { success, data }
          const registrations = response.success ? response.data : response;
          console.log("Dashboard - Registrations:", registrations);
          
          // Filter out cancelled registrations
          const activeRegistrations = registrations.filter((reg: any) => 
            reg.status !== 'cancelled'
          );
          console.log("Dashboard - Active Registrations (not cancelled):", activeRegistrations);
          
          setMyRegistrations(activeRegistrations);
          
          // Extract event IDs - handle both eventId and event._id
          const eventIds = activeRegistrations.map((reg: any) => {
            const id = reg.event?._id || reg.eventId || reg.event?.id;
            console.log("Dashboard - Mapping registration:", reg, "to eventId:", id);
            return id;
          }).filter(Boolean); // Remove any undefined values
          
          console.log("Dashboard - Registered Event IDs:", eventIds);
          setRegisteredEventIds(eventIds);
        } catch (error) {
          console.error("Error fetching user registrations:", error);
        }
      };
      fetchMyRegistrations();
    }
  }, [userId]); // Re-fetch when userId changes

  const handleCancelRegistration = async (eventId: string) => {
    console.log("Attempting to delete registration for event:", eventId);
    console.log("Current registrations:", myRegistrations);
    console.log("Current registered event IDs:", registeredEventIds);
    
    if (window.confirm("هل أنت متأكد من إلغاء تسجيلك لهذه الفعالية؟")) {
      try {
        // Find registration by checking multiple possible event ID locations
        const registrationToDelete = myRegistrations.find((reg: any) => {
          const regEventId = reg.event?._id || reg.eventId || reg.event?.id;
          console.log("Comparing:", regEventId, "with", eventId);
          return regEventId === eventId;
        });

        console.log("Found registration to delete:", registrationToDelete);

        if (registrationToDelete) {
          // Use cancel endpoint which now deletes the registration
          const deleteResponse = await registrationService.cancelRegistration(registrationToDelete._id);
          console.log("Delete response:", deleteResponse);
          
          // After successful deletion, refetch registrations to update the UI
          const response = await registrationService.getMyRegistrations();
          console.log("Refetch response after delete:", response);
          
          const updatedRegistrations = response.success ? response.data : response;
          console.log("Updated registrations:", updatedRegistrations);
          
          // No need to filter - registrations are deleted now
          setMyRegistrations(updatedRegistrations);
          
          const eventIds = updatedRegistrations.map((reg: any) => 
            reg.event?._id || reg.eventId || reg.event?.id
          ).filter(Boolean);
          
          console.log("New registered event IDs after delete:", eventIds);
          setRegisteredEventIds(eventIds);
          
          console.log(`Registration for event ${eventId} deleted successfully.`);
          alert("تم إلغاء التسجيل بنجاح");
        } else {
          console.warn(`Could not find registration for event ${eventId}`);
          console.warn("Available event IDs:", myRegistrations.map((reg: any) => 
            reg.event?._id || reg.eventId || reg.event?.id
          ));
          alert("لم يتم العثور على التسجيل");
        }
      } catch (error) {
        console.error("Error deleting registration:", error);
        alert("فشل إلغاء التسجيل");
      }
    }
  };

  const handleRegisterForEvent = async (eventId: string) => {
    try {
      // Call the original onRegisterForEvent
      await onRegisterForEvent(eventId);
      
      // Refetch registrations to update the UI
      const response = await registrationService.getMyRegistrations();
      const updatedRegistrations = response.success ? response.data : response;
      
      // Filter out cancelled registrations
      const activeRegistrations = updatedRegistrations.filter((reg: any) => 
        reg.status !== 'cancelled'
      );
      
      setMyRegistrations(activeRegistrations);
      
      const eventIds = activeRegistrations.map((reg: any) => 
        reg.event?._id || reg.eventId || reg.event?.id
      ).filter(Boolean);
      setRegisteredEventIds(eventIds);
      
      console.log(`Registered for event ${eventId} successfully.`);
    } catch (error) {
      console.error("Error registering for event:", error);
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
            onRegisterForEvent={handleRegisterForEvent} // Pass wrapped handler
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
