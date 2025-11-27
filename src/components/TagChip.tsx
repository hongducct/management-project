import type { ProjectTag, TaskTag } from '../data/mockData';

interface TagChipProps {
  tag: ProjectTag | TaskTag | string;
  size?: 'sm' | 'md';
}

const tagColors: Record<string, { bg: string; text: string }> = {
  'Website': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'App': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'API': { bg: 'bg-green-100', text: 'text-green-700' },
  'Extension': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'Tool': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  'Research': { bg: 'bg-pink-100', text: 'text-pink-700' },
  'UI': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'FE': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'BE': { bg: 'bg-green-100', text: 'text-green-700' },
  'Bug': { bg: 'bg-red-100', text: 'text-red-700' },
  'Optimization': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
};

export function TagChip({ tag, size = 'md' }: TagChipProps) {
  const colors = tagColors[tag] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-md ${colors.bg} ${colors.text} ${sizeClasses}`}>
      {tag}
    </span>
  );
}
