import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { UserCircle } from 'lucide-react';

interface Companion {
  profiles: {
    name: string;
    id: string;
  };
}

interface CompanionsListProps {
  taskId: string;
}

export default function CompanionsList({ taskId }: CompanionsListProps) {
  const [companions, setCompanions] = useState<Companion[]>([]);

  useEffect(() => {
    async function fetchCompanions() {
      const { data, error } = await supabase
        .from('companions')
        .select(`
          profiles (
            name,
            id
          )
        `)
        .eq('task_id', taskId);

      if (error) {
        console.error('Error fetching companions:', error);
        return;
      }

      setCompanions(data || []);
    }

    fetchCompanions();
  }, [taskId]);

  if (companions.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Companions</h4>
      <div className="flex flex-wrap gap-2">
        {companions.map((companion) => (
          <div
            key={companion.profiles.id}
            className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-sm"
          >
            <UserCircle className="w-4 h-4" />
            <span>{companion.profiles.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}