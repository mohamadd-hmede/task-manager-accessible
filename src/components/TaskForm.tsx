import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import type { Priority } from "../types/Task";

type TaskFormProps = {
  onAdd: (title: string, priority: Priority, dueDate: string) => void;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority, dueDate);
    setTitle("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <section
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
      aria-labelledby="add-task-heading"
    >
      <h2
        id="add-task-heading"
        className="text-base font-semibold text-slate-900 mb-4 text-left"
      >
        Add New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label.Root
            htmlFor="task-title"
            className="text-sm font-medium text-slate-800 block text-left"
          >
            Title
          </Label.Root>
          <input
            id="task-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="w-full px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder:text-slate-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label.Root
              id="form-priority-label"
              className="text-sm font-medium text-slate-800 block text-left"
            >
              Priority
            </Label.Root>
            <Select.Root
              value={priority}
              onValueChange={(v) => setPriority(v as Priority)}
            >
              <Select.Trigger
                aria-labelledby="form-priority-label"
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <Select.Value />
                <Select.Icon>
                  <svg
                    className="w-4 h-4 text-slate-400"
                    aria-hidden="true"
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
          </div>
          <div className="space-y-1">
            <Label.Root
              htmlFor="due-date"
              className="text-sm font-medium text-slate-800 block text-left"
            >
              Due date
            </Label.Root>
            <input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
