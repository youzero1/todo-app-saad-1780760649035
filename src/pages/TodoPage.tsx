import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import { ClipboardList } from 'lucide-react';

export default function TodoPage() {
  const {
    filtered,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-start justify-center px-4 pt-16 pb-16">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-brand p-3 text-white shadow-lg">
            <ClipboardList size={28} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Todos</h1>
          <p className="mt-1 text-gray-500 text-sm">Stay organised, get things done.</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl p-6 flex flex-col gap-5">
          {/* Input */}
          <TodoInput onAdd={addTodo} />

          {/* List */}
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-400">
              <p className="text-4xl mb-2">🎉</p>
              <p className="font-medium">Nothing to see here!</p>
              <p className="text-sm mt-1">Add a task above to get started.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {filtered.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>
          )}

          {/* Footer filter bar */}
          <FilterBar
            filter={filter}
            onFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}
