import { useState } from 'react';
import { Plus, FolderPlus, Lightbulb, FileText, TrendingUp, Clock, Target } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Route } from '../App';
import { projects, tasks } from '../data/mockData';
import { ProjectCard } from './ProjectCard';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';

interface DashboardProps {
  onNavigate: (route: Route, projectId?: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Calculate statistics
  const activeProjects = projects.filter(p => !p.archived);
  const completedProjects = activeProjects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = activeProjects.filter(p => p.status === 'Developing' || p.status === 'Testing').length;
  const urgentTasks = tasks.filter(t => t.priority === 'Urgent' && t.status !== 'Done').length;

  // Data for charts
  const statusData = [
    { name: 'Idea', value: activeProjects.filter(p => p.status === 'Idea').length, color: '#9CA3AF' },
    { name: 'Draft', value: activeProjects.filter(p => p.status === 'Draft').length, color: '#FBBF24' },
    { name: 'Developing', value: activeProjects.filter(p => p.status === 'Developing').length, color: '#3B82F6' },
    { name: 'Testing', value: activeProjects.filter(p => p.status === 'Testing').length, color: '#8B5CF6' },
    { name: 'Completed', value: activeProjects.filter(p => p.status === 'Completed').length, color: '#10B981' },
  ].filter(item => item.value > 0);

  const progressData = activeProjects.map(p => ({
    name: p.name.substring(0, 15) + (p.name.length > 15 ? '...' : ''),
    progress: p.progress,
  }));

  const weeklyData = [
    { day: 'Mon', hours: 6 },
    { day: 'Tue', hours: 8 },
    { day: 'Wed', hours: 5 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 9 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 },
  ];

  const displayedProjects = showAllProjects ? activeProjects : activeProjects.slice(0, 6);
  const globalTasks = tasks.filter(t => !t.projectId);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderPlus className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <div className="text-2xl text-gray-900 mb-1">{activeProjects.length}</div>
          <p className="text-sm text-gray-600">Active Projects</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs text-gray-500">Completed</span>
          </div>
          <div className="text-2xl text-gray-900 mb-1">{completedProjects}</div>
          <p className="text-sm text-gray-600">Finished Projects</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs text-gray-500">In Progress</span>
          </div>
          <div className="text-2xl text-gray-900 mb-1">{inProgressProjects}</div>
          <p className="text-sm text-gray-600">Active Development</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xs text-gray-500">Urgent</span>
          </div>
          <div className="text-2xl text-gray-900 mb-1">{urgentTasks}</div>
          <p className="text-sm text-gray-600">Tasks Need Attention</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-900">New Project</div>
              <div className="text-xs text-gray-500">Create project</div>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-900">Add Idea</div>
              <div className="text-xs text-gray-500">Capture inspiration</div>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-900">Quick Note</div>
              <div className="text-xs text-gray-500">Jot it down</div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FolderPlus className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-900">View All</div>
              <div className="text-xs text-gray-500">See projects</div>
            </div>
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Projects by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Coding Time */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">This Week's Coding Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Total: </span>
            <span className="text-gray-900">41 hours</span>
          </div>
        </div>
      </div>

      {/* Project Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Project Progress Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="progress" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Global Todo List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Global Tasks</h3>
          <button 
            onClick={() => onNavigate('tasks')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>
        {globalTasks.length > 0 ? (
          <div className="space-y-3">
            {globalTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" checked={task.status === 'Done'} readOnly />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{task.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <PriorityBadge priority={task.priority} size="sm" />
                    {task.deadline && (
                      <span className="text-xs text-gray-500">Due: {new Date(task.deadline).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <StatusBadge status={task.status} size="sm" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-8">No global tasks yet. Add one to get started!</p>
        )}
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Recent Projects</h2>
          <button 
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showAllProjects ? 'Show Less' : 'View All'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
