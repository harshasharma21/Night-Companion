import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Task } from '../../types/task';
import { useAuth } from '../../contexts/AuthContext';
import { joinTask } from '../../lib/taskActions';
import CompanionsList from './CompanionsList';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [hasJoined, setHasJoined] = React.useState(false);

  const handleJoin = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await joinTask(task.id);
      setHasJoined(true);
    } finally {
      setLoading(false);
    }
  };

  const isFullyBooked = task.companions_joined >= task.companions_needed;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.status === 'closed' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-600'
          }`}>
            {task.status}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{task.description}</p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{task.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{task.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{task.venue}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>{task.companions_joined} / {task.companions_needed} companions</span>
          </div>
        </div>

        <CompanionsList taskId={task.id} />

        {task.status === 'open' && user?.id !== task.user_id && !hasJoined && (
          <button
            onClick={handleJoin}
            disabled={loading || isFullyBooked}
            className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Joining...' : isFullyBooked ? 'Fully Booked' : 'Join as Companion'}
          </button>
        )}

        {hasJoined && (
          <div className="mt-4 w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg text-center">
            You've joined this task
          </div>
        )}
      </div>
    </div>
  );
}