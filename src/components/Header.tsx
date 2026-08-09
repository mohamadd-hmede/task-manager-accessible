import * as Progress from "@radix-ui/react-progress";

type HeaderProps = {
  completedCount: number;
  totalCount: number;
};

function Header({ completedCount, totalCount }: HeaderProps) {
  const percentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <header className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm text-left">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Task Manager
        </h1>
        <p className="text-sm text-slate-500">
          Stay organised and get things done.
        </p>
      </div>
      {totalCount === 0 ? (
        <p className="text-sm text-slate-500">No tasks yet — add one below.</p>
      ) : (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              {completedCount} of {totalCount} completed
            </span>
            <span className="font-semibold text-slate-700">{percentage}%</span>
          </div>
          <Progress.Root
            className="h-2 w-full bg-slate-200 rounded-full overflow-hidden"
            value={percentage}
            aria-label={`${percentage}% of tasks completed`}
          >
            <Progress.Indicator
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
          </Progress.Root>
        </div>
      )}
    </header>
  );
}

export default Header;
