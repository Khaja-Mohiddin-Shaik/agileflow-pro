import React from 'react';
import { Search, Filter, Calendar, Target } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export const FilterControls = () => {
  const { state, dispatch } = useTaskContext();
  const { filters } = state;

  const updateFilter = (key, value) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { [key]: value },
    });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        search: '',
        priority: 'all',
        status: 'all',
        dueDateFrom: '',
        dueDateTo: '',
      },
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.priority !== 'all' ||
    filters.status !== 'all' ||
    filters.dueDateFrom ||
    filters.dueDateTo;

  return (
    <div className="p-6 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            <Search size={16} className="inline mr-1" />
            Search tasks
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by title, assignee, or description..."
          />
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            <Target size={16} className="inline mr-1" />
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => updateFilter('priority', e.target.value)}
            className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            <Calendar size={16} className="inline mr-1" />
            Due From
          </label>
          <input
            type="date"
            value={filters.dueDateFrom}
            onChange={(e) => updateFilter('dueDateFrom', e.target.value)}
            className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            <Calendar size={16} className="inline mr-1" />
            Due To
          </label>
          <input
            type="date"
            value={filters.dueDateTo}
            onChange={(e) => updateFilter('dueDateTo', e.target.value)}
            className="w-full px-4 py-2 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                Search: "{filters.search}"
              </span>
            )}
            {filters.priority !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-800">
                Priority: {filters.priority}
              </span>
            )}
            {(filters.dueDateFrom || filters.dueDateTo) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-amber-100 text-amber-800">
                Date: {filters.dueDateFrom || '∞'} → {filters.dueDateTo || '∞'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
