import { AlertCircle, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import type { Priority } from '../data/mockData';

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
}

const priorityConfig = {
  'Urgent': { 
    bg: 'bg-red-100', 
    text: 'text-red-700', 
    icon: AlertCircle,
    iconColor: 'text-red-600'
  },
  'High': { 
    bg: 'bg-orange-100', 
    text: 'text-orange-700', 
    icon: ArrowUp,
    iconColor: 'text-orange-600'
  },
  'Medium': { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-700', 
    icon: ArrowRight,
    iconColor: 'text-yellow-600'
  },
  'Low': { 
    bg: 'bg-green-100', 
    text: 'text-green-700', 
    icon: ArrowDown,
    iconColor: 'text-green-600'
  },
};

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} ${config.text} ${sizeClasses}`}>
      <Icon className={`${iconSize} ${config.iconColor}`} />
      {priority}
    </span>
  );
}
