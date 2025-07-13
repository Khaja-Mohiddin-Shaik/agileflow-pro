import React, { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { useTasks } from '../hooks/useTasks';
import { useTaskContext } from '../context/TaskContext';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

const COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    icon: AlertCircle,
    color: 'bg-gray-50 border-gray-200',
    headerColor: 'text-gray-700',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    icon: Clock,
    color: 'bg-amber-50 border-amber-200',
    headerColor: 'text-amber-700',
  },
  {
    id: 'done',
    title: 'Done',
    icon: CheckCircle,
    color: 'bg-emerald-50 border-emerald-200',
    headerColor: 'text-emerald-700',
  },
];

export const KanbanBoard = () => {
  const { updateTask } = useTasks();
  const { state } = useTaskContext();

  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      const matchesSearch =
        !state.filters.search ||
        task.title?.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        task.assignee?.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(state.filters.search.toLowerCase());

      const matchesPriority =
        state.filters.priority === 'all' || task.priority === state.filters.priority;

      const matchesDateRange =
        (!state.filters.dueDateFrom || !task.dueDate || task.dueDate >= state.filters.dueDateFrom) &&
        (!state.filters.dueDateTo || !task.dueDate || task.dueDate <= state.filters.dueDateTo);

      return matchesSearch && matchesPriority && matchesDateRange;
    });
  }, [state.tasks, state.filters]);

  const tasksByStatus = useMemo(() => {
    const grouped = {
      todo: [],
      'in-progress': [],
      done: [],
    };

    filteredTasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    return grouped;
  }, [filteredTasks]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const task = state.tasks.find((t) => t.id.toString() === draggableId);
    if (!task) return;

    const newStatus = destination.droppableId;
    const updatedTask = {
      ...task,
      status: newStatus,
      completed: newStatus === 'done',
    };

    updateTask(updatedTask);
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="p-6 text-center border border-red-200 rounded-lg bg-red-50">
        <p className="font-medium text-red-800">Error loading tasks: {state.error}</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {COLUMNS.map((column) => {
          const columnTasks = tasksByStatus[column.id] || [];
          const Icon = column.icon;

          return (
            <div key={column.id} className={`rounded-xl border-2 ${column.color} p-4`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon size={20} className={column.headerColor} />
                <h3 className={`font-bold text-lg ${column.headerColor}`}>{column.title}</h3>
                <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-96 space-y-3 transition-colors duration-200 ${
                      snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
                    }`}
                  >
                    {columnTasks.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                          >
                            <TaskCard task={task} isDragging={snapshot.isDragging} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {columnTasks.length === 0 && !snapshot.isDraggingOver && (
                      <div className="py-8 text-center text-gray-500">
                        <Icon size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
