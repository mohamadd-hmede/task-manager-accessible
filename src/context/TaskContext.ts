import { createContext } from "react";
import type { Priority, Task } from "../types/Task";

export type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, priority: Priority, dueDate: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (
    id: number,
    title: string,
    priority: Priority,
    dueDate: string,
  ) => void;
  clearCompletedTasks: () => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);
