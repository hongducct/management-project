import { LayoutDashboard, FolderKanban, Lightbulb, CheckSquare, Calendar as CalendarIcon, FileText, Settings as SettingsIcon, ChevronLeft, Code2 } from 'lucide-react';
import type { Route } from '../App';

interface SidebarProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard' as Route, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects' as Route, label: 'All Projects', icon: FolderKanban },
  { id: 'ideas' as Route, label: 'Ideas', icon: Lightbulb },
  { id: 'tasks' as Route, label: 'Tasks', icon: CheckSquare },
  { id: 'calendar' as Route, label: 'Calendar', icon: CalendarIcon },
  { id: 'settings' as Route, label: 'Settings', icon: SettingsIcon },
];

export function Sidebar({ currentRoute, onNavigate, isOpen, onToggle }: SidebarProps) {
  return (
    <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900">DevProjects</span>
          </div>
        )}
        {!isOpen && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
            <Code2 className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ChevronLeft className={`w-5 h-5 transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
          {isOpen && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
