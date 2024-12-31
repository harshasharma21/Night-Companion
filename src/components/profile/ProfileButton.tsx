import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProfileModal from './ProfileModal';

export default function ProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-white hover:text-purple-200 transition"
      >
        <UserCircle className="w-6 h-6" />
      </button>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}