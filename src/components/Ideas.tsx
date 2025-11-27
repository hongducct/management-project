import { useState } from 'react';
import { Plus, Lightbulb, ArrowRight, Trash2 } from 'lucide-react';
import type { Route } from '../App';
import { ideas, projects } from '../data/mockData';
import type { IdeaStatus, Priority } from '../data/mockData';
import { PriorityBadge } from './PriorityBadge';
import { EmptyState } from './EmptyState';

interface IdeasProps {
  onNavigate: (route: Route, projectId?: string) => void;
}

export function Ideas({ onNavigate }: IdeasProps) {
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | 'all'>('all');

  const globalIdeas = ideas.filter(i => !i.projectId);
  const filteredIdeas = statusFilter === 'all' 
    ? globalIdeas 
    : globalIdeas.filter(i => i.status === statusFilter);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Ideas</h1>
          <p className="text-gray-600">Capture and organize your project ideas</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Idea
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({globalIdeas.length})
          </button>
          <button
            onClick={() => setStatusFilter('New')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'New'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            New ({globalIdeas.filter(i => i.status === 'New').length})
          </button>
          <button
            onClick={() => setStatusFilter('In Progress')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'In Progress'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Progress ({globalIdeas.filter(i => i.status === 'In Progress').length})
          </button>
          <button
            onClick={() => setStatusFilter('Completed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === 'Completed'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed ({globalIdeas.filter(i => i.status === 'Completed').length})
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">{idea.title}</h3>
                  <p className="text-sm text-gray-600">{idea.description}</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <PriorityBadge priority={idea.priority} size="sm" />
                <span className={`px-2 py-1 rounded-full text-xs ${
                  idea.status === 'New' ? 'bg-blue-100 text-blue-700' :
                  idea.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {idea.status}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500 flex-1">
                  {new Date(idea.createdAt).toLocaleDateString()}
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Convert to Project
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Lightbulb}
          title="No ideas yet"
          description="Start capturing your brilliant ideas and turn them into projects"
          actionLabel="Add Your First Idea"
          onAction={() => {}}
        />
      )}

      {/* Ideas from Projects */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Ideas by Project</h3>
        <div className="space-y-4">
          {projects.map((project) => {
            const projectIdeas = ideas.filter(i => i.projectId === project.id);
            if (projectIdeas.length === 0) return null;

            return (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 
                    className="text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => onNavigate('project-detail', project.id)}
                  >
                    {project.name}
                  </h4>
                  <span className="text-xs text-gray-500">{projectIdeas.length} ideas</span>
                </div>
                <div className="space-y-2">
                  {projectIdeas.map((idea) => (
                    <div key={idea.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900">{idea.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{idea.description}</div>
                      </div>
                      <PriorityBadge priority={idea.priority} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
