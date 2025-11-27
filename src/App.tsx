import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AllProjects } from './components/AllProjects';
import { ProjectDetail } from './components/ProjectDetail';
import { EditProject } from './components/EditProject';
import { Ideas } from './components/Ideas';
import { Tasks } from './components/Tasks';
import { Calendar } from './components/Calendar';
import { Settings } from './components/Settings';

export type Route = 'dashboard' | 'projects' | 'project-detail' | 'edit-project' | 'ideas' | 'tasks' | 'calendar' | 'settings';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavigate = (route: Route, projectId?: string) => {
    setCurrentRoute(route);
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  };

  const renderContent = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'projects':
        return <AllProjects onNavigate={handleNavigate} />;
      case 'project-detail':
        return <ProjectDetail projectId={selectedProjectId} onNavigate={handleNavigate} />;
      case 'edit-project':
        return <EditProject projectId={selectedProjectId} onNavigate={handleNavigate} />;
      case 'ideas':
        return <Ideas onNavigate={handleNavigate} />;
      case 'tasks':
        return <Tasks />;
      case 'calendar':
        return <Calendar />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentRoute={currentRoute} 
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
