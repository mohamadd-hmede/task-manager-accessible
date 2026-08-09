import type { Priority, Task } from "../types/Task";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    newTitle: string,
    priority: Priority,
    dueDate: string,
  ) => void;
};

function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base font-medium text-slate-500">No tasks found</p>
        <p className="text-sm text-slate-500">
          Try changing the filters or add a new task.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 list-none p-0 m-0" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
