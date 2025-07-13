import { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const { state, dispatch } = useTaskContext();

  const fetchTasks = async () => {
    dispatch({ type: 'FETCH_TASKS_START' });

    try {
      const response = await fetch('https://dummyjson.com/todos?limit=20');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();

      const transformedTasks = data.todos.map((todo, index) => ({
        id: todo.id,
        todo: todo.todo,
        completed: todo.completed,
        userId: todo.userId,
        title: todo.todo,
        assignee: `User ${todo.userId}`,
        status: todo.completed ? 'done' : (index % 3 === 0 ? 'in-progress' : 'todo'),
        description: `Task description for: ${todo.todo}`,
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        tags: ['development', 'design', 'testing', 'review'].slice(0, Math.floor(Math.random() * 3) + 1),
      }));

      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: transformedTasks });
    } catch (error) {
      dispatch({
        type: 'FETCH_TASKS_ERROR',
        payload: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now() + Math.random(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const reorderTasks = (tasks) => {
    dispatch({ type: 'REORDER_TASKS', payload: tasks });
  };

  useEffect(() => {
    if (state.tasks.length === 0 && !state.loading) {
      fetchTasks();
    }
  }, []);

  return {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    refetch: fetchTasks,
  };
};
