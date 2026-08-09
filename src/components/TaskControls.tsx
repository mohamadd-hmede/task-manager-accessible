import * as Select from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import type { Priority } from "../types/Task";
import type { SortOption } from "../types/SortOption";

type TaskControlsProps = {
  search: string;
  priorityFilter: "all" | Priority;
  dateFilter: string;
  sortOption: SortOption;
  onSearchChange: (v: string) => void;
  onPriorityFilterChange: (v: "all" | Priority) => void;
  onDateFilterChange: (v: string) => void;
  onSortChange: (v: SortOption) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
};

function RadixSelect<T extends string>({
  value,
  onValueChange,
  options,
  ariaLabel,
}: {
  value: T;
  onValueChange: (v: T) => void;
  options: { value: T; label: string }[];
  ariaLabel?: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        aria-label={ariaLabel}
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
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="flex items-center px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-slate-100 focus:bg-slate-100 outline-none"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function TaskControls({
  search,
  priorityFilter,
  dateFilter,
  sortOption,
  onSearchChange,
  onPriorityFilterChange,
  onDateFilterChange,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
}: TaskControlsProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
      <div className="space-y-1">
        <Label.Root
          htmlFor="search"
          className="text-sm font-medium text-slate-800 block text-left"
        >
          Search
        </Label.Root>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder:text-slate-500"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label.Root className="text-sm font-medium text-slate-800 block text-left">
            Priority
          </Label.Root>
          <RadixSelect
            value={priorityFilter}
            onValueChange={onPriorityFilterChange}
            ariaLabel="Filter by priority"
            options={[
              { value: "all", label: "All" },
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
        </div>
        <div className="space-y-1">
          <Label.Root
            htmlFor="date-filter"
            className="text-sm font-medium text-slate-800 block text-left"
          >
            Due date
          </Label.Root>
          <input
            id="date-filter"
            type="date"
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full px-3 py-2 text-sm text-slate-900 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div className="space-y-1">
          <Label.Root className="text-sm font-medium text-slate-800 block text-left">
            Sort by
          </Label.Root>
          <RadixSelect
            value={sortOption}
            onValueChange={onSortChange}
            ariaLabel="Sort tasks by"
            options={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
              { value: "dueDate", label: "Due date" },
              { value: "priority", label: "Priority" },
            ]}
          />
        </div>
      </div>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}

export default TaskControls;
