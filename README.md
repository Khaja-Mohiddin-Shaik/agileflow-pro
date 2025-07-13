# AgileFlow Pro – Task Management Dashboard

AgileFlow Pro is a modern Kanban-based task management dashboard designed to help teams track tasks efficiently using filtering, drag-and-drop, and prioritization.

---

## 🚀 Working Solution

🔗 Deployed Link: [https://agileflow-pro-hry0.onrender.com]

## 📁 GitLab Repository

The complete source code is hosted in a **private GitLab repository**. 

## 🛠️ Setup Instructions

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   https://gitlab.com/khaja28mohiddin/agileflow-pro.git
    ```
2. Install dependencies:

    Make sure you have Node.js and npm installed.

    ```bash

        npm install
    ```
4. Start the development server:

    ```bash

    npm run dev
    ```
The app will be available at http://localhost:5173 (or the port shown in your terminal).

🧠 Implementation Approach


📌 Tech Stack:

1. React (with hooks and context)

2. JavaScript

3. Tailwind CSS for styling

4. react-beautiful-dnd for drag-and-drop

5. lucide-react for icons

6. DummyJSON API for sample data

🧱 Architecture:

1. Context + useReducer is used for global state management (TaskContext)

2. Hooks (like useTasks) abstract task CRUD operations

Components:

1. FilterControls: Dynamic filtering based on status, priority, date, and search

2. KanbanBoard: Task columns for "To Do", "In Progress", and "Done" with drag-and-drop

3. TaskForm: Modal form to add new tasks

4. TaskCard: Displays task details like tags, due dates, assignee, etc.

🎯 Features:

1. Add, filter, and display tasks dynamically

2. Drag and drop between Kanban columns

3. Validate inputs like title, assignee, and due dates

4. Visual indicators for overdue or upcoming tasks

5. Responsive and mobile-friendly layout
