import React, { useEffect, useState } from 'react';
import { Task } from '../../types/task';
import TaskCard from './TaskCard';
import { fetchTasks } from '../../lib/taskActions';
import toast from 'react-hot-toast';

interface TaskListProps {
  category: string;
}

export default function TaskList({ category }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await fetchTasks(category);
        setTasks(data || []);
      } catch (error: any) {
        toast.error('Failed to load tasks');
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [category]);

  if (loading) {
    return <div className="text-white">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-white mt-8">
        <p className="text-xl">No tasks found in your location</p>
        <p className="text-sm mt-2">Tasks will appear here when they're created in your area</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}