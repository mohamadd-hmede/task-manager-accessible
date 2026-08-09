import { useState } from "react";
import TaskForm from "./components/TaskForm";
import type { Filter } from "./types/Filter";
import type { Priority } from "./types/Task";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import TaskControls from "./components/TaskControls";
import type { SortOption } from "./types/SortOption";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompletedTasks,
  } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [dateFilter, setDateFilter] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (!task.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (dateFilter !== "" && task.dueDate !== dateFilter) return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter)
      return false;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const priorityOrder: Record<Priority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "newest") return b.id - a.id;
    if (sortOption === "oldest") return a.id - b.id;
    if (sortOption === "priority")
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (sortOption === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    return 0;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  function resetFilters() {
    setSearch("");
    setPriorityFilter("all");
    setDateFilter("");
    setSortOption("newest");
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <main className="max-w-2xl mx-auto space-y-4" aria-label="Task Manager">
        <Header completedCount={completedCount} totalCount={totalCount} />
        <FilterBar
          filter={filter}
          completedCount={completedCount}
          onFilterChange={setFilter}
          onClearCompleted={clearCompletedTasks}
        />
        <TaskForm onAdd={addTask} />
        <TaskControls
          search={search}
          priorityFilter={priorityFilter}
          dateFilter={dateFilter}
          sortOption={sortOption}
          onSearchChange={setSearch}
          onPriorityFilterChange={setPriorityFilter}
          onDateFilterChange={setDateFilter}
          onSortChange={setSortOption}
          onResetFilters={resetFilters}
          hasActiveFilters={
            search !== "" ||
            priorityFilter !== "all" ||
            dateFilter !== "" ||
            sortOption !== "newest"
          }
        />
        <TaskList
          tasks={sortedTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>
    </div>
  );
}

export default App;
