export type TaskCategory = 'study' | 'exercise' | 'social' | 'entertainment' | 'other';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  companions_needed: number;
  companions_joined: number;
  category: TaskCategory;
  status: 'open' | 'closed';
  created_at: string;
}