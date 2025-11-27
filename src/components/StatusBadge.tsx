import type { ProjectStatus, TaskStatus } from '../data/mockData';

interface StatusBadgeProps {
  status: ProjectStatus | TaskStatus;
  size?: 'sm' | 'md';
}

const statusConfig = {
  // Project statuses
  'Idea': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  'Draft': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  'Developing': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-400' },
  'Paused': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400' },
  'Testing': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400' },
  'Deploying': { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  'Completed': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400' },
  // Task statuses
  'Todo': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  'Doing': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-400' },
  'Blocked': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-400' },
  'Done': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} ${config.text} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {status}
    </span>
  );
}
