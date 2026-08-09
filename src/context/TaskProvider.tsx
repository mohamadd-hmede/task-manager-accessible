import { useEffect, useReducer, type ReactNode } from "react";

import type { Priority, Task } from "../types/Task";

import { taskReducer, type TaskState } from "../reducers/taskReducer";

import { TaskContext } from "./TaskContext";

type TaskProviderProps = {
  children: ReactNode;
};

function getInitialState(): TaskState {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    const parsedTasks: Task[] = JSON.parse(savedTasks);

    return {
      tasks: parsedTasks.map((task) => ({
        ...task,
        priority: task.priority ?? "medium",
      })),
    };
  }

  return {
    tasks: [
      {
        id: 1,
        title: "Learn React components",
        completed: false,
        priority: "high",
      },
      {
        id: 2,
        title: "Practice TypeScript",
        completed: true,
        priority: "medium",
      },
    ],
  };
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, undefined, getInitialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  function addTask(title: string, priority: Priority, dueDate: string) {
    dispatch({
      type: "ADD_TASK",
      title,
      priority,
      dueDate,
    });
  }

  function toggleTask(id: number) {
    dispatch({
      type: "TOGGLE_TASK",
      id,
    });
  }

  function deleteTask(id: number) {
    dispatch({
      type: "DELETE_TASK",
      id,
    });
  }

  function editTask(
    id: number,
    title: string,
    priority: Priority,
    dueDate: string,
  ) {
    dispatch({
      type: "EDIT_TASK",
      id,
      title,
      priority,
      dueDate,
    });
  }

  function clearCompletedTasks() {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        clearCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
