import React, { useState } from 'react';
import { Plus, BarChart3, Settings } from 'lucide-react';
import { TaskProvider } from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { FilterControls } from './components/FilterControls';
import { KanbanBoard } from './components/KanbanBoard';

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AgileFlow Pro</h1>
                  <p className="text-sm text-gray-600">Task Management Dashboard</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                >
                  <Plus size={20} />
                  New Task
                </button>
                <button className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:text-gray-600 hover:bg-gray-100">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <FilterControls />
          <KanbanBoard />
        </main>

        {/* Task Form Modal */}
        {showTaskForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </div>
        )}
      </div>
    </TaskProvider>
  );
}

export default App;
