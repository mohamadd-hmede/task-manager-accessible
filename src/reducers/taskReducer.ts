import type { Priority, Task } from "../types/Task";

export type TaskState = {
  tasks: Task[];
};

export type TaskAction =
  | {
      type: "ADD_TASK";
      title: string;
      priority: Priority;
      dueDate: string;
    }
  | {
      type: "TOGGLE_TASK";
      id: number;
    }
  | {
      type: "DELETE_TASK";
      id: number;
    }
  | {
      type: "EDIT_TASK";
      id: number;
      title: string;
      priority: Priority;
      dueDate: string;
    }
  | {
      type: "CLEAR_COMPLETED";
    };

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: Date.now(),
        title: action.title,
        completed: false,
        priority: action.priority,
        dueDate: action.dueDate || undefined,
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? {
                ...task,
                title: action.title,
                priority: action.priority,
                dueDate: action.dueDate || undefined,
              }
            : task,
        ),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      };

    default:
      return state;
  }
}
