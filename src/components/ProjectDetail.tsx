import { useState } from 'react';
import { ArrowLeft, Edit, GitBranch, ExternalLink, Calendar, Code, Plus, CheckCircle2, Circle, Minus } from 'lucide-react';
import type { Route } from '../App';
import { projects, tasks, ideas, milestones, notes } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { TagChip } from './TagChip';
import { ProgressBar } from './ProgressBar';
import { EmptyState } from './EmptyState';

interface ProjectDetailProps {
  projectId: string | null;
  onNavigate: (route: Route, projectId?: string) => void;
}

type TabType = 'overview' | 'todos' | 'ideas' | 'progress' | 'milestones' | 'notes';

export function ProjectDetail({ projectId, onNavigate }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h3 className="text-gray-900 mb-2">Project not found</h3>
          <button 
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const projectTasks = tasks.filter(t => t.projectId === projectId);
  const projectIdeas = ideas.filter(i => i.projectId === projectId);
  const projectMilestones = milestones.filter(m => m.projectId === projectId);
  const projectNotes = notes.filter(n => n.projectId === projectId);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'todos', label: 'Todo List', count: projectTasks.length },
    { id: 'ideas', label: 'Idea Box', count: projectIdeas.length },
    { id: 'progress', label: 'Progress Tracking' },
    { id: 'milestones', label: 'Milestones', count: projectMilestones.length },
    { id: 'notes', label: 'Notes', count: projectNotes.length },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onNavigate('projects')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mt-1"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600 max-w-2xl">{project.description}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <StatusBadge status={project.status} />
              <PriorityBadge priority={project.priority} />
              {project.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate('edit-project', projectId)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Project
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Description</label>
                      <p className="text-gray-900">{project.detailedDescription}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Created</label>
                        <p className="text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Last Updated</label>
                        <p className="text-gray-900">{new Date(project.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {project.deadline && (
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Deadline</label>
                        <p className="text-gray-900">{new Date(project.deadline).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Links</h3>
                  <div className="space-y-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <GitBranch className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">GitHub Repository</div>
                          <div className="text-xs text-gray-500">{project.githubUrl}</div>
                        </div>
                      </a>
                    )}
                    {project.deployUrl && (
                      <a
                        href={project.deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">Live Deployment</div>
                          <div className="text-xs text-gray-500">{project.deployUrl}</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Progress</h3>
                  <ProgressBar progress={project.progress} size="lg" />
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Tasks</span>
                      <span className="text-gray-900">{projectTasks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="text-gray-900">{projectTasks.filter(t => t.status === 'Done').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ideas</span>
                      <span className="text-gray-900">{projectIdeas.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Milestones</span>
                      <span className="text-gray-900">{projectMilestones.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'todos' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Task List</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
            
            {projectTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Todo', 'Doing', 'Blocked', 'Done'].map((status) => (
                  <div key={status} className="space-y-3">
                    <h4 className="text-sm text-gray-600 mb-3">
                      {status} ({projectTasks.filter(t => t.status === status).length})
                    </h4>
                    {projectTasks
                      .filter(t => t.status === status)
                      .map((task) => (
                        <div key={task.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h5 className="text-sm text-gray-900 mb-2">{task.title}</h5>
                          <p className="text-xs text-gray-600 mb-3">{task.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {task.tags.map((tag) => (
                              <TagChip key={tag} tag={tag} size="sm" />
                            ))}
                          </div>
                          <PriorityBadge priority={task.priority} size="sm" />
                          {task.deadline && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {new Date(task.deadline).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="No tasks yet"
                description="Add your first task to start tracking your work"
                actionLabel="Add Task"
                onAction={() => {}}
              />
            )}
          </div>
        )}

        {activeTab === 'ideas' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Idea Box</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Idea
              </button>
            </div>
            
            {projectIdeas.length > 0 ? (
              <div className="space-y-4">
                {projectIdeas.map((idea) => (
                  <div key={idea.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900">{idea.title}</h4>
                      <StatusBadge status={idea.status as any} size="sm" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
                    <div className="flex items-center gap-3">
                      <PriorityBadge priority={idea.priority} size="sm" />
                      <span className="text-xs text-gray-500">
                        Created {new Date(idea.createdAt).toLocaleDateString()}
                      </span>
                      <button className="ml-auto text-sm text-blue-600 hover:text-blue-700">
                        Convert to Task
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Circle}
                title="No ideas yet"
                description="Capture your project ideas and convert them to tasks"
                actionLabel="Add Idea"
                onAction={() => {}}
              />
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Current Focus</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-900">Working On</span>
                </div>
                <p className="text-sm text-blue-800">
                  {projectTasks.find(t => t.status === 'Doing')?.title || 'No active tasks'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Development Timeline</h3>
              <div className="space-y-4">
                {projectTasks
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((task, index) => (
                    <div key={task.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          task.status === 'Done' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {task.status === 'Done' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        {index < 4 && <div className="w-0.5 h-12 bg-gray-200 my-1" />}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm text-gray-900">{task.title}</h4>
                          <StatusBadge status={task.status} size="sm" />
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                        <span className="text-xs text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-2">
                {projectTasks
                  .filter(t => t.status === 'Todo')
                  .slice(0, 3)
                  .map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Minus className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{task.title}</span>
                      <PriorityBadge priority={task.priority} size="sm" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Milestones & Versions</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Milestone
              </button>
            </div>
            
            {projectMilestones.length > 0 ? (
              <div className="space-y-4">
                {projectMilestones.map((milestone) => (
                  <div key={milestone.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 mb-1">{milestone.version}</h4>
                        <p className="text-sm text-gray-600">{milestone.goal}</p>
                      </div>
                      <StatusBadge status={milestone.status as any} size="sm" />
                    </div>
                    <div className="mt-4">
                      <div className="text-xs text-gray-600 mb-2">
                        {milestone.tasks.length} tasks associated
                      </div>
                      {milestone.releaseUrl && (
                        <a
                          href={milestone.releaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Release
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="No milestones yet"
                description="Create milestones to track major versions and releases"
                actionLabel="Add Milestone"
                onAction={() => {}}
              />
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Development Notes</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Note
              </button>
            </div>
            
            {projectNotes.length > 0 ? (
              <div className="space-y-4">
                {projectNotes.map((note) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {note.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Circle}
                title="No notes yet"
                description="Keep track of decisions, bugs, and development progress"
                actionLabel="Add Note"
                onAction={() => {}}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
