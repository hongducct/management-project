import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { projects, tasks } from '../data/mockData';
import { PriorityBadge } from './PriorityBadge';
import { TagChip } from './TagChip';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  // Get all items with deadlines
  const deadlineItems = [
    ...projects
      .filter(p => p.deadline)
      .map(p => ({
        id: p.id,
        type: 'project' as const,
        title: p.name,
        date: new Date(p.deadline!),
        priority: p.priority,
        color: 'bg-blue-500',
      })),
    ...tasks
      .filter(t => t.deadline)
      .map(t => ({
        id: t.id,
        type: 'task' as const,
        title: t.title,
        date: new Date(t.deadline!),
        priority: t.priority,
        color: t.status === 'Done' ? 'bg-green-500' : 'bg-purple-500',
      })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Calendar helpers
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getItemsForDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return deadlineItems.filter(item => 
      item.date.getFullYear() === date.getFullYear() &&
      item.date.getMonth() === date.getMonth() &&
      item.date.getDate() === date.getDate()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth &&
           today.getFullYear() === currentYear;
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Calendar</h1>
          <p className="text-gray-600">Track project deadlines and task due dates</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'month'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'week'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs text-gray-600 py-2">
              {day}
            </div>
          ))}

          {/* Days */}
          {days.map((day, index) => {
            if (typeof day !== 'number') {
              return day;
            }

            const items = getItemsForDate(day);
            const today = isToday(day);

            return (
              <div
                key={index}
                className={`min-h-24 border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors ${
                  today ? 'bg-blue-50 border-blue-300' : 'bg-white'
                }`}
              >
                <div className={`text-sm mb-1 ${today ? 'text-blue-600' : 'text-gray-900'}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {items.slice(0, 2).map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className={`text-xs p-1 rounded text-white truncate cursor-pointer ${item.color}`}
                      title={item.title}
                    >
                      {item.title}
                    </div>
                  ))}
                  {items.length > 2 && (
                    <div className="text-xs text-gray-500">+{items.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-3">
          {deadlineItems.slice(0, 10).map((item) => {
            const daysUntil = Math.ceil((item.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const isOverdue = daysUntil < 0;
            const isToday = daysUntil === 0;

            return (
              <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color} bg-opacity-10`}>
                  <CalendarIcon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm text-gray-900">{item.title}</h4>
                    <TagChip tag={item.type === 'project' ? 'Project' : 'Task'} size="sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">
                      {item.date.toLocaleDateString()}
                    </span>
                    {isOverdue && (
                      <span className="text-xs text-red-600">Overdue by {Math.abs(daysUntil)} days</span>
                    )}
                    {isToday && (
                      <span className="text-xs text-orange-600">Due today</span>
                    )}
                    {!isOverdue && !isToday && daysUntil <= 7 && (
                      <span className="text-xs text-yellow-600">Due in {daysUntil} days</span>
                    )}
                  </div>
                </div>
                <PriorityBadge priority={item.priority} size="sm" />
              </div>
            );
          })}
          {deadlineItems.length === 0 && (
            <div className="text-center py-8 text-sm text-gray-500">
              No upcoming deadlines
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
