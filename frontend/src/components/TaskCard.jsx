import React from 'react';
import { Calendar, User, Tag, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';

export const TaskCard = ({ task, isDragging = false }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle size={16} className="text-emerald-600" />;
      case 'in-progress':
        return <Clock size={16} className="text-amber-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;

    const due = new Date(dueDate);
    const today = new Date();
    const tomorrow = addDays(today, 1);

    if (isBefore(due, today)) {
      return { text: 'Overdue', color: 'text-red-600 bg-red-50' };
    } else if (isBefore(due, tomorrow)) {
      return { text: 'Due today', color: 'text-amber-600 bg-amber-50' };
    } else if (isBefore(due, addDays(today, 3))) {
      return { text: 'Due soon', color: 'text-blue-600 bg-blue-50' };
    }
    return null;
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
        isDragging ? 'rotate-3 shadow-lg' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          <h3 className="font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">{task.description}</p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
              +{task.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <User size={14} />
          <span className="truncate max-w-20">{task.assignee}</span>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-gray-600">
              {format(new Date(task.dueDate), 'MMM d')}
            </span>
            {dueDateStatus && (
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${dueDateStatus.color}`}
              >
                {dueDateStatus.text}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
