import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialFilters = {
  search: '',
  priority: 'all',
  status: 'all',
  dueDateFrom: '',
  dueDateTo: '',
};

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: initialFilters,
};

// Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: null,
      };

    case 'FETCH_TASKS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
};

// Context
const TaskContext = createContext();

// Provider
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
