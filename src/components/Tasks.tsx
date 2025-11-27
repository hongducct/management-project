import { useState } from 'react';
import { Plus, CheckSquare, Calendar, Filter } from 'lucide-react';
import { tasks } from '../data/mockData';
import type { TaskStatus, Priority, TaskTag } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { TagChip } from './TagChip';
import { EmptyState } from './EmptyState';

export function Tasks() {
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  const globalTasks = tasks.filter(t => !t.projectId);
  const filteredTasks = priorityFilter === 'all'
    ? globalTasks
    : globalTasks.filter(t => t.priority === priorityFilter);

  const tasksByStatus = {
    Todo: filteredTasks.filter(t => t.status === 'Todo'),
    Doing: filteredTasks.filter(t => t.status === 'Doing'),
    Blocked: filteredTasks.filter(t => t.status === 'Blocked'),
    Done: filteredTasks.filter(t => t.status === 'Done'),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Global Tasks</h1>
          <p className="text-gray-600">Tasks not associated with any project</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('board')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'board'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              List View
            </button>
          </div>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {filteredTasks.length > 0 ? (
        viewMode === 'board' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['Todo', 'Doing', 'Blocked', 'Done'] as TaskStatus[]).map((status) => (
              <div key={status} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">{status}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tasksByStatus[status].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus[status].map((task) => (
                    <div key={task.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="text-sm text-gray-900 mb-2">{task.title}</h4>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tag) => (
                          <TagChip key={tag} tag={tag} size="sm" />
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <PriorityBadge priority={task.priority} size="sm" />
                        {task.deadline && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {task.estimatedTime && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Est: {task.estimatedTime}</span>
                            <span>Act: {task.actualTime}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {tasksByStatus[status].length === 0 && (
                    <div className="text-center py-8 text-sm text-gray-400">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">{task.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={task.status} size="sm" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PriorityBadge priority={task.priority} size="sm" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <TagChip key={tag} tag={tag} size="sm" />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {task.estimatedTime} / {task.actualTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <EmptyState
          icon={CheckSquare}
          title="No tasks yet"
          description="Create tasks to track your work outside of specific projects"
          actionLabel="Create Task"
          onAction={() => {}}
        />
      )}
    </div>
  );
}
