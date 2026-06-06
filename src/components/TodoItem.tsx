import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  function handleEditSave(): void {
    onEdit(todo.id, editValue);
    setEditing(false);
  }

  function handleEditCancel(): void {
    setEditValue(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') handleEditCancel();
  }

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition',
          todo.completed
            ? 'border-brand bg-brand text-white'
            : 'border-gray-300 bg-white hover:border-brand'
        )}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      {editing ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-brand px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-base',
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleEditSave}
              className="rounded-lg p-1.5 text-green-500 hover:bg-green-50 transition"
              aria-label="Save"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleEditCancel}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-indigo-50 hover:text-brand transition"
              aria-label="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
