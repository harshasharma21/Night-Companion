import { supabase } from './supabase';
import { Task } from '../types/task';
import toast from 'react-hot-toast';

interface CreateTaskData {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  companions_needed: number;
  category: Task['category'];
}

export async function createTask(data: CreateTaskData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase.from('tasks').insert([
    {
      ...data,
      user_id: user.id,
      companions_joined: 0,
      status: 'open',
    },
  ]);

  if (error) throw error;
}

export async function joinTask(taskId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const { error: joinError } = await supabase.from('companions').insert([
      { 
        task_id: taskId,
        user_id: user.id
      },
    ]);

    if (joinError) {
      // Check for location mismatch error
      if (joinError.message.includes('Location mismatch')) {
        toast.error('You can only join tasks in your location');
        return;
      }
      throw joinError;
    }

    const { error: updateError } = await supabase.rpc('increment_companions', {
      task_id: taskId,
    });

    if (updateError) throw updateError;
  } catch (error: any) {
    throw error;
  }
}

export async function fetchTasks(category: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // First get user's location
  const { data: profile } = await supabase
    .from('profiles')
    .select('location')
    .eq('id', user.id)
    .single();

  if (!profile) throw new Error('Profile not found');

  // Then fetch tasks for user's location
  let query = supabase
    .from('tasks')
    .select('*')
    .eq('venue', profile.location)
    .order('created_at', { ascending: false });

  if (category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  
  return data;
}