import clsx from 'clsx';
import type { FilterType } from '../types';

type FilterBarProps = {
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  onFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
      <span>
        <span className="font-semibold text-gray-700">{activeCount}</span> item{activeCount !== 1 ? 's' : ''} left
      </span>

      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilter(f.value)}
            className={clsx(
              'rounded-lg px-3 py-1 font-medium transition',
              filter === f.value
                ? 'bg-brand text-white shadow-sm'
                : 'hover:bg-gray-100 text-gray-500'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="rounded-lg px-3 py-1 font-medium transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear completed
      </button>
    </div>
  );
}
