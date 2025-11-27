import { useState } from 'react';
import { ArrowLeft, Save, X, Upload } from 'lucide-react';
import type { Route } from '../App';
import { projects } from '../data/mockData';
import type { ProjectStatus, Priority, ProjectTag } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { TagChip } from './TagChip';
import { ProgressBar } from './ProgressBar';

interface EditProjectProps {
  projectId: string | null;
  onNavigate: (route: Route, projectId?: string) => void;
}

export function EditProject({ projectId, onNavigate }: EditProjectProps) {
  const project = projects.find(p => p.id === projectId);

  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    detailedDescription: project?.detailedDescription || '',
    status: project?.status || 'Draft' as ProjectStatus,
    priority: project?.priority || 'Medium' as Priority,
    tags: project?.tags || [] as ProjectTag[],
    techStack: project?.techStack.join(', ') || '',
    githubUrl: project?.githubUrl || '',
    deployUrl: project?.deployUrl || '',
    deadline: project?.deadline || '',
    archived: project?.archived || false,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the changes
    console.log('Saving project:', formData);
    onNavigate('project-detail', projectId);
  };

  const handleTagToggle = (tag: ProjectTag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const allTags: ProjectTag[] = ['Website', 'App', 'API', 'Extension', 'Tool', 'Research'];

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('project-detail', projectId)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-gray-900">Edit Project</h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onNavigate('project-detail', projectId)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief one-line description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    value={formData.detailedDescription}
                    onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed project description..."
                  />
                </div>
              </div>
            </div>

            {/* Project Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Project Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Draft">Draft</option>
                    <option value="Developing">Developing</option>
                    <option value="Paused">Paused</option>
                    <option value="Testing">Testing</option>
                    <option value="Deploying">Deploying</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.archived}
                      onChange={(e) => setFormData({ ...formData, archived: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Archive this project</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Project Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      formData.tags.includes(tag)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Tech Stack</h3>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, PostgreSQL, etc."
                />
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Deployment URL
                  </label>
                  <input
                    type="url"
                    value={formData.deployUrl}
                    onChange={(e) => setFormData({ ...formData, deployUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://your-project.com"
                  />
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Cover Image (Optional)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or WebP (max. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Preview</h3>
                
                {/* Mini Card Preview */}
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <h4 className="text-gray-900 mb-2">{formData.name || 'Project Name'}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {formData.description || 'Project description'}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {formData.tags.map((tag) => (
                      <TagChip key={tag} tag={tag} size="sm" />
                    ))}
                  </div>

                  <div className="mb-3">
                    <ProgressBar progress={project.progress} size="sm" showLabel={false} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={formData.status} size="sm" />
                    <PriorityBadge priority={formData.priority} size="sm" />
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  This is how your project card will appear in the dashboard
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="text-sm text-blue-900 mb-2">Tips</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Keep the short description under 60 characters</li>
                  <li>• Select relevant tags for better organization</li>
                  <li>• Add GitHub and deploy URLs for quick access</li>
                  <li>• Update status regularly to track progress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
