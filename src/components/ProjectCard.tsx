import { Calendar, GitBranch, ExternalLink, MoreVertical } from 'lucide-react';
import type { Project } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { TagChip } from './TagChip';
import { ProgressBar } from './ProgressBar';

interface ProjectCardProps {
  project: Project;
  onNavigate: (route: 'project-detail', projectId: string) => void;
}

export function ProjectCard({ project, onNavigate }: ProjectCardProps) {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onNavigate('project-detail', project.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
        </div>
        <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <TagChip key={tag} tag={tag} size="sm" />
        ))}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar progress={project.progress} size="sm" showLabel={false} />
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-600">{project.progress}% complete</span>
        </div>
      </div>

      {/* Status and Priority */}
      <div className="flex items-center gap-2 mb-4">
        <StatusBadge status={project.status} size="sm" />
        <PriorityBadge priority={project.priority} size="sm" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
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
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
