// Task status and priority enums
export const TASK_STATUSES = ['todo', 'in-progress', 'done'];
export const TASK_PRIORITIES = ['low', 'medium', 'high'];
export const FILTER_PRIORITIES = ['all', 'low', 'medium', 'high'];
export const FILTER_STATUSES = ['all', 'todo', 'in-progress', 'done'];

// Initial filter state
export const initialFilters = {
  search: '',
  priority: 'all',
  status: 'all',
  dueDateFrom: '',
  dueDateTo: '',
};

// Initial global task state
export const initialTaskState = {
  tasks: [],
  loading: false,
  error: null,
  filters: { ...initialFilters },
};

// Action types
export const ActionTypes = {
  FETCH_TASKS_START: 'FETCH_TASKS_START',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_ERROR: 'FETCH_TASKS_ERROR',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_FILTERS: 'SET_FILTERS',
  REORDER_TASKS: 'REORDER_TASKS',
};