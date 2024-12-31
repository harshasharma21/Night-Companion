import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateTaskModal from './CreateTaskModal';

export default function CreateTaskButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
      >
        <Plus className="w-5 h-5" />
        <span>Create Task</span>
      </button>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}