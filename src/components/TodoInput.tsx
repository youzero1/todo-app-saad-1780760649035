import { useState } from 'react';
import { Plus } from 'lucide-react';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 transition"
      />
      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-white font-semibold shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 transition"
      >
        <Plus size={18} />
        Add
      </button>
    </form>
  );
}
