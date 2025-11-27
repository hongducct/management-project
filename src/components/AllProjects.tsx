import { useState } from 'react';
import { Grid3X3, List, Filter, Search, Eye, Edit, Archive, Trash2, GitBranch, ExternalLink, Plus } from 'lucide-react';
import type { Route } from '../App';
import { projects } from '../data/mockData';
import type { ProjectStatus, Priority, ProjectTag } from '../data/mockData';
import { ProjectCard } from './ProjectCard';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { TagChip } from './TagChip';
import { ProgressBar } from './ProgressBar';

interface AllProjectsProps {
  onNavigate: (route: Route, projectId?: string) => void;
}

export function AllProjects({ onNavigate }: AllProjectsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<ProjectTag | 'all'>('all');

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    const matchesTag = tagFilter === 'all' || project.tags.includes(tagFilter);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTag && !project.archived;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">All Projects</h1>
          <p className="text-gray-600">{filteredProjects.length} projects found</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'all')}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Idea">Idea</option>
              <option value="Draft">Draft</option>
              <option value="Developing">Developing</option>
              <option value="Paused">Paused</option>
              <option value="Testing">Testing</option>
              <option value="Deploying">Deploying</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value as ProjectTag | 'all')}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tags</option>
              <option value="Website">Website</option>
              <option value="App">App</option>
              <option value="API">API</option>
              <option value="Extension">Extension</option>
              <option value="Tool">Tool</option>
              <option value="Research">Research</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Updated</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Links</th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onNavigate('project-detail', project.id)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={project.status} size="sm" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PriorityBadge priority={project.priority} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <ProgressBar progress={project.progress} size="sm" showLabel={false} />
                        <span className="text-xs text-gray-600 mt-1">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <TagChip key={tag} tag={tag} size="sm" />
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{project.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <GitBranch className="w-4 h-4 text-gray-500" />
                          </a>
                        )}
                        {project.deployUrl && (
                          <a 
                            href={project.deployUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-500" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('project-detail', project.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('edit-project', project.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4 text-gray-500" />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setPriorityFilter('all');
              setTagFilter('all');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
