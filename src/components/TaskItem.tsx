import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import type { Priority, Task } from "../types/Task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    newTitle: string,
    priority: Priority,
    dueDate: string,
  ) => void;
};

const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-700 border border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  low: "bg-green-100 text-green-700 border border-green-200",
};

function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState<Priority>(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate ?? "");

  const today = new Date().toISOString().split("T")[0];
  const isOverdue =
    task.dueDate !== undefined && task.dueDate < today && !task.completed;
  const isDueToday = task.dueDate === today && !task.completed;

  const formattedDueDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  function saveEdit() {
    const trimmed = editedTitle.trim();
    if (!trimmed) return;
    onEdit(task.id, trimmed, editedPriority, editedDueDate);
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditedTitle(task.title);
    setEditedPriority(task.priority);
    setEditedDueDate(task.dueDate ?? "");
    setIsEditing(false);
  }

  return (
    <li
      className={clsx(
        "bg-white rounded-xl border border-slate-200 p-4 shadow-sm transition-opacity",
        task.completed && "opacity-60",
      )}
    >
      <div className="flex items-start gap-3">
        {/* Radix Checkbox */}
        <Checkbox.Root
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
          className="mt-0.5 w-4 h-4 rounded border border-slate-300 bg-white flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        >
          <Checkbox.Indicator>
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Root>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedTitle}
                onKeyDown={(e) => {
                  if (e.key === "Escape") cancelEdit();
                }}
                onChange={(e) => setEditedTitle(e.target.value)}
                autoFocus
                aria-label="Edit task title"
                className="w-full px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              <div className="grid grid-cols-2 gap-2">
                {/* Radix Select for edit priority */}
                <Select.Root
                  value={editedPriority}
                  onValueChange={(v) => setEditedPriority(v as Priority)}
                >
                  <Select.Trigger
                    aria-label="Edit priority"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <Select.Value />
                    <Select.Icon>
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="z-50 bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden">
                      <Select.Viewport className="p-1">
                        {(["high", "medium", "low"] as Priority[]).map((p) => (
                          <Select.Item
                            key={p}
                            value={p}
                            className="flex items-center px-3 py-2 text-sm rounded-md cursor-pointer capitalize hover:bg-slate-100 focus:bg-slate-100 outline-none"
                          >
                            <Select.ItemText>{p}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                <input
                  type="date"
                  value={editedDueDate}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                  aria-label="Edit due date"
                  className="w-full px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  className="px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={clsx(
                  "font-medium truncate text-left text-slate-800",
                  task.completed && "line-through text-slate-400",
                )}
              >
                {task.title}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className={clsx(
                    "text-xs px-2 py-0.5 rounded-full font-medium capitalize",
                    priorityStyles[task.priority],
                  )}
                >
                  {task.priority}
                </span>
                {task.dueDate && (
                  <span className="text-xs text-slate-600">
                    Due: {formattedDueDate}
                  </span>
                )}
                {isOverdue && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-600 text-white">
                    Overdue
                  </span>
                )}
                {isDueToday && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-500 text-white">
                    Due today
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit task: ${task.title}`}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete task: ${task.title}`}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
