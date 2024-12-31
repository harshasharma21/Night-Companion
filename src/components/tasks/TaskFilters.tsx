import React from 'react';
import { TaskCategory } from '../../types/task';

interface TaskFiltersProps {
  selectedCategory: TaskCategory | 'all';
  onCategoryChange: (category: TaskCategory | 'all') => void;
}

const categories: { value: TaskCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Tasks' },
  { value: 'study', label: 'Study' },
  { value: 'exercise', label: 'Exercise' },
  { value: 'social', label: 'Social' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'other', label: 'Other' },
];

export default function TaskFilters({ selectedCategory, onCategoryChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onCategoryChange(value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedCategory === value
              ? 'bg-purple-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}