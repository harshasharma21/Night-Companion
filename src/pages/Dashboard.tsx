import React, { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import CreateTaskButton from '../components/tasks/CreateTaskButton';
import { TaskCategory } from '../types/task';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Night Companion Tasks</h1>
          <CreateTaskButton />
        </div>
        
        <TaskFilters 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
        
        <TaskList category={selectedCategory} />
      </div>
    </div>
  );
}