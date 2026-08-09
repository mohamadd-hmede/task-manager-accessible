import clsx from "clsx";
import type { Filter } from "../types/Filter";

type FilterBarProps = {
  filter: Filter;
  completedCount: number;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
};

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function FilterBar({
  filter,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <nav aria-label="Filter tasks" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => onFilterChange(f.value)}
            className={clsx(
              "px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize",
              filter === f.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
            )}
          >
            {f.label}
          </button>
        ))}
      </nav>
      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        aria-label={`Clear ${completedCount} completed task${completedCount !== 1 ? "s" : ""}`}
        className="ml-auto px-4 py-1.5 rounded-lg text-sm font-medium border border-slate-200 bg-white text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        Clear completed
      </button>
    </div>
  );
}

export default FilterBar;
