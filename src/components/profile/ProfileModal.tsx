import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">Profile</Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="text-lg font-medium">{profile?.name}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Location</label>
              <p className="text-lg font-medium">{profile?.location}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Twitter</label>
              <p className="text-lg font-medium">@{profile?.twitter_handle}</p>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}